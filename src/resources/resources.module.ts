import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { Resource, ResourceSchema } from './schemas/resources.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{name: Resource.name, schema: ResourceSchema }]),AuthModule],
  providers: [ResourcesService],
  controllers: [ResourcesController]
})
export class ResourcesModule {}
