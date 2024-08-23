import { Query } from 'mongoose'

export class APIFeatures {
  mongoose_query: Query<any, any>
  query_string: any
  total_results: any

  constructor(mongooseQuery: any, queryString: any) {
    this.mongoose_query = mongooseQuery
    this.query_string = queryString
    this.total_results = 0
  }

  filter() {
    const query_obj = { ...this.query_string }
    const excluded_fields = ['page', 'sort', 'limit']
    excluded_fields.forEach((fields) => {
      delete query_obj[fields]
    })

    // Use $eq operator for each field to ensure user input is treated as a literal value
    const sanitized_query_obj = {}
    for (const key in query_obj) {
      if (query_obj.hasOwnProperty(key)) {
        sanitized_query_obj[key] = { $eq: query_obj[key] }
      }
    }

    this.mongoose_query = this.mongoose_query.find(sanitized_query_obj)
    this.total_results = this.mongoose_query.clone().countDocuments()

    return this
  }

  sorting() {
    if (this.query_string.sort) {
      const sort_by = this.query_string.sort.split(',').join(' ')
      this.mongoose_query = this.mongoose_query.sort(sort_by)
      this.total_results = this.mongoose_query.clone().countDocuments()
    } else {
      this.mongoose_query = this.mongoose_query.sort('-created_at')
    }

    return this
  }

  limit() {
    if (this.query_string.fields) {
      const fields = this.query_string.fields.split(',').join(' ')

      this.mongoose_query = this.mongoose_query.select(fields)
    } else {
      this.mongoose_query = this.mongoose_query.select('-__v')
    }

    return this
  }

  pagination() {
    const page = this.query_string.page * 1 || 1

    const limit = this.query_string.limit * 1 || 10

    const skip = (page - 1) * limit
    this.total_results = this.mongoose_query.clone().countDocuments()

    this.mongoose_query = this.mongoose_query.skip(skip).limit(limit)

    return this
  }
  async getPaginationInfo() {
    const total_records = await this.total_results
    const current_page = this.query_string.page * 1 || 1
    const limit = this.query_string.limit * 1 || 10
    const total_pages = Math.ceil(total_records / limit)
    const next_page = current_page < total_pages ? current_page + 1 : null
    const prev_page = current_page > 1 ? current_page - 1 : null

    return {
      total_records,
      current_page,
      total_pages,
      next_page,
      prev_page,
    }
  }
}
