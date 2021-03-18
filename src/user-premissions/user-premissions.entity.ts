import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('user_premissions')
export class UserPremissions {
  @Field(type => Int, { nullable: true })
  @PrimaryGeneratedColumn() //bigint NOT NULL PRIMARY KEY, --- need REFERENCES to some user-role table
  id: number;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  @Column() //jwt_private_key \???BYTEA,
  premission: string;
}
