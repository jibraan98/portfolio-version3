import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "icons",
      title: "Icons",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "icon" }], // Reference the same icon schema
        },
      ],
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "icons.0.iconImage", // Preview the first icon
    },
  },
});
