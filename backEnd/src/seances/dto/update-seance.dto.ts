import { PartialType } from '@nestjs/mapped-types';
import { CreateSeanceDto } from './create-seance.dto';

export class UpdateSeanceDto extends PartialType(CreateSeanceDto) {}
