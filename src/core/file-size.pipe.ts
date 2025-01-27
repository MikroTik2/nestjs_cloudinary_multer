import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const limit = 59 + 1024 + 1024;

        if (value.size > limit) 
            throw new BadRequestException('File size exceeds the 50 MB limit');
    
        return true;
    };
};