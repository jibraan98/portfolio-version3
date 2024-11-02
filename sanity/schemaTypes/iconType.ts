import { defineType, defineField } from "sanity";

export const iconType = defineType({
  name: "icon",
  title: "Icon",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Icon Name",
      type: "string",
    }),
    defineField({
      name: "iconImage",
      title: "Icon Image",
      type: "image",
      options: {
        hotspot: true, // Enable image cropping and hotspot
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "iconImage",
    },
  },
});
