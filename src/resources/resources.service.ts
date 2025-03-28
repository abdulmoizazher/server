import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resource,ResourceDocument } from './schemas/resources.schema';
import { Model } from 'mongoose';
import {CreateResourceDto} from './dtos/create-rescoures.dto';

@Injectable()
export class ResourcesService {

    constructor(
        @InjectModel(Resource.name) private ResourceModlel: Model<ResourceDocument>,
    ){

    }


    async create_resource(createResourceDto: CreateResourceDto) : Promise<ResourceDocument | null>{
            
        
        const existingResource = await this.ResourceModlel.findOne({
            title: createResourceDto.title,
          });
      
          if (existingResource) {
            return null; // or throw new ConflictException('Resource with this title already exists');
          }
      
          // Create new resource
          const createdResource = new this.ResourceModlel(createResourceDto);
          return createdResource.save();
    } 

    async get_resource(title:string): Promise<ResourceDocument | null>{
    
        return this.ResourceModlel.findOne({ title }).exec();
    
    }

    async get_titles():Promise<string[]>{

        const resources = await this.ResourceModlel
      .find({}, { title: 1, _id: 0 }) .lean() .exec();

    return resources.map(resource => resource.title);

    }


}
