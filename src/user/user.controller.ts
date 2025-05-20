import { Controller, Get, Post, Body, Request, UseGuards, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserprofile } from './dto/create-user.profile'
import { set_user_preferencesDto } from './dto/set.preference.dto'
import { GetUserDto } from './dto/set.user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

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
  async update_user_profile(@Request() req, @Body() UpdateUserDto: CreateUserprofile) {
    return this.userService.udpateuserprofile(req.user.userId, UpdateUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user_preference')
  async set_user_preference(@Request() req, @Body() set_user_preferencedto: set_user_preferencesDto) {
    return this.userService.set_user_perference(req.user.userId, set_user_preferencedto)

  }

  @UseGuards(JwtAuthGuard)
  @Get('user_preference')
  async get_user_preference(@Request() req) {
    return this.userService.get_user_preference(req.user.userId);
  }


  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiParam({ name: 'userid', description: 'User ID', type: String })
  @ApiResponse({ status: 200, description: 'User details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('admin/:userid')
  async get_User(@Param('userid') userid: string) {
    return this.userService.getUser(userid);
  }

  @ApiOperation({ summary: 'Get user preferences by ID' })
  @ApiParam({ name: 'userid', description: 'User ID', type: String })
  @ApiResponse({ status: 200, description: 'User preferences retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User preferences not found' })
  @Get('admin/preference/:userid')
  async get_User_preference(@Param('userid') userid: string) {
    return this.userService.get_user_preference(userid);
  }

  @ApiOperation({ summary: 'Update user preferences' })
  @ApiParam({ name: 'userid', description: 'User ID', type: String })
  @ApiBody({ type: set_user_preferencesDto })
  @ApiResponse({ status: 200, description: 'Preferences updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch('user_preference/:userid')
  async set_user_preference_admin(
    @Param('userid') userid: string,
    @Body() set_user_preferencedto: set_user_preferencesDto
  ) {
    return this.userService.set_user_perference(userid, set_user_preferencedto);
  }
}


