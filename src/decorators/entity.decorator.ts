/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export const EntityName = (entity: string) => SetMetadata('entity', entity);
