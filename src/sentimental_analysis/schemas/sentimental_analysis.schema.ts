import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps:true, versionKey:false , })
export class sentiment extends Document{

    @Prop({type: String , required: true})
    sentiment : string

    @Prop({ type: [String], required: false })
    sentiment_history: string[];

    @Prop({type: String})
    userid : string;

}


export type sentimentDocument = sentiment & Document; 
export const sentimentSchema = SchemaFactory.createForClass(sentiment);