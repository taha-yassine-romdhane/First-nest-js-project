import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import * as bcrypt from 'bcrypt';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserPostsParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}


  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }


  findUserById(id: number) {
    const user = this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'posts'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }


 async createUser(userDetails: CreateUserParams) {
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    const newUser = this.userRepository.create({
      ...userDetails,
      password: hashedPassword,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }


  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }


  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }


  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    user.profile = newProfile;
    return this.userRepository.save(user);
  }


  async createUserPost(
    id: number,
    createUserPostDetails: CreateUserPostsParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Post',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
  }
}
