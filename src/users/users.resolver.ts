import {
  Args,
  Context,
  Resolver,
  ResolveField,
  Query,
  Int,
  Parent,
  Mutation,
  Directive,
  Subscription,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
//Entity+Model
import { User } from './user.entity'; //Entity+Model
import { UsersService } from './users.service';
import { CardService } from '../card/card.service';

import { PubSub } from 'graphql-subscriptions';
import { Res, UseGuards, All } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AppController } from '../app.controller';

const pubSub = new PubSub();

@Resolver(User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    public cardService: CardService,
    public authService: AuthService,
  ) {}

  // @Directive('@deprecated(reason: "This query will be removed in the next version")') //doesnt work??
  @Query(returns => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  } //
  //wtch mrgna: cdr e

  //@UseGuards(LocalAuthGuard)
  //@UseGuards(JwtAuthGuard)
  @Query(returns => User)
  async login(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
    @Context() context, //: GraphQLExecutionContext,
  ) {
    console.log(1);
    console.log(username); //log //
    console.log(password); //log//
    let user = await this.usersService.fetchUser_unPw(username, password);
    let { access_token } = await this.authService.login(user);
    //let c = await context.res.cookie('jwt', access_token);
    // let h = await context.res.setHeader(
    //   'Authorization',
    //   'Bearer ' + access_token,
    // );
    //console.log(context.res);
    user.firstName = access_token;
    return user;
  }

  @Query(returns => User)
  async findUser_byUsername(
    @Args('username', { type: () => String }) username: string,
  ) {
    return this.usersService.findOne(username);
  }

  @Subscription(returns => User) //NEWWWW
  commentAdded1() {
    return pubSub.asyncIterator('userAdded');
  }
  addCommentHandler1() {
    return pubSub.asyncIterator('userAdded');
  }

  @Query(returns => User) //tst
  async userGetByID_withQueryBuilder(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.usersService.getUserByIDwithQueryBuilder(id);
  }
  //sej rder/cvlry:

  @Query(returns => User) //tst
  async userUpdate(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findByIdAndModify(id);
  }

  @Query(returns => [User]) //tst
  async userAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard) //<- correct
  //@roles
  @Query(returns => Boolean)
  async verifyToken() {
    return true;
  }

  @Mutation(returns => User) //tst
  async userInsert() {
    return this.usersService.insert();
  }

  @Mutation(returns => User) //test
  async addCardsToUser(@Args('id', { type: () => Int }) id: number) {
    return this.cardService.addCardsToUser(id);
  }

  @ResolveField()
  async cards(@Parent() user: User) {
    return this.cardService.findAll_ofUser(user.id);
  }
}

/*
|
|module(user) -> resolver(user) -> service(user) 
|@InjectResolver(UserEntity) user ... , @InjectResolver(CardEntity) cards
|[UserEntity, CardEntity ]
|
|===================================
|
| PostModule
|export: [postService]
|
|module(user) - >
|import: [forwardRef(() => PostModule)] 
|
|-------------------------------------------
|
|return this.teamService.findByUserID(user.id);
|@Resolver(User)
|
|---------------------------------------
|
|
|
*/
