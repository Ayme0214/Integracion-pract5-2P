import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesResolver } from './pacientes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';

@Module({
  providers: [PacientesResolver, PacientesService],
  imports:[
    TypeOrmModule.forFeature([Paciente])
  ]
})
export class PacientesModule {}
