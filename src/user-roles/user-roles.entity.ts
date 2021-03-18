import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('user_roles')
export class UserRoles {
  @Field(type => Int, { nullable: true })
  @PrimaryGeneratedColumn() //bigint NOT NULL PRIMARY KEY, --- need REFERENCES to some user-role table
  id: number;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  @Column() //jwt_private_key \???BYTEA,
  role: string;

  @Field({ nullable: true }) //jwt_private_key \???BYTEA,
  @Column() //jwt_private_key \???BYTEA,
  description: string;
}
