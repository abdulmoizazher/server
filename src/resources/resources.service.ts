import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resource,ResourceDocument } from './schemas/resources.schema';
import { Model } from 'mongoose';
import {CreateResourceDto} from './dtos/create-rescoures.dto';

@Injectable()
export class ResourcesService {

    constructor(
        @InjectModel(Resource.name) private ResourceModel: Model<ResourceDocument>,
    ){

    }


    async create_resource(createResourceDto: CreateResourceDto) : Promise<ResourceDocument | null>{
            
        
        const existingResource = await this.ResourceModel.findOne({
            title: createResourceDto.title,
          });
      
          if (existingResource) {
            return null; // or throw new ConflictException('Resource with this title already exists');
          }
      
          // Create new resource
          const createdResource = new this.ResourceModel(createResourceDto);
          return createdResource.save();
    } 

    async title(title:string): Promise<ResourceDocument | null>{
    
        return this.ResourceModel.findOne({ title }).exec();
    
    }

    async id(id:string): Promise<ResourceDocument | null>{

      return this.ResourceModel.findById(id).exec();
  
  }


    async list():Promise<any>{

        const resources = await this.ResourceModel
      .find({}, { title: 1, preview: 1,likes: 1,  _id: 0 }) .lean() .exec();

    return resources.map(resource => ({
      title: resource.title,
      preview: resource.preview, 
      likes : resource.likes
    }));

    }


  async category(category:string): Promise<any>{
    
    try {
      const resource =  await this.ResourceModel.find({ category }).exec();
    return resource.map(resource => ({
        title: resource.title,
        preview: resource.preview, 
        likes : resource.likes
      }));
    } catch (error) {
      throw new Error(`Error finding resources by category: ${error.message}`);
    }
  }

  // article.service.ts
async toggleLike(articleId: string, userId: string) {
  const article = await this.ResourceModel.findById(articleId);

  if (!article) throw new NotFoundException('Article not found');

  const index = article.likedBy.indexOf(userId);

  if (index > -1) {
    // User already liked it, so unlike
    article.likedBy.splice(index, 1);
  } else {
    // Like it
    article.likedBy.push(userId);
  }

  await article.save();
  return { likes: article.likedBy.length };
}



}
