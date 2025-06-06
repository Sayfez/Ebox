import { PartialType } from '@nestjs/mapped-types';
import { CreatePresenceEnseignantDto } from './create-presence-enseignant.dto';

export class UpdatePresenceEnseignantDto extends PartialType(CreatePresenceEnseignantDto) {}
