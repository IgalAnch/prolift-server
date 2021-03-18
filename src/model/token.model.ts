import {Field, Int, ObjectType } from '@nestjs/graphql';



@ObjectType()
export class Token{
    @Field(type => Int , { nullable: true })
    id: number;

    @Field({ nullable: true }) //jwt_private_key \???BYTEA,
    token: string;
  
    @Field({ nullable: true }) 
    user_id: string;
  
    @Field({ nullable: true })//TIMESTAMPTZ NOT NULL DEFAULT now(),
    valid_from: string;
  
    @Field({ nullable: true }) //TIMESTAMPTZ NOT NULL DEFAULT now()+interval '3 weeks',
    valid_until: string;
  
    @Field({ nullable: true }) //TIMESTAMPTZ  DEFAULT now()+interval '1 year',
    rfshtoken_valid_until: string;
  
    //  CHECK (rfshtoken_valid_until > token_valid_until),
    //  CHECK (token_valid_until > token_valid_from) 
  
    @Field({ nullable: true })
    isActive: boolean;


}