import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }
    
    async getAccessToken(userId: any) {    
        const payload = { userId };
        
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
    
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // Recommended rounds for security
        return bcrypt.hash(password, saltRounds);
    }

    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
