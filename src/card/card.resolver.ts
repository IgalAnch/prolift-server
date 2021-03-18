
import { Resolver, Query, Args, Int, Mutation, Parent, ResolveField } from '@nestjs/graphql';
//Entity+Model
import { Card } from './card.entity';
import { CardService } from './card.service';
import { User } from './../users/user.entity';
import { UsersService } from '../users/users.service';


@Resolver(Card)
export class CardResolver {
    constructor(private cardService: CardService,
        private usersService: UsersService,
        ){}

    @Query(returns => Card)//generate method as Query
    async card(@Args('id',{type:()=> Int })id:number){
        return this.cardService.findById(id);
    }

    @Mutation(returns => Card)//generate method as Mutation
    async addCard(
    @Args('name',{type:()=>String})name:string,  //graphql - generate method params as Arguments
    @Args('level',{type:()=>Number})level:number, //gql - generate method params as Arguments
    @Args('type',{type:()=>String})type:string, //graph - generate method params as Arguments
    ){
        return this.cardService.addCard(name,level,type);
    }

    @Query(returns => [Card])//test
    async cardsOfUser(@Args('id',{type:()=>Number})id:number){
        return await this.cardService.findAll_ofUser(id);
    }

    @ResolveField()// resolve relationship property
    async users(@Parent() card: Card) { 
        return this.cardService.findAllUsers_ofCard(card.id);
    }
}
