import { Controller, Param, Post, UploadedFile, UseInterceptors, UsePipes } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "@/cloudinary/services";
import { FileSizeValidationPipe } from "@/core/";

@ApiTags("Files")
@Controller("/files")
export class AppController {
    constructor(private readonly cloudinary: CloudinaryService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    @ApiOperation({ summary: "Upload a file" })
    @ApiConsumes("multipart/form-data")
    @ApiResponse({ status: 201, description: "File successfully uploaded." })
    @ApiResponse({ status: 400, description: 'Bad Request. File size exceeds the 10 MB limit.' })
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @UsePipes(FileSizeValidationPipe)
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return await this.cloudinary.upload(file);
    }

    @Post('update/:public_id')
    @UseInterceptors(FileInterceptor("file"))
    @ApiOperation({ summary: "Update a file" })
    @ApiConsumes("multipart/form-data")
    @ApiParam({ name: 'public_id' })
    @ApiResponse({ status: 201, description: "File successfully update." })
    @ApiResponse({ status: 400, description: 'Bad Request. File size exceeds the 10 MB limit.' })
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @UsePipes(FileSizeValidationPipe)
    async updateFile(@UploadedFile() file: Express.Multer.File, @Param('public_id') public_id: string) {
        return await this.cloudinary.update(file, public_id);
    }

    @Post('destroy/:public_id')
    @ApiOperation({ summary: "Destroy a file" })
    @ApiConsumes("multipart/form-data")
    @ApiParam({ name: 'public_id' })
    @ApiResponse({ status: 201, description: "File successfully destroy." })
    @ApiResponse({ status: 400, description: "Bad Request." })
    async destroyFile(@Param('public_id') public_id: string) {
        return await this.cloudinary.destroy(public_id);
    }
}