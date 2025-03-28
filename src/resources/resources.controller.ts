import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import{ResourcesService} from './resources.service'
import { CreateResourceDto } from './dtos/create-rescoures.dto';

@Controller('resources')
export class ResourcesController {

    constructor(
        private readonly resourceSerivce :  ResourcesService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get("/get")
    async getresources(@Body() tags:string){
        return 
    }

    @Post('/create')
    async CreateResource(@Body() createresourcedto: CreateResourceDto)
        {
            return this.resourceSerivce.create_resource(createresourcedto);
        }


    @Get("/getall")
    async GetTitle() 
    {
    
        return this.resourceSerivce.get_titles();  
    
    }

    }

      