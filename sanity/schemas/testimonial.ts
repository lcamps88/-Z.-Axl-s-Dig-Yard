import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Caregiver Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "text", title: "Quote", type: "text", rows: 4, validation: (R) => R.required() }),
    defineField({ name: "childAge", title: "Child Age", type: "string" }),
    defineField({ name: "rating", title: "Rating", type: "number", options: { list: [1, 2, 3, 4, 5] }, initialValue: 5 }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
});
