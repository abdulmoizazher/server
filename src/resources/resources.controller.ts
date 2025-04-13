import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResourcesService } from './resources.service'
import { CreateResourceDto } from './dtos/create-rescoures.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('resource')
export class ResourcesController {

    constructor(
        private readonly resourceSerivce: ResourcesService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("/get")
    async getresources(@Body() tags: string) {
        return
    }

    @Post('/new')
    @ApiOperation({ summary: 'Create a new self-help resource' })
    @ApiResponse({ status: 201, description: 'The resource has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Validation failed.' })
    @ApiBody({ type: CreateResourceDto }) // Optional if your DTO already uses ApiProperty
    async CreateResource(@Body() createresourcedto: CreateResourceDto) {
        return this.resourceSerivce.create_resource(createresourcedto);
    }


    @Get("/all")
    @ApiOperation({ summary: 'all the titles of resource saved in the database' })
    async GetTitle() {

        return this.resourceSerivce.get_titles();

    }

}