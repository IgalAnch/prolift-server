import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//Entity
import { User } from './users/user.entity'; //?
//TypeORM
import {
  Connection,
  createConnection,
  ConnectionManager,
  EntityManager,
} from 'typeorm'; //?
import 'reflect-metadata'; //??

async function bootstrap() {
  //const appOptions = { cors: true }; //set option - enable CORS. (turn off in production?) //this is important
  //to remember. cors * wildcard. this doesnt work for withCredentials:true/include (on chrome, atleast).
  const app = await NestFactory.create(AppModule);

  // app.use((req, res, next) => {   // I don't think this works.. but at least it does seem to add the header
  //   res.setHeader('Access-Control-Allow-Max-Age', '86400');
  //   next();
  // });

  app.enableCors({
    //somebody spent 8 hours of their life on this + module root cors
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // app.enableCors({  // wrong!  in my case, anyway
  //   origin: 'http://localhost:3000',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept',
  //   credentials: true,
  // });
  app.listen(3000);
}
bootstrap();
