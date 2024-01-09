import { IsString, MinLength ,IsEmail,IsNotEmpty } from 'class-validator';
export class PostDto {
    
    
    @IsString()
    @MinLength(1)
    title:string

    @IsString()
    @MinLength(1)
    content:string

    @IsString()
    file :string
    
    @IsString()
    imageUrl:string
    
}
