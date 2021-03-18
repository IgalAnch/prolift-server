//nest
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//jwt

// TypeORM
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

//GraphQL
import { GraphQLModule } from '@nestjs/graphql';

//-path
import { join } from 'path';

//Modules
import { UsersModule } from './users/users.module';
import { CharacterModule } from './users/character.module';
import { ContactUsModule } from './contact_us/contact_us.module';

//Entities
import { Character } from './entity/character.entity';

//entities (this isnt supposed to be here)
import { User } from './users/user.entity';
import { Card } from './card/card.entity';
import { ContactUs } from './contact_us/contact_us.entity';

//authmodule. idk if its supposed to be here
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { FooResolver } from './foo/foo.resolver';
//------------move all of these modules/imports onto the correct area--------------------
import { TechSupportModule } from './tech_support/tech_support.module';
import { TechSupport } from './tech_support/tech_support.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { Property } from './product/property/property/property.entity';
import { PropertyModule } from './product/property/property/property.module';
import { /*TypeOrmConfig,*/ TYPEORM_CONFIG } from './typeorm.config';
import { CommentModule } from './comment/comment.module';
import { ProductTypesModule } from './product-types/product-types.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({ req, res }), //band-aid?
      cors: {
        origin: [
          'http://localhost:4200',
          '127.0.0.1:4200',
          process.env.PORT,
          'http://localhost:4243',
          '127.0.0.1:4243',
        ],
        credentials: true,
        max_age: 50000,
      },
    }),
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    UsersModule,
    CardModule, //? imported through usermodule
    AuthModule,
    CharacterModule,
    ContactUsModule,
    TechSupportModule,
    ProductModule,
    CommentModule,
    ProductTypesModule,
  ],
  // ZONE 1 - DOCKS.
  controllers: [AppController],
  providers: [AppService, FooResolver],
})
export class AppModule {
  constructor(private appService: AppService) {
    this.appService.insertSomeUser_onStratup();
    this.appService.insertSomeCharacter_onStartup();
    //this.appService.insertSomeToken_onStartup();
  }
}
