//regarding clarity this TS file can be named either: (card.entity.ts) OR (card.model.ts)
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import {Min,Max} from "class-validator";//validator (test)
import {Directive, Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from '../users/user.entity';

@ObjectType()//graphql - generate class as Type
@Entity('card')//typeorm
export class Card {
    @Field(type => Int , { nullable: true })//graphql - generate a class property as a Field
    @PrimaryGeneratedColumn()//typeorm
    id: number;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    name: string;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    level: number;

    @Field({nullable: true})//gql
    @Column()//orm
    type: string;
    
    @ManyToMany(()=>User, user=> user.cards) //typeorm  
    @Field(() => [ User ], { nullable: true }) //graphql
    users: User[];

}