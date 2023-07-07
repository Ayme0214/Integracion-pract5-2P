import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class CreatePacienteInput {



  @Field(()=>String )
  @IsNotEmpty()
  nombre:string;

  @Field(()=>String )
  @IsNotEmpty()
  identificacion:string;

  @Field(()=>Boolean )
  @IsNotEmpty()
  estado:boolean;  


}
