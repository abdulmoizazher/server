import { Body, Controller, Get, Patch, Post, UseGuards, Request, Param, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResourcesService } from './resources.service'
import { CreateResourceDto } from './dtos/create-rescoures.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { get_resource_dto } from './dtos/get-resource.dto';

@Controller('resource')
export class ResourcesController {

    constructor(
        private readonly resourceSerivce: ResourcesService
    ) { }

    @UseGuards(JwtAuthGuard)

    @Get("/category/:category")
    @ApiOperation({ 
    summary: 'Get resources by category',
    description: 'Returns all resources belonging to the specified category' 
  })
  @ApiParam({
    name: 'category',
    required: true,
    description: 'The category of resources to fetch',
    example: 'technology'
  })
    async getresources(@Param('category') category: string) {
        return this.resourceSerivce.category(category);
    }


    @Get("/id/:article_id")
    @ApiOperation({ 
    summary: 'Get resource by ID',
    description: 'Returns a single resource with the specified ID' 
  })
  @ApiParam({
    name: 'article_id',
    required: true,
    description: 'The unique ID of the resource',
    example: '507f1f77bcf86cd799439011'
  })
    async get_resources(@Param('article_id') article_id: string) {
        return this.resourceSerivce.id(article_id);
    }

    @Get("/title")
    @ApiOperation({ 
    summary: 'Get resource by title',
    description: 'Returns resources matching the specified title' 
  })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Title of the resource (URL-encoded if spaces)',
    example: 'Introduction%20to%20NestJS'
  })
    async get_resource(@Query('title') title: string) {
        return this.resourceSerivce.title(title);
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