import { Controller, Get } from '@nestjs/common';
import { Equipment } from '../entity/equipment.entity';

@Controller('api/equipment')
export class EquipmentController {

    @Get()
    async getAll() {
    }
}
