import { All, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { ContactUs } from './contact_us.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class ContactUsService{
    constructor(    
    @InjectRepository(ContactUs) //experimental repository
    private readonly contactPostRepository : Repository<ContactUs>,
    ){}

    async findById(id:number):Promise<ContactUs>{
        const contact_post= await this.contactPostRepository.findOne(id);
        if (!contact_post) {
            const errors = {ContactPost: ' not found'};
            throw new HttpException({errors}, 401);
          }
        return contact_post;
    }


    //==================TEST SERVICE (FOR TEST RESOLVER QUERIES)=============
  
    async addSomePost():Promise<ContactUs>{
      let contact_post=new ContactUs();
      let {id,fullname,company,email,message,pending,phone,receivedAt,resolved,resolvedAt}=contact_post;
      fullname="bob marlo";
      company="bob marlo inc";
      email="bobm@marloinc.uk"
      message=
      "Salutations Prolift team! I would very much like to purchase your incredibly fair priced highly coveted lift related supplies if sadly my Internet Explorer web browser would brick every time I clicked on \'Complete Order\'. Would there be another method to order these products?";
      pending=true;
      phone="18001234321";
      receivedAt="22/2/2222"
      resolved=false;//
      contact_post={id,fullname,company,email,message,pending,phone,receivedAt,resolved,resolvedAt};
      //resolved=null;
      // resolvedAt=null;
      await this.contactPostRepository.save(contact_post);
      return contact_post;
    }
  

    // ========================== REMOVE ALL POSTS FROM CONTACT-US.================ (DISCARD LATER)
    async removePosts():Promise<ContactUs>{
      await this.contactPostRepository.delete({});
      return null;
    }
  }