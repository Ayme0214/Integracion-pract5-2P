import { IsUUID } from 'class-validator';
import { CreatePacienteInput } from './create-paciente.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePacienteInput extends PartialType(CreatePacienteInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;
  
}
