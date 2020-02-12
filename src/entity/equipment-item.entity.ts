import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Equipment } from './equipment.entity';

@Entity()
export class EquipmentItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Equipment)
  equipment: Equipment;

  @Column({default: ''})
  comment: string;
}
