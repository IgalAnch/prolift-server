import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Character } from './entity/character.entity';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
  constructor(
    private connection: Connection,

    private authService: AuthService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  insertSomeUser_onStratup() {
    console.log('Inserting a new user into the database...');
    var s = new Number(6.8);
    console.log(s);
    var b = +s + 4;
    console.log(b);

    const user = new User();
    user.firstName = 'Timberl';
    user.lastName = 'Saw';
    user.password = 'ungabunga';
    console.log(user.password);
    let connector234 = async () => {
      console.log('f1');
      const queryRunner = this.connection.createQueryRunner();
      console.log('f2');
      await queryRunner.connect();
      console.log('f3');
      await queryRunner.startTransaction();
      try {
        console.log('try');
        await queryRunner.manager.save(user).then(res => {
          console.log(res);
        });
        await queryRunner.commitTransaction();
      } catch (err) {
        console.log('hello error');
        console.log(err);
      }
    };

    connector234();
  }

  insertSomeCharacter_onStartup() {
    console.log('Inserting a new CHARACTER into the database...');
    const character = new Character();
    character.name = 'Donut-ello';
    character.level = 15;
    character.class = 'Bowman';
    character.username = 'something';

    let connector5 = async () => {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        console.log('try');
        await queryRunner.manager.save(character).then(res => {
          console.log(res);
        });
        await queryRunner.commitTransaction();
      } catch (err) {
        console.log('hello error');
        console.log(err);
      }
    };
    connector5();
  }

  // insertSomeToken_onStartup() {
  //   console.log('Inserting a new TOKEN into the database...');
  //   const token = new Token();

  //   token.token = 'asdasdadas';
  //   token.user_id = 'hola';
  //   token.valid_from = '24/2/2020';
  //   token.valid_until = '4/12/2024';

  //   let connector6 = async () => {
  //     const queryRunner = this.connection.createQueryRunner();
  //     await queryRunner.connect();
  //     await queryRunner.startTransaction();
  //     try {
  //       console.log('try');
  //       await queryRunner.manager.save(token).then(res => {
  //         console.log(res);
  //       });
  //       await queryRunner.commitTransaction();
  //     } catch (err) {
  //       console.log('hello error');
  //       console.log(err);
  //     }
  //   };
  //   connector6();
  // }

  // insetToken_intoUser() {}
}
