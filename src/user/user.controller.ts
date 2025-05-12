import { Controller, Get, Post, Body, Request, UseGuards, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {CreateUserprofile} from './dto/create-user.profile' 
import{set_user_preferencesDto} from './dto/set.preference.dto'
import { GetUserDto } from './dto/getuser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post("login")
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getUser(@Request() req) {
    return this.userService.getUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user_profile')
  async update_user_profile(@Request() req , @Body() UpdateUserDto:CreateUserprofile ){
  return this.userService.udpateuserprofile(req.user.userId, UpdateUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user_preference')
  async set_user_preference(@Request() req , @Body() set_user_preferencedto:set_user_preferencesDto ){
  return this.userService.set_user_perference(req.user.userId, set_user_preferencedto)

  }

  @UseGuards(JwtAuthGuard)
  @Get('user_preference')
  async get_user_preference(@Request() req) {
    return this.userService.get_user_preference(req.user.userId);
  }


  @Get('admin')
  async get_User(@Body() dto:GetUserDto) {
    return this.userService.getUser(dto.userid);
  }

}
