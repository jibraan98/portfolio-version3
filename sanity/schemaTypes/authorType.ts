import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "des",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "img",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "link",
      title: "Project Link",
      type: "url",
    }),
    defineField({
      name: "icons",
      title: "Icons",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "icon" }], // Reference the iconType schema
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "img",
    },
  },
});
