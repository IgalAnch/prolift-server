import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { forwardRef, Inject } from '@nestjs/common'; //UsersService
//import { validate } from "class-validator";
import { Card } from './card.entity';

import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) //experimental repository
    private readonly cardRepository: Repository<Card>,

    @Inject(forwardRef(() => UsersService)) //?? that worked?
    public usersService: UsersService,
  ) {}

  async findById(id: number): Promise<Card> {
    const card = await this.cardRepository.findOne(id);
    if (!card) {
      const errors = { Card: ' not found' };
      throw new HttpException({ errors }, 401);
    }
    return card;
  }

  async findAll_ofUser(id): Promise<Card[]> {
    // v this line here; relations
    let someUser = await this.usersService.findById(id); //TIS SQL SELECT ETC
    return someUser.cards;
  }

  async findAll2(idArg): Promise<Card[]> {
    // v this line here; relations
    const cards = await this.cardRepository.find({
      select: ['name', 'type', 'level'],
      relations: ['users'],
    });
    return cards;
  }
  async findAll3(id): Promise<Card[]> {
    // v this line here; relations
    const cards = await this.cardRepository.find({
      select: ['name', 'type'],
      relations: ['users'],
      where: [''],
    });
    return cards;
  }

  async findAllUsers_ofCard(id): Promise<User[]> {
    // v this line here; relations
    let someCard = await this.cardRepository.findOne(id, {
      relations: ['users'],
    });
    return someCard.users; //ask about this
  }

  async addCardsToUser(userId): Promise<User> {
    const category1 = new Card();
    category1.name = 'animals';
    await this.cardRepository.save(category1);
    const category2 = new Card();
    category2.name = 'zoo';
    await this.cardRepository.save(category2);
    const question = await this.usersService.findById(userId);
    question.cards = [category1, category2];
    await this.usersService.save(question);
    return question;
  }

  async addCard(
    nameArg?: string,
    levelArg?: number,
    typeArg?: string,
  ): Promise<Card> {
    if (!nameArg) {
      nameArg = 'bobby';
    }
    if (!levelArg) {
      levelArg = 1;
    }
    if (!typeArg) {
      typeArg = 'bob';
    }
    const card = await this.cardRepository.save({
      name: nameArg,
      level: levelArg,
      type: typeArg,
    });
    //error handling
    return card;
  }

  async findAll4(id): Promise<User[]> {
    // v this line here; relations
    let someCard = await this.cardRepository.findOne(id, {
      relations: ['users'],
    });
    return someCard.users;
  }
}

// let card = new Card("Jerry",6,"plant","omri");// change value later
//let card = new Card();
// console.log(card);
