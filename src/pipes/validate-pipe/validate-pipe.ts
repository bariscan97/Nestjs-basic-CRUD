import { ArgumentMetadata, Injectable, PipeTransform ,ForbiddenException} from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
   async transform(value: any, metadata: ArgumentMetadata) {
      
      const UserBody = Object.assign(value,{})
      
      const emailRegex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
      
      if (!emailRegex.test(UserBody.email) || UserBody.username.length<8 || UserBody.password.length<8){
            throw new ForbiddenException('Validation Error');
         }
   
     
      
      return value;
     
    
  }
}
