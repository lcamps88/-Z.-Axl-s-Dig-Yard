import { sanityClient } from "./client";

export async function getPosts(limit = 10) {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, excerpt, publishedAt, mainImage, author->{name, image}
    }`,
    { limit }
  );
}

export async function getPost(slug: string) {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, body, publishedAt, mainImage, author->{name, image}
    }`,
    { slug }
  );
}

export async function getEvents() {
  return sanityClient.fetch(
    `*[_type == "event" && eventDate >= now()] | order(eventDate asc) {
      _id, title, slug, description, eventDate, image, price, capacity, isMembersOnly
    }`
  );
}

export async function getGalleryImages() {
  return sanityClient.fetch(
    `*[_type == "gallery"] | order(_createdAt desc) {
      _id, title, image, caption
    }`
  );
}

export async function getTestimonials() {
  return sanityClient.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc) {
      _id, name, text, rating, childAge
    }`
  );
}

export async function getFAQs(category?: string) {
  const filter = category
    ? `*[_type == "faq" && category == $category]`
    : `*[_type == "faq"]`;
  return sanityClient.fetch(
    `${filter} | order(order asc) { _id, question, answer, category }`,
    { category }
  );
}
