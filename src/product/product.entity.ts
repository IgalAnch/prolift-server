//regarding clarity this TS file can be named either: (card.entity.ts) OR (card.model.ts)
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Directive, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Property } from './property/property/property.entity';

@ObjectType() //graphql - generate class as Type
@Entity('product') //typeorm
export class Product {
  @Field(type => Int, { nullable: true }) //graphql - generate a class property as a Field
  @PrimaryGeneratedColumn() //typeorm
  id: number;

  @Field({ nullable: true }) //graphql - generate a class property as a Field
  @Column() //typeorm
  name: string;

  @Field({ nullable: true }) //graphql - generate a class property as a Field
  @Column() //typeorm
  type: string;

  @Field({ nullable: true }) //graphql - generate a class property as a Field
  @Column() //typeorm
  image: string;

  @Field(() => [Property], { nullable: true })
  @OneToMany(
    () => Property,
    property => property.product,
  )
  properties: Property[];
}

// @InputType()
// export class ProductInput {
//     @Field(type => Int , { nullable: true })
//     id: number;

//     @Field({nullable: true})//graphql - generate a class property as a Field
//     name: string;

//     @Field({nullable: true})//graphql - generate a class property as a Field
//     type: string;

//     @Field({nullable: true})//graphql - generate a class property as a Field
//     image: string;

//     // @OneToMany(() => Property , property => property.product)
//     @Field({nullable: true})
//     properties: string;//change this
// }
