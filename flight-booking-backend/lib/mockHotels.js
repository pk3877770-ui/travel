const img = (id) => `https://images.unsplash.com/${id}?w=1200&q=80`;
const now = () => new Date().toISOString();

export const mockHotels = [
  {
    _id: "hotel-1",
    name: "The Grand Taj",
    description: "Experience luxury in the heart of the city. The Grand Taj offers exceptional hospitality, world-class dining, and breathtaking views of the ocean.",
    location: { city: "Mumbai", country: "India", address: "Colaba, Apollo Bunder" },
    rating: 4.9,
    reviewsCount: 1245,
    images: [
      img("photo-1566073771259-6a8506099945"),
      img("photo-1582719508461-905c673771fd"),
      img("photo-1578683010236-d716f9a3f461"),
    ],
    amenities: ["Free WiFi", "Breakfast Included", "City Tour", "Valet Parking", "Air Conditioning", "Flat-screen TV"],
    rooms: [
      { id: "room-1", name: "Deluxe King Room", price: 15000, capacity: 2, features: ["King Bed", "Ocean View", "Bathtub", "Free Minibar"], image: img("photo-1590490360182-c33d57733427") },
      { id: "room-2", name: "Executive Suite", price: 35000, capacity: 4, features: ["2 Bedrooms", "Living Area", "Balcony", "Club Access"], image: img("photo-1566665797739-1674de7a421a") },
    ],
    reviews: [
      { author: "Arjun M.", rating: 5, comment: "Absolutely fantastic stay. The staff was incredibly welcoming.", date: now() },
      { author: "Sarah L.", rating: 4.5, comment: "Beautiful rooms and amazing food. A bit pricey but worth it.", date: now() },
    ],
  },
  {
    _id: "hotel-2",
    name: "Himalayan Retreat",
    description: "Nestled in the snowy peaks, our retreat offers the perfect getaway for nature lovers and adventure seekers.",
    location: { city: "Manali", country: "India", address: "Old Manali Road" },
    rating: 4.7,
    reviewsCount: 342,
    images: [
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1519999482648-25049ddd37b1"),
      img("photo-1445019980597-93fa8acb246c"),
    ],
    amenities: ["Free WiFi", "Breakfast Included", "Heater", "Mountain View", "Trekking Guide"],
    rooms: [
      { id: "room-3", name: "Cozy Cabin", price: 5500, capacity: 2, features: ["Queen Bed", "Fireplace", "Mountain View"], image: img("photo-1522708323590-d24dbb6b0267") },
    ],
    reviews: [
      { author: "Ravi K.", rating: 5, comment: "The best place to relax in Manali. The fireplace in the room is a game-changer!", date: now() },
    ],
  },
  {
    _id: "hotel-3",
    name: "Dehradun Valley Resort",
    description: "A peaceful resort surrounded by lush green valleys and beautiful mountains. Ideal for a weekend escape.",
    location: { city: "Dehradun", country: "India", address: "Rajpur Road" },
    rating: 4.6,
    reviewsCount: 218,
    images: [
      img("photo-1564501049412-61c2a3083791"),
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1596394516093-501ba68a0ba6"),
    ],
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Free Parking", "Restaurant", "Room Service"],
    rooms: [
      { id: "room-4", name: "Valley View Room", price: 8500, capacity: 3, features: ["Queen Bed", "Valley View", "Balcony"], image: img("photo-1590490359683-658d34c1f1bd") },
    ],
    reviews: [
      { author: "Priya S.", rating: 4.8, comment: "Loved the swimming pool and the view from the balcony!", date: now() },
    ],
  },
  {
    _id: "hotel-4",
    name: "Goa Beach Resort",
    description: "Wake up to the sound of waves at this beachfront paradise with private cabanas, infinity pools, and sunset views.",
    location: { city: "Goa", country: "India", address: "Calangute Beach Road" },
    rating: 4.5,
    reviewsCount: 876,
    images: [
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1535827841776-24afc1e255ac"),
      img("photo-1551918120-9739cb430c6d"),
    ],
    amenities: ["Free WiFi", "Breakfast Included", "Swimming Pool", "Beach Access", "Bar", "Air Conditioning"],
    rooms: [
      { id: "room-5", name: "Beachfront Villa", price: 12000, capacity: 2, features: ["King Bed", "Private Pool", "Sea View"], image: img("photo-1582719478250-c89cae4dc85b") },
      { id: "room-6", name: "Garden Cottage", price: 7000, capacity: 3, features: ["Twin Beds", "Garden View", "Patio"], image: img("photo-1551882547-ff40c63fe5fa") },
    ],
    reviews: [
      { author: "Neha R.", rating: 4.5, comment: "Perfect beach holiday. The cabanas are a dream.", date: now() },
    ],
  },
  {
    _id: "hotel-5",
    name: "Royal Rajputana Palace",
    description: "Live like royalty in a restored heritage palace featuring grand courtyards, fine dining, and a luxurious spa.",
    location: { city: "Jaipur", country: "India", address: "Amer Fort Road" },
    rating: 4.8,
    reviewsCount: 1032,
    images: [
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1578898887932-dce23a595ad4"),
      img("photo-1611892440504-42a792e24d32"),
    ],
    amenities: ["Free WiFi", "Breakfast Included", "Spa", "Heritage Tour", "Fine Dining", "Valet Parking"],
    rooms: [
      { id: "room-7", name: "Heritage Suite", price: 18000, capacity: 2, features: ["Royal Decor", "Courtyard View", "Bathtub"], image: img("photo-1611892440504-42a792e24d32") },
    ],
    reviews: [
      { author: "Vikram S.", rating: 5, comment: "A truly royal experience. Felt like a maharaja.", date: now() },
    ],
  },
  {
    _id: "hotel-6",
    name: "Backwater Bliss",
    description: "A tranquil lakeside resort amid Kerala's famous backwaters, offering houseboat cruises and Ayurvedic treatments.",
    location: { city: "Kochi", country: "India", address: "Marine Drive" },
    rating: 4.4,
    reviewsCount: 564,
    images: [
      img("photo-1571003123894-1f0594d2b5d9"),
      img("photo-1582719508461-905c673771fd"),
      img("photo-1540541338287-41700207dee6"),
    ],
    amenities: ["Free WiFi", "Breakfast Included", "Spa", "Boat Tour", "Restaurant", "Air Conditioning"],
    rooms: [
      { id: "room-8", name: "Lakeview Room", price: 6500, capacity: 2, features: ["Queen Bed", "Lake View", "Balcony"], image: img("photo-1540541338287-41700207dee6") },
    ],
    reviews: [
      { author: "Anjali T.", rating: 4.5, comment: "The houseboat cruise was unforgettable.", date: now() },
    ],
  },
  {
    _id: "hotel-7",
    name: "Capital Comfort Inn",
    description: "A modern business hotel in the heart of the capital with easy access to metro, malls, and major attractions.",
    location: { city: "New Delhi", country: "India", address: "Connaught Place" },
    rating: 4.2,
    reviewsCount: 689,
    images: [
      img("photo-1611892440504-42a792e24d32"),
      img("photo-1631049307264-da0ec9d70304"),
      img("photo-1590490360182-c33d57733427"),
    ],
    amenities: ["Free WiFi", "Breakfast Included", "Gym", "Business Center", "Restaurant", "Air Conditioning"],
    rooms: [
      { id: "room-9", name: "Business Room", price: 4500, capacity: 2, features: ["Queen Bed", "Work Desk", "City View"], image: img("photo-1631049307264-da0ec9d70304") },
    ],
    reviews: [
      { author: "Rohit G.", rating: 4, comment: "Great location for business travel. Clean and efficient.", date: now() },
    ],
  },
  {
    _id: "hotel-8",
    name: "Lakeview Grand Udaipur",
    description: "An iconic lakeside hotel with panoramic views of Lake Pichola, candlelit dinners, and old-world charm.",
    location: { city: "Udaipur", country: "India", address: "Lake Pichola" },
    rating: 4.9,
    reviewsCount: 1421,
    images: [
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1542314831-c6a4d1409e54"),
      img("photo-1564501049412-61c2a3083791"),
    ],
    amenities: ["Free WiFi", "Breakfast Included", "Spa", "Lake View", "Fine Dining", "Valet Parking", "Swimming Pool"],
    rooms: [
      { id: "room-10", name: "Lake Palace Suite", price: 22000, capacity: 2, features: ["Lake View", "Private Balcony", "Butler Service"], image: img("photo-1542314831-c6a4d1409e54") },
    ],
    reviews: [
      { author: "Meera D.", rating: 5, comment: "The most romantic hotel I've ever stayed at. Stunning views.", date: now() },
    ],
  },
];
