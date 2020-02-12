import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from '../entity/equipment.entity';
import { EquipmentRent } from '../entity/equipment-rent';
import { Person } from '../entity/person.entity';
import { EquipmentItem } from '../entity/equipment-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, EquipmentItem, EquipmentRent, Person])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
