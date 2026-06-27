import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "eventDate", title: "Event Date", type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "image", title: "Event Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "price", title: "Price (USD)", type: "number" }),
    defineField({ name: "capacity", title: "Max Capacity", type: "number" }),
    defineField({ name: "isMembersOnly", title: "Members Only", type: "boolean", initialValue: false }),
    defineField({ name: "stripePaymentLink", title: "Stripe Payment Link", type: "url" }),
    defineField({ name: "body", title: "Full Description", type: "array", of: [{ type: "block" }] }),
  ],
  preview: {
    select: { title: "title", date: "eventDate", media: "image" },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : "Date TBD",
        media,
      };
    },
  },
});
