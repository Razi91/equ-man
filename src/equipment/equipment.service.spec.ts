import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentService } from './equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from '../entity/equipment.entity';
import { createDbConnection } from '../database';
import { EquipmentItem } from '../entity/equipment-item.entity';
import { Person } from '../entity/person.entity';
import { EquipmentRent } from '../entity/equipment-rent';
import { getRepository, Repository } from 'typeorm';

describe('EquipmentService', () => {
  let service: EquipmentService;
  let persons: Repository<Person>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createDbConnection(),
        TypeOrmModule.forFeature([
          Equipment,
          EquipmentItem,
          Person,
          EquipmentRent,
        ]),
      ],
      providers: [EquipmentService],
    }).compile();

    service = module.get<EquipmentService>(EquipmentService);
    persons = getRepository(Person);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('adds equipment, it exists', async () => {
    const created = await service.createEquipment('lorem', 'lorem ipsum');
    expect(created).toBeDefined();
    expect(created).not.toBeNull();
    expect(created.name).toBe('lorem');
    expect(created.description).toBe('lorem ipsum');
    service.removeEquipment(created);
  });

  it('added equipments are different', async () => {
    const created1 = await service.createEquipment('lorem', 'lorem ipsum');
    const created2 = await service.createEquipment('lorem1', 'lorem ipsum');
    expect(created1).toBeDefined();
    expect(created2).toBeDefined();
    expect(created1.id).not.toBe(created2.id);
    service.removeEquipment(created1);
    service.removeEquipment(created2);
  });

  it('allows to lend equipment to a person, throws when item is lended', async () => {
    const eq = await service.createEquipment('lorem', 'lorem ipsum');
    const item = await service.createItem(eq);
    const person = await persons.save(
      persons.create({ name: 'Lorem', phone: '111111111' }),
    );
    const person2 = await persons.save(
      persons.create({ name: 'Lorem', phone: '111111111' }),
    );
    const lendInfo = await service.rentTo(item, person);
    expect(lendInfo).toBeDefined();
    expect(lendInfo.tsStart).not.toBeNull();
    expect(lendInfo.tsEnd).toBeNull();
    expect(lendInfo.person.id).toBe(person.id);
    expect(lendInfo.item.id).toBe(item.id);
    await expect(service.rentTo(item, person2)).rejects.not.toBeNull();
    await service.return(item);
    await service.rentTo(item, person);
  });
});
