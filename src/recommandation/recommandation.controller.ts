import { Controller, Get,Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecommandationService } from './recommandation.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('recommandation')
export class RecommandationController {

    constructor(
        private readonly UserRec : RecommandationService 
    ){

    }

@UseGuards(JwtAuthGuard)
@Get('current')
@ApiOperation({summary: " recommadation for specific user pass authorization token in header"})
async user_recommandation (@Request() req):Promise <any | string>
{

        return     this.UserRec.user_recommandation(req.user.userId)
        

}



}

