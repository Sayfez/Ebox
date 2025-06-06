import { PartialType } from '@nestjs/mapped-types';
import { CreatePresenceDto } from './create-presence.dto'; 

export class UpdatePresenceDto extends PartialType(CreatePresenceDto) {}
