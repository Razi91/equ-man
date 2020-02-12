import { Test, TestingModule } from '@nestjs/testing';
import { AppGateway } from './app.gateway';
import { EquipmentService } from './equipment/equipment.service';
import { createDbConnection } from './database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './entity/equipment.entity';
import { EquipmentItem } from './entity/equipment-item.entity';
import { Person } from './entity/person.entity';
import { EquipmentRent } from './entity/equipment-rent';

describe('AppGateway', () => {
  let gateway: AppGateway;

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
      providers: [AppGateway, EquipmentService],
    }).compile();

    gateway = module.get<AppGateway>(AppGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
