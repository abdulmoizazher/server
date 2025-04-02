import { Controller, Get,Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecommandationService } from './recommandation.service';

@Controller('recommandation')
export class RecommandationController {

    constructor(
        private readonly UserRec : RecommandationService 
    ){

    }

@UseGuards(JwtAuthGuard)
@Get('current')
async user_recommandation (@Request() req):Promise <any | string>
{

        return     this.UserRec.user_recommandation(req.user.userId)
        

}

@Get('test')
async test (){
  return this.UserRec.test();
}

}

