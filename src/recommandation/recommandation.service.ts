import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RecommandationService {
    constructor(
        private readonly userSrv: UserService,
    ) { }


    async get_user_recommandation(userId: any) {


        return this.userSrv.get_user_preference(userId);
    }
}
