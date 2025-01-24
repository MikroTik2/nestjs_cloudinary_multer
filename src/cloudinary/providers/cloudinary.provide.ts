import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CLOUDINARY } from "../constants";
import { v2 as cloudinary } from "cloudinary";

export const CloudinaryProvider: Provider = {
    provide: CLOUDINARY,
    useFactory: async (config: ConfigService) => {
        cloudinary.config({
            cloud_name: config.get<string>("CLOUDINARY_API_NAME"),
            api_key: config.get<string>("CLOUDINARY_API_KEY"),
            api_secret: config.get<string>("CLOUDINARY_API_SECRET"),
        });

        return cloudinary;
    },

    inject: [ConfigService],
};
