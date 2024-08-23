import { PipelineStage } from 'mongoose'

export class AggregationFeatures {
  pipeline: PipelineStage[]
  query_string: any
  total_results: any

  constructor(pipeline: PipelineStage[], queryString: any) {
    this.pipeline = pipeline
    this.query_string = queryString
    this.total_results = 0
  }

  filter() {
    const query_obj = { ...this.query_string }
    const excluded_fields = ['page', 'sort', 'limit', 'fields']
    excluded_fields.forEach((field) => {
      delete query_obj[field]
    })

    const match_stage: Record<string, any> = {}
    for (const [key, value] of Object.entries(query_obj)) {
      let parsed_value = value
      if (typeof value === 'object' && value !== null) {
        parsed_value = JSON.stringify(value).replace(
          /\b(gte|gt|lte|lt)\b/g,
          (match) => `$${match}`,
        )
        parsed_value = JSON.parse(parsed_value as string)
      }
      match_stage[key] = parsed_value
    }

    if (Object.keys(match_stage).length > 0) {
      this.pipeline.push({ $match: match_stage })
    }

    return this
  }

  sorting() {
    if (this.query_string.sort) {
      const sort_by = this.query_string.sort
        .split(',')
        .reduce((acc: any, field: string) => {
          acc[field.startsWith('-') ? field.substring(1) : field] =
            field.startsWith('-') ? -1 : 1
          return acc
        }, {})
      this.pipeline.push({ $sort: sort_by })
    } else {
      this.pipeline.push({ $sort: { created_at: -1 } })
    }

    return this
  }

  limit() {
    if (this.query_string.fields) {
      const fields = this.query_string.fields
        .split(',')
        .reduce((acc: any, field: string) => {
          acc[field] = 1
          return acc
        }, {})
      this.pipeline.push({ $project: fields })
    } else {
      this.pipeline.push({ $project: { __v: 0 } })
    }

    return this
  }

  pagination() {
    const page = this.query_string.page * 1 || 1
    const limit = this.query_string.limit * 1 || 10
    const skip = (page - 1) * limit

    this.pipeline.push({ $skip: skip }, { $limit: limit })

    return this
  }

  async getPaginationInfo(model: any) {
    const total_records_pipeline = this.pipeline.filter((stage) => {
      return !('$skip' in stage) && !('$limit' in stage)
    })

    const total_records = await model.aggregate([
      ...total_records_pipeline,
      { $count: 'total' },
    ])
    const total_records_count = total_records[0] ? total_records[0].total : 0
    const current_page = this.query_string.page * 1 || 1
    const limit = this.query_string.limit * 1 || 10
    const total_pages = Math.ceil(total_records_count / limit)
    const next_page = current_page < total_pages ? current_page + 1 : null
    const prev_page = current_page > 1 ? current_page - 1 : null

    return {
      total_records: total_records_count,
      current_page,
      total_pages,
      next_page,
      prev_page,
    }
  }
}
