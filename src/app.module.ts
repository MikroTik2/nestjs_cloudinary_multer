import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { CloudinaryModule } from "@/cloudinary";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        CloudinaryModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
