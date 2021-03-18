import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { forwardRef, Inject } from '@nestjs/common'; //CardService
import { User } from './user.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { CardService } from '../card/card.service';

import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) //experimental repository
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => CardService))
    public cardService: CardService,
    @Inject(forwardRef(() => AuthService))
    public authService: AuthService,
  ) {}

  async findAll(): Promise<User[]> {
    // v this line here; relations
    let x = await this.userRepository.find({
      select: ['id', 'firstName', 'lastName'], //, relations: ["cards"]
    });
    await console.log(x);
    return x;
  }

  /* */

  /*   */
  async deleteAll(): Promise<User[]> {
    let allUsers = await this.userRepository.find(); //Find all users
    return await this.userRepository.remove(allUsers); //Delete allUsers
  }

  async create(dto: CreateUserDto): Promise<User> {
    // check uniqueness of username/email
    const { username, email, password, firstName, lastName } = dto;
    const qb = await getRepository(User) //querybuilder
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });
    const user = await qb.getOne();

    if (user) {
      console.log('no3 error must be unique');
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    let newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      console.log('no5 - error userinput not valid');
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException( //AuroraIDS
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      console.log('no5 saved user');
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    }
  }

  //   private buildUserRO(user: User) {
  //     const userRO = {
  //       id: user.id,
  //       username: user.username,
  //       email: user.email,
  //       password: user.password,
  //       firstName: user.firstName,
  //       lastName: user.lastName,

  //       //bio: user.bio,
  //       //token: this.generateJWT(user),
  //       //image: user.image
  //     };
  //     return {user: userRO};
  // }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['cards'],
    });
    if (!user) {
      const errors = { User: ' not found!' };
      throw new HttpException({ errors }, 401);
    }
    return user;
  }

  async findByIdAndModify(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      const errors = { User: 'not found' };
      throw new HttpException({ errors }, 401);
    }
    user.firstName = 'monkey';
    await this.userRepository.save(user);

    return user;
  }

  async getUserByIDwithQueryBuilder(argId: number): Promise<User> {
    //test
    //const user= await this.userRepository.findOne(id);
    let user = await this.userRepository
      .createQueryBuilder('user2')
      .where('id=:aId', { aId: argId })
      .getOne();
    return user;
  }

  async findOne(username): Promise<User> {
    let b = await this.userRepository.findOne({ username: username });
    return b;
  }

  //basic function

  async save(obj) {
    return await this.userRepository.save(obj);
  }

  //EXPERIMENTAL
  async esbr() {
    let b = {};
  }

  async fetchUser_unPw(username, password): Promise<User> {
    let b = await bcrypt.hash(password, 12);
    console.log(2); //log
    console.log(username); //log
    console.log(b); //log
    let bc = await bcrypt.hash(b, 12);
    let a = await this.userRepository.findOne({
      username: username,
    });
    console.log(3); //log
    console.log(a); //log
    console.log('plaintext compared to hash in db'); //log
    let comparison = await bcrypt.compare(password, a.password, function(
      err,
      result,
    ) {
      // result == true
      console.log();
      console.log('comparison= ' + result);
    });
    return a;
  }

  async insert(): Promise<User> {
    //DOCd out the test info
    let c = new User();
    c.username; //= //'joe011';
    c.password; //= //'1234';
    c.firstName; //= //'asi';
    c.lastName; //= //'doe';
    c.email; //= //'coop@joe.com';
    let a = await this.userRepository.save(c);
    let b = await this.userRepository.findOne(c);
    return b;
  }
}
