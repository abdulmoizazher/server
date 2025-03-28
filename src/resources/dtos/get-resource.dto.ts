import { Optional } from "@nestjs/common";
import { IsArray, IsString } from "class-validator";



export class get_resource_dto{

    @IsArray()
    @IsString({ each: true })
    @Optional()
    tags: string[];

    @IsString()
    title:string;
}