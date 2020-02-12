import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EquipmentItem } from './equipment-item.entity';
import { Person } from './person.entity';

@Entity()
export class EquipmentRent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => EquipmentItem)
  item: EquipmentItem;

  @Column()
  itemId: number;

  @ManyToOne(type => Person)
  person: Person;

  @Column()
  personId: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  tsStart: Date;

  @Column({ type: 'timestamptz', nullable: true })
  tsEnd: Date;

  @Column({ default: '' })
  comment: string;
}
