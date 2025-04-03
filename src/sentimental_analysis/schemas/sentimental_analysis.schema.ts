import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps:true, versionKey:false})
export class sentiment extends Document{

    @Prop({type: String , required: true})
    sentiement : string

    @Prop({ type: [String], required: false })
    sentiment_history: string[];

}


export type sentimentDocument = sentiment & Document; 
export const sentimentSchema = SchemaFactory.createForClass(sentiment);