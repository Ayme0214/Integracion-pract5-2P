import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PacientesService } from './pacientes.service';
import { Paciente } from './entities/paciente.entity';
import { UpdatePacienteInput, CreatePacienteInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Paciente)
export class PacientesResolver {
  constructor(private readonly pacientesService: PacientesService) {}

  @Mutation(() => Paciente)
  async createPaciente(@Args('createPacienteInput') createPacienteInput: CreatePacienteInput)
  :Promise<Paciente> {
    return this.pacientesService.create(createPacienteInput);
  }

  @Query(() => [Paciente], { name: 'pacientes' })
  async findAll():Promise<Paciente[]> {
    return this.pacientesService.findAll();
  }

  @Query(() => Paciente, { name: 'pacientes' })
  findOne(@Args('id', { type: () => ID}, ParseUUIDPipe ) id: string): Promise<Paciente> {
    return this.pacientesService.findOne(id);
  }

  @Mutation(() => Paciente)
  updatePaciente(@Args('updatePacienteInput') updatePacienteInput: UpdatePacienteInput): Promise<Paciente> {
    return this.pacientesService.update(updatePacienteInput.id, updatePacienteInput);
  }

  @Mutation(() => Paciente)
  removePaciente(@Args('id', { type: () => ID }) id: string): Promise<Paciente> {
    return this.pacientesService.remove(id);
  }
}
