import { Module } from '@nestjs/common';
import { RecommandationService } from './recommandation.service';
import { RecommandationController } from './recommandation.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  
  providers: [RecommandationService],
  controllers: [RecommandationController]
})
export class RecommandationModule {}
