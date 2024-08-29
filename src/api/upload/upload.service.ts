import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private client: S3Client;
  private bucket: string;
  private publicUrl: string;

  constructor(private readonly config: ConfigService) {
    this.client = new S3Client({
      endpoint: this.config.get('R2_ENDPOINT'),
      region: 'auto',
      credentials: {
        accessKeyId: this.config.get('R2_ACCESS_KEY'),
        secretAccessKey: this.config.get('R2_SECRET_KEY'),
      },
    });
    this.bucket = this.config.get('R2_BUCKET');
    this.publicUrl = this.config.get('R2_PUBLIC_URL'); // Load the public URL from env
  }

  async createMultiple(files: Express.Multer.File[]): Promise<{ url: string }[]> {
    const uploadPromises = files.map(async (file) => {
      const name = `${randomUUID()}${extname(file.originalname)}`;

      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: name,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      // Construct the full public URL using the base URL from env and the file name
      const url = `${this.publicUrl}/${name}`;

      return { url };
    });

    return Promise.all(uploadPromises);
  }
}
