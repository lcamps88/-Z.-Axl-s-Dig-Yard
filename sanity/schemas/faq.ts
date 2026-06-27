import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (R) => R.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (R) => R.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Birthday Parties", value: "birthdays" },
          { title: "Memberships", value: "memberships" },
          { title: "Plan Your Visit", value: "visit" },
        ],
      },
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
  ],
});
