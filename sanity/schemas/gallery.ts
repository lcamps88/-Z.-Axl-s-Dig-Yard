import { defineType, defineField } from "sanity";

export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "The Yard", value: "yard" },
          { title: "Birthday Parties", value: "birthdays" },
          { title: "Events", value: "events" },
          { title: "Art Studio", value: "art" },
        ],
      },
    }),
  ],
});
