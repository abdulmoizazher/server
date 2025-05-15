import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFeedbackDto } from './dtos/create-feedback.dtos';
import { FeedbackService } from './feedback.service';
import { Feedback } from './schemas/feedback.schema';

@Controller('feedback')
export class FeedbackController {

    constructor(private readonly feedbackSrc: FeedbackService) { }



    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post("update-sentiment")
    @ApiOperation({
        summary: 'adding feedback',
        description: 'sends feedback  for the authenticated user.',
    })
    @ApiBody({
        type: CreateFeedbackDto, // Ensure DTO is decorated with @ApiProperty()
        description: 'feedback added',
    })
    @ApiResponse({
        status: 200,
        description: 'Feedback sented successfully',
        // Replace with your response DTO
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized (invalid/missing JWT)',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request (invalid payload)',
    })
    async add_feeback(@Body() CreateFeedbackdto: CreateFeedbackDto, @Request() req) {
        this.feedbackSrc.addFeedback(CreateFeedbackdto, req.user.userId)

    }

    @Get("all")
    @ApiOperation({ summary: 'Get all feedback', description: 'Returns a list of all feedback submitted by users.' })
    @ApiResponse({ status: 200, description: 'List of feedback retrieved successfully.', type: [Feedback] })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getAllFeedback(): Promise<Feedback[]> {
        return this.feedbackSrc.getAllFeedback();
    }
}
