import { Body, Controller, Get, Patch, Post, UseGuards,Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResourcesService } from './resources.service'
import { CreateResourceDto } from './dtos/create-rescoures.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { get_resource_dto } from './dtos/get-resource.dto';

@Controller('resource')
export class ResourcesController {

    constructor(
        private readonly resourceSerivce: ResourcesService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("/category")
    async getresources(@Body() dto: get_resource_dto) {
        return this.resourceSerivce.category(dto.category)
    }


    @Get("/id")
    async get_resources(@Body() dto: get_resource_dto) {
        return this.resourceSerivce.id(dto.article_id)
    }

    @Get("/title")
    async get_resource(@Body() dto: get_resource_dto) {
        return this.resourceSerivce.title(dto.title)
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
    async list() {

        return this.resourceSerivce.list();

    }

    // article.controller.ts
@UseGuards(JwtAuthGuard)
@Patch('like')
async toggleLike(
  @Body() dto: get_resource_dto, @Request() req
) {
  return this.resourceSerivce.toggleLike(dto.article_id, req.user.userId);
}


}