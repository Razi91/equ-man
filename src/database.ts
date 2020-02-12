import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './entity/equipment.entity';
import { Person } from './entity/person.entity';
import { EquipmentItem } from './entity/equipment-item.entity';
import { EquipmentRent } from './entity/equipment-rent';
const AdminUser = require('nestjs-admin').AdminUserEntity

let instance: any;

const isTest  = process.env.NODE_ENV == 'test';

export const createDbConnection = () => {
  if (instance != null) {
    return instance;
  }
  instance = TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'geo',
    password: 'geo',
    database: 'equman',
    schema: isTest ? 'test' : 'public',
    entities: [Person, EquipmentItem, Equipment, EquipmentRent, AdminUser],
    dropSchema: isTest,
    synchronize: true,
    logging: false,
    keepConnectionAlive: true
  });
  return instance;
};
