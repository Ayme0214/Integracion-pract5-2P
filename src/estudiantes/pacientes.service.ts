import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteInput, UpdatePacienteInput } from './dto/inputs';
import { Paciente } from './entities/paciente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PacientesService {

  constructor( 
    @InjectRepository(Paciente)
    private readonly pacientesRepository:Repository<Paciente> ){}

  async create(createPacienteInput: CreatePacienteInput): Promise<Paciente>  {
    const newPaciente= this.pacientesRepository.create(createPacienteInput);
    return await this.pacientesRepository.save(newPaciente); 
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacientesRepository.find();
  }

  async findOne(id: string): Promise<Paciente> {
     const paciente= await  this.pacientesRepository.findOneBy({id});
     if (!paciente) throw new NotFoundException(`Not found`)
     return paciente;
  }

  async update(id: string, updatePacienteInput: UpdatePacienteInput): Promise<Paciente> {
    
    const paciente = await this.pacientesRepository.preload(updatePacienteInput);
    if (!paciente) throw new NotFoundException(`Not found`)
    return this.pacientesRepository.save(paciente);

  }

  async remove(id: string): Promise<Paciente> {

    const paciente= await  this.findOne(id);

   // await this.pacientesRepository.remove(paciente);
    await this.pacientesRepository.update({id:id}, {estado:false});

    return {...paciente, id};

  }
}
