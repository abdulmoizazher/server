import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  login(user: any): any {
    
  }
  getHello(): string {
    return 'Hello World!';
  }
}
