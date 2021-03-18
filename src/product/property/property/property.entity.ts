//regarding clarity this TS file can be named either: (card.entity.ts) OR (card.model.ts)
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import {Directive, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../../product.entity';


@ObjectType()//graphql - generate class as Type
@Entity('property')//typeorm
export class Property {

    @Field(type => Int , { nullable: true })//graphql - generate a class property as a Field
    @PrimaryGeneratedColumn()//typeorm
    id: number;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    text: string;

    @ManyToOne(() => Product, product => product.properties)
    product: Product;

}

// @InputType()
// export class PropertyInput{
    
// }