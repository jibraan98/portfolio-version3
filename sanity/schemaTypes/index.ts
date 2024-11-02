import { type SchemaTypeDefinition } from 'sanity'

import {projectType} from './authorType';
import { iconType } from './iconType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, iconType],
}
