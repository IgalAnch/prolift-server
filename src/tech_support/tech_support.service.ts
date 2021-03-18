import { All, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { TechSupport } from './tech_support.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class TechSupportService{
    constructor(    
    @InjectRepository(TechSupport) //experimental repository
    private readonly techSupportPostRepository : Repository<TechSupport>,
    ){}

    async findById(id:number):Promise<TechSupport>{
        const techSupport_post= await this.techSupportPostRepository.findOne(id);
        if (!techSupport_post) {
            const errors = {techSupportPost: ' not found'};
            throw new HttpException({errors}, 401);
          }
        return techSupport_post;
    }


    //==================TEST SERVICE (FOR TEST RESOLVER QUERIES)=============
  
    async addSomePost():Promise<TechSupport>{
      let techSupport_post=new TechSupport();
      let {id,representative,company,email,problemContext,addressed,phone,
        receivedAt,resolved,resolvedAt,problemType} = techSupport_post;
      representative="bob marlo";
      company="bob marlo inc";
      email="bobm@marloinc.uk"
      problemContext=
      "Salutations Prolift team! I would very much like to purchase your incredibly fair priced highly coveted lift related supplies if sadly my Internet Explorer web browser would brick every time I clicked on \'Complete Order\'. Would there be another method to order these products?";
      addressed=true;
      phone="18001234321";
      receivedAt="22/2/2222"
      resolved=false;//
      techSupport_post={id,representative,company,email,problemContext,addressed,phone,receivedAt,problemType,resolved,resolvedAt};
      //resolved=null;
      // resolvedAt=null;
      await this.techSupportPostRepository.save(techSupport_post);
      return techSupport_post;
    }
  

    // ========================== REMOVE ALL POSTS FROM techSupport-US.================ (DISCARD LATER)
    async removePosts():Promise<TechSupport>{
      await this.techSupportPostRepository.delete({});
      return null;
    }
  }