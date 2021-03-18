import {
  Args,
  Resolver,
  ResolveField,
  Query,
  Int,
  Parent,
  Mutation,
} from '@nestjs/graphql';

import { Character, CharacterInput } from '../entity/character.entity';
import { CharacterService } from './character.service';

import { HttpException } from '@nestjs/common/exceptions/http.exception';
//service dependency
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

@Resolver(of => Character)
export class CharacterResolver {
  constructor(
    private characterService: CharacterService,

    @InjectRepository(Character) //experimental repository
    private readonly userRepository: Repository<Character>,
  ) {}

  //functions (move to character service later)
  async findById(id: number): Promise<Character> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      const errors = { User: 'not found' };
      throw new HttpException({ errors }, 401);
    }
    return user;
  }

  //functions (move to character service later)
  async addCharacter(char): Promise<Character> {
    await this.userRepository.save(char);
    return char;
  }

  @Query(returns => Character)
  async character(@Args('id', { type: () => Int }) id: number) {
    return this.findById(id);
  }
}
