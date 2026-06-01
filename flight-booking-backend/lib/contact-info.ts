/** Shared contact details for Contact page, footer, and support pages. */
export const CONTACT_PHONE_DISPLAY = "+91 95367 57207";
export const CONTACT_PHONE_TEL = "+919536757207";
export const CONTACT_EMAIL = "pradeep9536757207@gmail.com";

export const CONTACT_ADDRESS = {
  placeName: "World Trade Centre",
  street: "Cuffe Parade, Colaba",
  city: "Mumbai",
  state: "Maharashtra",
  postalCode: "400005",
  country: "India",
  mapQuery: "World Trade Centre, Cuffe Parade, Colaba, Mumbai, Maharashtra 400005, India",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=World+Trade+Centre+Cuffe+Parade+Colaba+Mumbai+Maharashtra+400005+India&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=World+Trade+Centre+Cuffe+Parade+Colaba+Mumbai+Maharashtra+400005+India",
} as const;

export function formatContactAddressMultiline() {
  const { placeName, street, city, state, postalCode, country } = CONTACT_ADDRESS;
  return `${placeName}\n${street}\n${city}, ${state} ${postalCode}\n${country}`;
}
