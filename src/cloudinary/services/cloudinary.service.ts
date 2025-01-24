import { BadRequestException, Injectable } from "@nestjs/common";
import { Readable } from "stream";
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

@Injectable()
export class CloudinaryService {
    public async upload(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        try {
            return new Promise((resolve, reject) => {
                const upload = cloudinary.uploader.upload_stream((error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error("Upload result is undefined"));

                    resolve(result);
                });

                const stream = new Readable();
                stream.push(file.buffer);
                stream.push(null);

                stream.pipe(upload);
            });
        } catch (error) {
            throw new BadRequestException(`Failed to upload file from cloudinary: ${error.message}`);
        }
    }

    public async update(file: Express.Multer.File, public_id: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
        try {
            await this.destroy(public_id);
            return await this.upload(file);
        } catch (error) {
            throw new BadRequestException(`Failed to update file from cloudinary: ${error.message}`);
        }
    }

    public async destroy(public_id: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
        console.log(public_id)
        try {
            return await cloudinary.uploader.destroy(public_id);
        } catch (error) {
            throw new BadRequestException(`Failed to destroy file from cloudinary: ${error.message}`);
        }
    }
}
