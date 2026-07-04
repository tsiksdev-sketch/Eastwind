"use client";

import { useRef, useState } from "react";
import Map, { Marker, Popup, NavigationControl, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type Location = {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  hours?: string;
};

const locations: Location[] = [
  {
    id: 1,
    name: "Harare Office",
    address: "8 Jackson Rd, Hillside",
    city: "Harare",
    country: "Zimbabwe",
    latitude: -17.8418716,
    longitude: 31.0740771,
    phone: "+263 71 678 0112",
    email: "contact@africarbontrading.com",
    hours: "Mon-Fri: 8:00 AM - 5:00 PM",
  },
  {
    id: 2,
    name: "Lusaka Office",
    address: "86 Independence Avenue",
    city: "Lusaka",
    country: "Zambia",
    latitude: -15.4288264,
    longitude: 28.3205787,
    phone: "+260 961375645",
    email: "contact@africarbontrading.com",
    hours: "Mon-Fri: 8:00 AM - 5:00 PM",
  },
];

const centerLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
const centerLng = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;

export function ContactMap() {
  const mapRef = useRef<MapRef | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const flyToLocation = (location: Location) => {
    setActiveCard(location.id);
    mapRef.current?.flyTo({
      center: [location.longitude, location.latitude],
      zoom: 14,
      duration: 2000,
    });
  };

  if (!MAPBOX_TOKEN) {
    return (
      <div className="p-4 border border-border rounded-xl text-muted-foreground">
        Mapbox token is missing. Set <code>NEXT_PUBLIC_MAPBOX_TOKEN</code>.
      </div>
    );
  }

  return (
   <section className="py-20 px-6">
    <div className="mx-auto max-w-6xl">
           <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Location Cards */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
       < h2 className="  font-heading text-2xl font-bold md:text-5xl text-transparent bg-clip-text bg-linear-to-r from-emerald-500 via-lime-400 to-green-500">
                   Our Locations
             </h2>

         <p className="text-[16px] text-muted-foreground">
            Click on a location card below to zoom it on the map.
                </p>

        {locations.map((location) => (
          <Card
            key={location.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg bg-lime-500 ${
              activeCard === location.id
                ? "ring-2 ring-yellow-400 shadow-lg"
                : "hover:ring-1 hover:ring-muted-foreground/20"
            }`}
            onClick={() => flyToLocation(location)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-yellow-400" />
                {location.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-white text-sm">
                {location.address}
                <br />
                {location.city}, {location.country}
              </p>

              {location.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-white" />
                  <span>{location.phone}</span>
                </div>
              )}

              {location.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-white" />
                  <span>{location.email}</span>
                </div>
              )}

              {location.hours && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-white" />
                  <span>{location.hours}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map */}
      <div className="lg:flex-1 rounded-xl overflow-hidden border border-border shadow-sm h-75 w-full md:h-auto">
        <Map
          ref={mapRef}
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{
            latitude: centerLat,
            longitude: centerLng,
            zoom: 5,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          <NavigationControl position="top-right" />

          {locations.map((location) => (
            <Marker
              key={location.id}
              latitude={location.latitude}
              longitude={location.longitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent?.stopPropagation?.();
                setSelectedLocation(location);
                setActiveCard(location.id);
              }}
            >
              <div className="cursor-pointer transition-transform hover:scale-110">
                <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
                  <MapPin className="h-6 w-6 text-lime-500" />
                </div>
              </div>
            </Marker>
          ))}

          {selectedLocation && (
            <Popup
              latitude={selectedLocation.latitude}
              longitude={selectedLocation.longitude}
              anchor="bottom"
              onClose={() => setSelectedLocation(null)}
              closeOnClick={false}
              offset={40}
            >
              <div className="p-2 min-w-50">
                <h3 className="font-semibold text-foreground">{selectedLocation.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedLocation.address}
                  <br />
                  {selectedLocation.city}, {selectedLocation.country}
                </p>
                {selectedLocation.phone && (
                  <p className="text-sm mt-2">{selectedLocation.phone}</p>
                )}
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
    </div>
        
   </section>
    
  );
}