import { Optional } from "@nestjs/common";
import { IsArray, IsOptional, IsString } from "class-validator";



export class get_resource_dto{
    

    @IsOptional()
    @IsString()
    article_id:string;

    @IsOptional()
    @IsString()
    title:string;
   
    @IsOptional()
    @IsString()
    category:string;
}