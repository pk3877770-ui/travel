const hotels = [
  {
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
      { author: "Arjun M.", rating: 5, comment: "Absolutely fantastic stay. The staff was incredibly welcoming." },
      { author: "Sarah L.", rating: 4.5, comment: "Beautiful rooms and amazing food. A bit pricey but worth it." }
    ]
  },
  {
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
      { author: "Ravi K.", rating: 5, comment: "The best place to relax in Manali. The fireplace in the room is a game-changer!" }
    ]
  }
];

const seed = async () => {
  for (const hotel of hotels) {
    try {
      const res = await fetch("http://localhost:3000/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotel)
      });
      const data = await res.json();
      console.log(`Seeded: ${hotel.name}`, data);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  }
};

seed();
