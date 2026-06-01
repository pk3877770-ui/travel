export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
};

/** High-resolution Unsplash URLs — unique photo per article, topic-matched. */
function blogImage(photoId: string) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=85`;
}

/**
 * Shared blog catalog.
 * Each post uses a unique, verified Unsplash image suited to its topic.
 */
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Sovereign Aviation: Private Jets Redefined",
    excerpt:
      "Explore the latest trends in luxury private aviation and how Kramana is setting new standards.",
    date: "May 15, 2026",
    author: "Alexis Vance",
    image: blogImage("photo-1544644181-1484b3fdfc62"),
    category: "Aviation",
  },
  {
    id: 2,
    title: "Hidden Gems of the Maldives: Beyond the Resorts",
    excerpt:
      "Discover the untouched atolls and exclusive experiences that await the discerning traveler.",
    date: "May 10, 2026",
    author: "Elena Rostova",
    image: blogImage("photo-1514282401047-d79a71a590e8"),
    category: "Destinations",
  },
  {
    id: 3,
    title: "Culinary Journeys: Bespoke Dining at 30,000 Feet",
    excerpt:
      "How world-class chefs are transforming the in-flight dining experience for our members.",
    date: "May 05, 2026",
    author: "Marcus Chen",
    image: blogImage("photo-1559339352-11d035aa65de"),
    category: "Lifestyle",
  },
  {
    id: 4,
    title: "Best Travel Destinations in India",
    excerpt:
      "A curated list of India's must-visit luxury and off-the-beaten-path destinations for discerning travelers.",
    date: "June 01, 2026",
    author: "Priya Nair",
    image: blogImage("photo-1571896349842-33c89424de2d"),
    category: "Destinations",
  },
  {
    id: 5,
    title: "Cheap Flight Booking Tips",
    excerpt:
      "Smart strategies to find lower fares without sacrificing comfort or convenience.",
    date: "June 01, 2026",
    author: "Alexis Vance",
    image: blogImage("photo-1436491865332-7a61a109cc05"),
    category: "Travel Tips",
  },
  {
    id: 6,
    title: "Best Time to Book Flights",
    excerpt:
      "Understand seasonal trends and timing tactics for the most cost-effective flight bookings.",
    date: "June 01, 2026",
    author: "Ananya Singh",
    image: blogImage("photo-1454165804606-c3d57bc86b40"),
    category: "Travel Tips",
  },
  {
    id: 7,
    title: "International Travel Guide",
    excerpt:
      "Plan your next overseas journey with essential tips for visas, packing, and premium travel experiences.",
    date: "June 01, 2026",
    author: "Nikhil Rao",
    image: blogImage("photo-1488646953014-85cb44e25828"),
    category: "International",
  },
  {
    id: 8,
    title: "Budget Travel Tips",
    excerpt:
      "Get more value from your trip with budget-friendly planning that still feels luxurious.",
    date: "June 01, 2026",
    author: "Meera Patel",
    image: blogImage("photo-1469474968028-56623f02e42e"),
    category: "Travel Tips",
  },
];

export function getBlogPostById(id: string | number) {
  return blogPosts.find((post) => post.id.toString() === id.toString());
}

/** Latest three articles for the home page journal section. */
export function getFeaturedBlogPosts(count = 3) {
  return blogPosts.slice(-count);
}
