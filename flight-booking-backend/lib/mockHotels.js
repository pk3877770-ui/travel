export const mockHotels = [
  {
    _id: "hotel-1",
    name: "The Grand Taj",
    description: "Experience luxury in the heart of the city. The Grand Taj offers exceptional hospitality, world-class dining, and breathtaking views of the ocean.",
    location: {
      city: "Mumbai",
      country: "India",
      address: "Colaba, Apollo Bunder"
    },
    rating: 4.9,
    reviewsCount: 1245,
    images: [
      "https://images.unsplash.com/photo-1542314831-c6a4d1409e54?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80"
    ],
    amenities: ["Free WiFi", "Breakfast Included", "City Tour", "Valet Parking", "Air Conditioning", "Flat-screen TV"],
    rooms: [
      {
        id: "room-1",
        name: "Deluxe King Room",
        price: 15000,
        capacity: 2,
        features: ["King Bed", "Ocean View", "Bathtub", "Free Minibar"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80"
      },
      {
        id: "room-2",
        name: "Executive Suite",
        price: 35000,
        capacity: 4,
        features: ["2 Bedrooms", "Living Area", "Balcony", "Club Access"],
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80"
      }
    ],
    reviews: [
      { author: "Arjun M.", rating: 5, comment: "Absolutely fantastic stay. The staff was incredibly welcoming.", date: new Date().toISOString() },
      { author: "Sarah L.", rating: 4.5, comment: "Beautiful rooms and amazing food. A bit pricey but worth it.", date: new Date().toISOString() }
    ]
  },
  {
    _id: "hotel-2",
    name: "Himalayan Retreat",
    description: "Nestled in the snowy peaks, our retreat offers the perfect getaway for nature lovers and adventure seekers.",
    location: {
      city: "Manali",
      country: "India",
      address: "Old Manali Road"
    },
    rating: 4.7,
    reviewsCount: 342,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=600&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80"
    ],
    amenities: ["Free WiFi", "Breakfast Included", "Heater", "Mountain View", "Trekking Guide"],
    rooms: [
      {
        id: "room-3",
        name: "Cozy Cabin",
        price: 5500,
        capacity: 2,
        features: ["Queen Bed", "Fireplace", "Mountain View"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
      }
    ],
    reviews: [
      { author: "Ravi K.", rating: 5, comment: "The best place to relax in Manali. The fireplace in the room is a game-changer!", date: new Date().toISOString() }
    ]
  },
  {
    _id: "hotel-3",
    name: "Dehradun Valley Resort",
    description: "A peaceful resort surrounded by lush green valleys and beautiful mountains. Ideal for a weekend escape.",
    location: {
      city: "Dehradun",
      country: "India",
      address: "Rajpur Road"
    },
    rating: 4.6,
    reviewsCount: 218,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80"
    ],
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Free Parking", "Restaurant", "Room Service"],
    rooms: [
      {
        id: "room-4",
        name: "Valley View Room",
        price: 8500,
        capacity: 3,
        features: ["Queen Bed", "Valley View", "Balcony"],
        image: "https://images.unsplash.com/photo-1590490359683-658d34c1f1bd?w=600&q=80"
      }
    ],
    reviews: [
      { author: "Priya S.", rating: 4.8, comment: "Loved the swimming pool and the view from the balcony!", date: new Date().toISOString() }
    ]
  }
];
