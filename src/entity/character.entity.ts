import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('avatar')
export class Character {
  @Field(type => Int , { nullable: true })
  @PrimaryGeneratedColumn() //bigint NOT NULL PRIMARY KEY, --- need REFERENCES to some user-role table
  id: number;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  @Column() //jwt_private_key \???BYTEA,
  name: string;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  @Column() 
  username: string;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  @Column()//TIMESTAMPTZ NOT NULL DEFAULT now(),
  level: number;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  @Column() //TIMESTAMPTZ NOT NULL DEFAULT now()+interval '3 weeks',
  class: string;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  @Column() //TIMESTAMPTZ  DEFAULT now()+interval '1 year',
  specialty: string;


  //  CHECK (rfshtoken_valid_until > token_valid_until),
  //  CHECK (token_valid_until > token_valid_from) 
  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  @Column({ default: true })
  isActive: boolean;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  @Column() //TIMESTAMPTZ  DEFAULT now()+interval '1 year',
  password: string;
}

@InputType()
export class CharacterInput{
  @Field(type => Int , { nullable: true })
  id: number;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  name: string;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  username: string;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  level: number;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  class: string;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  specialty: string;


  //  CHECK (rfshtoken_valid_until > token_valid_until),
  //  CHECK (token_valid_until > token_valid_from) 
  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  isActive: boolean;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  password: string;

}
