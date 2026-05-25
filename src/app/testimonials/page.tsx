import TestimonialsClient from "@/components/TestimonialsClient";
import { getTestimonials, type Testimonial } from "@/lib/testimonials";

const fallbackTestimonials: Testimonial[] = [
  {
    id: "dummy-1",
    name: "Maya",
    role: "Customer",
    city: "Lagos",
    quote: "Love the finish and the fit.",
    statusText: "Clean fit and lovely finish.",
    publishedAt: "2026-05-20T12:00:00.000Z",
  },
  {
    id: "dummy-2",
    name: "Toni",
    role: "Customer",
    city: "Abuja",
    quote: "The set looked even better in person.",
    statusText: "Exactly the kind of fit I wanted.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-19T12:00:00.000Z",
  },
  {
    id: "dummy-3",
    name: "Amaka",
    role: "Customer",
    city: "Port Harcourt",
    quote: "Exactly what I wanted.",
    statusText: "Simple, neat, and flattering.",
    publishedAt: "2026-05-18T12:00:00.000Z",
  },
  {
    id: "dummy-4",
    name: "Reni",
    role: "Customer",
    city: "Ibadan",
    quote: "The delivery was smooth and the quality was worth it.",
    statusText: "Good fabric and a confident fit.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-17T12:00:00.000Z",
  },
  {
    id: "dummy-5",
    name: "Sade",
    role: "Customer",
    city: "Ilorin",
    quote: "Very easy order process and the sizing was right.",
    statusText: "The size guide was accurate.",
    publishedAt: "2026-05-16T12:00:00.000Z",
  },
  {
    id: "dummy-6",
    name: "Feyi",
    role: "Customer",
    city: "Benin",
    quote: "I got compliments immediately I wore it.",
    statusText: "The piece stands out beautifully.",
    publishedAt: "2026-05-15T12:00:00.000Z",
  },
  {
    id: "dummy-7",
    name: "Lara",
    role: "Customer",
    city: "Abeokuta",
    quote: "I loved how comfortable it felt all day.",
    statusText: "Soft feel with a polished look.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-14T12:00:00.000Z",
  },
  {
    id: "dummy-8",
    name: "Kemi",
    role: "Customer",
    city: "Lekki",
    quote: "Packaging was neat and the order came fast.",
    statusText: "Quick delivery and lovely presentation.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-13T12:00:00.000Z",
  },
  {
    id: "dummy-9",
    name: "Nifemi",
    role: "Customer",
    city: "Akure",
    quote: "It was one of those orders that looked just like the pictures.",
    statusText: "No surprises, just a really good fit.",
    publishedAt: "2026-05-12T12:00:00.000Z",
  },
  {
    id: "dummy-10",
    name: "Bola",
    role: "Customer",
    city: "Jos",
    quote: "I’ll definitely order another color.",
    statusText: "Already planning my next order.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-11T12:00:00.000Z",
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
