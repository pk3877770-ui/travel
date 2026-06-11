import { BlogPost } from "@/components/BlogCard";

const initialCounts: Record<string, number> = {
  "DESTINATIONS": 25,
  "TRAVEL TIPS": 20,
  "TRAVEL GUIDES": 18,
  "HOTEL GUIDES": 12,
  "FLIGHT TIPS": 10,
  "NEWS & UPDATES": 8
};

const mockImages: Record<string, string[]> = {
  "DESTINATIONS": [
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    "https://images.unsplash.com/photo-1502602898657-3e907a5ea82c?w=800&q=80",
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80",
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80"
  ],
  "TRAVEL TIPS": [
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80"
  ],
  "TRAVEL GUIDES": [
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80",
    "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800&q=80",
    "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
  ],
  "HOTEL GUIDES": [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    "https://images.unsplash.com/photo-1542314831-c6a420325142?w=800&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c0d13c11?w=800&q=80"
  ],
  "FLIGHT TIPS": [
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    "https://images.unsplash.com/photo-1569154941061-e231b4732ef1?w=800&q=80",
    "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&q=80"
  ],
  "NEWS & UPDATES": [
    "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80",
    "https://images.unsplash.com/photo-1569154941061-e231b4732ef1?w=800&q=80",
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&q=80",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80"
  ]
};

const mockSubjects: Record<string, string[]> = {
  "DESTINATIONS": ["Maldives", "Bali", "Paris", "Tokyo", "Rome", "Dubai", "the Swiss Alps", "New York", "Santorini", "Costa Rica", "Phuket", "Fiji", "Iceland", "Peru", "Kyoto"],
  "TRAVEL TIPS": ["Solo Travelers", "Families", "Couples", "Digital Nomads", "Backpackers", "Seniors", "First-Time Flyers", "Budget Travelers", "Road Trippers", "Weekend Getaways"],
  "TRAVEL GUIDES": ["Europe", "Southeast Asia", "South America", "Japan", "Australia", "New Zealand", "India", "Morocco", "Vietnam", "Italy", "Greece", "Canada"],
  "HOTEL GUIDES": ["Luxury Resorts", "Boutique Hotels", "Budget Hostels", "Eco-Lodges", "Overwater Bungalows", "City Center Hotels", "All-Inclusive Resorts", "Bed & Breakfasts"],
  "FLIGHT TIPS": ["Long-Haul Flights", "Red-Eye Flights", "Budget Airlines", "Business Class", "First Class", "Connecting Flights", "International Travel", "Domestic Flights"],
  "NEWS & UPDATES": ["Summer 2025", "Winter 2025", "New Routes", "Visa Rules", "Airline Mergers", "Travel Advisories", "Airport Security", "Luggage Policies"]
};

const mockTitleTemplates: Record<string, string[]> = {
  "DESTINATIONS": [
    "10 Most Beautiful Places to Visit in {subject}",
    "The Ultimate Guide to Exploring {subject}",
    "Hidden Gems You Must See in {subject}",
    "Why {subject} Should Be Your Next Destination",
    "A Week in {subject}: The Perfect Itinerary"
  ],
  "TRAVEL TIPS": [
    "Essential Survival Tips for {subject}",
    "How {subject} Can Save Money on the Road",
    "The Ultimate Packing List for {subject}",
    "Top 5 Mistakes {subject} Make and How to Avoid Them",
    "The Best Apps and Tools for {subject}"
  ],
  "TRAVEL GUIDES": [
    "A Complete Travel Guide to {subject} in 2025",
    "2 Weeks in {subject}: The Perfect Itinerary",
    "What to Know Before Traveling to {subject}",
    "The Best Food and Culture Spots in {subject}",
    "How to Plan the Perfect Trip to {subject}"
  ],
  "HOTEL GUIDES": [
    "How to Choose the Perfect {subject}",
    "Top 10 {subject} for Your Next Vacation",
    "What to Expect When Booking {subject}",
    "Are {subject} Worth the Price?",
    "A Guide to Finding the Best Deals on {subject}"
  ],
  "FLIGHT TIPS": [
    "How to Survive {subject} Without Going Crazy",
    "The Best Ways to Upgrade to {subject}",
    "What Airlines Don't Tell You About {subject}",
    "Packing Hacks for {subject}",
    "Tips for Booking {subject} on a Budget"
  ],
  "NEWS & UPDATES": [
    "Latest {subject} Travel Updates You Need to Know",
    "Airlines Announce Exciting {subject} Changes",
    "What the New {subject} Means for Travelers",
    "Breaking: Global {subject} Policy Updates",
    "Top Travel Trends for {subject}"
  ]
};

const mockAuthors = [
  { name: "Ananya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" },
  { name: "Rohit Verma", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80" },
  { name: "Priya Nair", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80" },
  { name: "Karan Malhotra", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" },
  { name: "Neha Gupta", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" },
  { name: "Vikram Singh", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80" }
];

let postIdCounter = 1;
export const allPosts: BlogPost[] = [];
const mutableCounts = { ...initialCounts };
const categories = Object.keys(mutableCounts);
let added = true;

while (added) {
  added = false;
  for (const cat of categories) {
    if (mutableCounts[cat] > 0) {
      const idx = initialCounts[cat] - mutableCounts[cat]; // Current 0-based index for this category
      
      const templates = mockTitleTemplates[cat];
      const template = templates[idx % templates.length];
      const subjects = mockSubjects[cat];
      const subject = subjects[idx % subjects.length];
      const title = template.replace("{subject}", subject);
      
      const images = mockImages[cat];
      const image = images[idx % images.length];
      
      const author = mockAuthors[idx % mockAuthors.length];
      const readTime = `${(idx % 5) + 3} min read`;
      
      allPosts.push({
        id: String(postIdCounter),
        title: title,
        category: cat,
        excerpt: `Explore ${subject} with our comprehensive guides, expert insights, and the latest tips to make the most out of your journey.`,
        date: `May ${Math.max(1, 31 - (postIdCounter % 30))}, 2025`,
        readTime,
        image,
        author
      });
      
      postIdCounter++;
      mutableCounts[cat]--;
      added = true;
    }
  }
}

export const getPostById = (id: string) => {
  const basePost = allPosts.find(p => p.id === id);
  if (!basePost) return null;
  
  return {
    ...basePost,
    content: `
      <p class="lead">${basePost.excerpt}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>Deep Dive into ${basePost.title.split(' ').slice(0, 4).join(' ')}...</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <blockquote>"Traveling – it leaves you speechless, then turns you into a storyteller." – Ibn Battuta</blockquote>
      
      <h3>Top Insights</h3>
      <ul>
        <li>Explore the historic downtown and local markets.</li>
        <li>Try the authentic street food and local delicacies.</li>
        <li>Take a guided tour of the main attractions.</li>
        <li>Watch the sunset from the highest viewpoint.</li>
      </ul>
      
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `
  };
};
