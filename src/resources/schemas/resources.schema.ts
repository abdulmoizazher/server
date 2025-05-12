import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false }) // Automatically adds createdAt & updatedAt
export class Resource extends Document {
  @Prop({ required: true })
  title: string; // Title of the resource

  @Prop({ required: true })
  content: string; // Full content of the article

  @Prop({ required: true })
  category: string; // e.g., 'Anxiety', 'Depression', 'Motivation'

  @Prop({ required: false })
  author: string; // Author name (if applicable)

  @Prop({ required: false })
  source: string; // External source or reference link

  @Prop({ type: Number, default: 0 })
  likes: number; // Number of likes (optional)


  @Prop({ type: [String], default: [] })
  likedBy: string[];// article.schema.ts or article.model.ts


  @Prop({ required: false })
  preview: string; // preview of  (if applicable)


}
export type ResourceDocument = Resource & Document;
export const ResourceSchema = SchemaFactory.createForClass(Resource);
