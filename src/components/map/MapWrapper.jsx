import Card from "@/components/ui/Card";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function MapWrapper() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const provider = import.meta.env.VITE_MAP_PROVIDER;
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    if (provider !== "mapbox" || !token || !containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [77.209, 28.6139],
      zoom: 4.5,
    });

    new mapboxgl.Marker({ color: "#5a67ff" }).setLngLat([77.209, 28.6139]).addTo(mapRef.current);
    new mapboxgl.Marker({ color: "#06b6d4" }).setLngLat([75.7873, 26.9124]).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <Card className="h-[420px]">
      <div ref={containerRef} className="h-full w-full rounded-xl">
        <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-brand-900/40">
          <p className="text-slate-300">
            Set `VITE_MAP_PROVIDER=mapbox` and token to activate interactive map.
          </p>
        </div>
      </div>
    </Card>
  );
}
