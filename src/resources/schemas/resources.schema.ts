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

  @Prop({ type: [String], required: false })
  tags: string[]; // Tags for searching (e.g., ['stress', 'mental health'])

  @Prop({ required: false })
  source: string; // External source or reference link
  
  @Prop({ type: Number, default: 0 })
  likes: number; // Number of likes (optional)

  @Prop({ type: Number, default: 0 })
  views: number; // Number of times the resource has been viewed

  @Prop({ type: [String], required: false })
  relatedResources: string[]; // Array of related resource IDs
}
export type ResourceDocument = Resource & Document; 
export const ResourceSchema = SchemaFactory.createForClass(Resource);
