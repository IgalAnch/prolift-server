import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterResolver } from './character.resolver';
import { CharacterService } from './character.service';
import { Character } from '../entity/character.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Character])],
   providers:[CharacterService,CharacterResolver],
    exports:[CharacterService]
})


export class CharacterModule{

}