import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';//us les rscrs thn op to stp thm 2b rdy fr mre rtltn
import { CardResolver } from './card.resolver';
import { CardService } from './card.service';
import { Card } from './card.entity';
import { UsersModule } from '../users/users.module';


@Module({
  imports:[ TypeOrmModule.forFeature([Card]),forwardRef(()=>UsersModule)],
   providers:[ CardService, CardResolver],
    exports:[ CardService ]
})


export class CardModule{

}