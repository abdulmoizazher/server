import { Injectable } from '@nestjs/common';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFeedbackDto } from './dtos/create-feedback.dtos';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
    private readonly userSrc : UserService
  ) {}

  async addFeedback(createFeedbackdto: CreateFeedbackDto, userId:string): Promise<Feedback> {
    const username = (await this.userSrc.getUser(userId)).name
    console.log(username)
    const newFeedback = new this.feedbackModel({
  userId,
  userName: username,
  feedback: createFeedbackdto.feedback,
});
    return await newFeedback.save();
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return await this.feedbackModel.find().exec();
  }
}
