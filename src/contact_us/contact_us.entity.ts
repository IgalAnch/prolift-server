//regarding clarity this TS file can be named either: (card.entity.ts) OR (card.model.ts)
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import {Directive, Field, Int, ObjectType } from '@nestjs/graphql';


@ObjectType()//graphql - generate class as Type
@Entity('contact_us')//typeorm
export class ContactUs {

    @Field(type => Int , { nullable: true })//graphql - generate a class property as a Field
    @PrimaryGeneratedColumn()//typeorm
    id: number;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    fullname: string;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    company: string;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    phone: string;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    email: string;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    message: string;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    receivedAt: string; //date type?

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    pending: boolean;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    resolved: boolean;

    @Field({nullable: true})//graphql - generate a class property as a Field
    @Column()//typeorm
    resolvedAt: string; //date type?
}