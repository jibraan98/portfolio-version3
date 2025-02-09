import { type SchemaTypeDefinition } from "sanity";

import { projectType } from "./authorType";
import { iconType } from "./iconType";
import { experienceType } from "./experienceType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, iconType, experienceType],
};
