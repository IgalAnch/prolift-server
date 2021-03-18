import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, Int, ObjectType, Directive } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { Card } from 'src/card/card.entity';

@ObjectType()
@Entity('user')
export class User {
  @Field(type => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column()
  firstName: string;

  @Field({ nullable: true })
  @Column()
  lastName: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field({ nullable: true })
  @Column()
  password: string;

  // @ManyToOne(type => Token)
  // @JoinColumn({name:"hodb"})
  // token2: Token;
  @ManyToMany(
    () => Card,
    card => card.users,
  )
  @Field(() => [Card], { nullable: true })
  @JoinTable()
  cards: Card[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
