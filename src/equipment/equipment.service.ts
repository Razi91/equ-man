import { Injectable, Inject } from '@nestjs/common';
import { Equipment } from '../entity/equipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipmentRent } from '../entity/equipment-rent';
import { EquipmentItem } from '../entity/equipment-item.entity';
import { Person } from '../entity/person.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipments: Repository<Equipment>,
    @InjectRepository(EquipmentItem)
    private readonly equipmentItems: Repository<EquipmentItem>,
    @InjectRepository(EquipmentRent)
    private readonly rents: Repository<EquipmentRent>,
  ) {}

  async createEquipment(name: string, description: string) {
    const item = this.equipments.create({
      name,
      description,
    });
    return await this.equipments.save(item);
  }

  async createItem(equipment: Equipment) {
    const item = this.equipmentItems.create({
      equipment,
    });
    const result = await this.equipmentItems.save(item);
    return result;
  }

  async removeEquipment(item: Equipment) {
    return this.equipments.remove(item);
  }

  async rentTo(item: EquipmentItem, person: Person): Promise<EquipmentRent> {
    const hasAny = await this.rents.findOne({
      where: {
        item,
        tsEnd: null,
      },
    });
    if (hasAny != null) {
      throw new Error('Error');
    }
    const rent = this.rents.create({
      item,
      person,
      tsStart: new Date(),
    });
    return await this.rents.save(rent);
  }

  async return(item: EquipmentItem) {
    const rents = await this.rents.find({
      where: {
        item,
        tsEnd: null,
      },
    });
    if (rents.length === 1) {
      const rest = rents[0];
      rest.tsEnd = new Date();
      await this.rents.save(rest);
    } else if (rents.length > 1) {
      throw new Error('Something wrong with this item');
    }
  }
}
