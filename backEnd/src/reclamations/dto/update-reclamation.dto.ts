import { PartialType } from '@nestjs/mapped-types';
import { CreateReclamationDto } from './create-reclamation.dto';

export class UpdateReclamationDto extends PartialType(CreateReclamationDto) {}
