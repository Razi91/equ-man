import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EquipmentModule } from './equipment/equipment.module';
import { createDbConnection } from './database';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin'
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentItem } from 'entity/equipment-item.entity';
import { Equipment } from 'entity/equipment.entity';
import { Person } from 'entity/person.entity';
import { EquipmentRent } from 'entity/equipment-rent';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    createDbConnection(),
    EquipmentModule,
    TypeOrmModule.forFeature([EquipmentItem, Equipment, Person]),
    DefaultAdminModule
  ],
  controllers: [],
  providers: [AppService, AppGateway],
  exports: [],
})
export class AppModule {
  constructor(
    private readonly adminSite: DefaultAdminSite
  ) {
    adminSite.register('Equipment', Equipment);
    adminSite.register('Equipment', EquipmentItem);
    adminSite.register('Equipment', EquipmentRent);
    adminSite.register('Person', Person);
  }
}
