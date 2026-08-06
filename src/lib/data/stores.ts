import { BUSINESS } from "@/lib/constants";

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  mapsEmbedSrc: string;
  mapsDirectionsUrl: string;
  isFlagship: boolean;
}

export const STORES: StoreLocation[] = [
  {
    id: "gandhipuram",
    name: "Root Mobiles — Gandhipuram",
    address: `${BUSINESS.address.line1}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.postalCode}`,
    phone: BUSINESS.phone,
    hours: "Mon–Sat 10 AM–9 PM · Sun 11 AM–8 PM",
    lat: BUSINESS.geo.lat,
    lng: BUSINESS.geo.lng,
    mapsEmbedSrc: BUSINESS.mapsEmbedSrc,
    mapsDirectionsUrl: BUSINESS.mapsDirectionsUrl,
    isFlagship: true,
  },
];
