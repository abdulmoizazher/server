import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserprofile } from './dto/create-user.profile'
import { set_user_preferencesDto } from './dto/set.preference.dto'
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const email = createUserDto.email;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new ConflictException('User already exists');

    createUserDto.password = await this.authService.hashPassword(createUserDto.password);



    const user = new this.userModel({
      ...createUserDto,  // Spread the DTO properties instead of nesting
    });
    await user.save();


    const access_token = await this.authService.getAccessToken(user._id);

    return access_token;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });

    if (user && await this.authService.comparePasswords(password, user.password)) {
      return this.authService.getAccessToken(user._id);
    }

    throw new UnauthorizedException();
  }

  async getUser(userId: string): Promise<User> {
    console.log(userId);
    return await this.userModel.findById(userId).select('-password');
  }

  async udpateuserprofile(userid: string, UpdateUserDto: CreateUserprofile): Promise<any> {

    return this.userModel.findByIdAndUpdate(userid, UpdateUserDto, { new: true }).exec();
  }



  async set_user_perference(userId: string, set_user_preferencedto: set_user_preferencesDto): Promise<any> {

    const userPreferences = await this.userModel.findById(userId).exec();

    if (!userPreferences) {
      throw new UnauthorizedException('User not found');
    }

    // Manually update the Preferences field
    userPreferences.preferences = set_user_preferencedto.Preferences;

    // Save the updated document
    const updatedPreferences = await userPreferences.save();

    return updatedPreferences;

  }

  async get_user_preference(userId: string): Promise<any> {
    console.log(userId);
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new UnauthorizedException("user not found")
    }

    if (!existingUser.preferences) {
      return "user did not set preference"
    }

    return existingUser.preferences;

  }
}

