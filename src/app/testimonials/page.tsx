import TestimonialsClient from "@/components/TestimonialsClient";
import { getTestimonials, type Testimonial } from "@/lib/testimonials";

const fallbackTestimonials: Testimonial[] = [
  {
    id: "dummy-1",
    name: "Maya",
    role: "",
    city: "",
    quote: "Love the finish and the fit.",
    statusText: "",
    publishedAt: "2026-05-20T12:00:00.000Z",
  },
  {
    id: "dummy-2",
    name: "Toni",
    role: "",
    city: "",
    quote: "",
    statusText: "",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-19T12:00:00.000Z",
  },
  {
    id: "dummy-3",
    name: "Amaka",
    role: "",
    city: "",
    quote: "Exactly what I wanted.",
    statusText: "",
    publishedAt: "2026-05-18T12:00:00.000Z",
  },
  {
    id: "dummy-4",
    name: "Reni",
    role: "",
    city: "",
    quote: "",
    statusText: "",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-17T12:00:00.000Z",
  },
];

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <TestimonialsClient
      testimonials={testimonials.length ? testimonials : fallbackTestimonials}
    />
  );
}
