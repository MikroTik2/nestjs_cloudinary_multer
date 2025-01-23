import { Module } from "@nestjs/common";
import { CloudinaryModule } from "@/cloudinary";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        CloudinaryModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
})
export class AppModule {}
