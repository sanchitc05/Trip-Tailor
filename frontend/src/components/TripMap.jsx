import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Initialize Mapbox token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function TripMap({ waypoints, destination }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const normalizedWaypoints = Array.isArray(waypoints) ? waypoints : [];

  useEffect(() => {
    if (!mapContainer.current) return;
    if (!import.meta.env.VITE_MAPBOX_TOKEN) {
      console.warn("Mapbox token not configured");
      return;
    }
    if (!normalizedWaypoints.length) return;

    // Calculate bounds from waypoints
    const coordinates = normalizedWaypoints.map((wp) => [wp.longitude, wp.latitude]);
    const bounds = coordinates.reduce(
      (bounds, coord) => {
        return bounds.extend(coord);
      },
      new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
    );

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      bounds: bounds,
      padding: 50,
    });

    // Add waypoint markers
    normalizedWaypoints.forEach((waypoint, index) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage =
        index === 0
          ? "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%2322c55e%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>')"
          : index === normalizedWaypoints.length - 1
            ? "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23ef4444%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>')"
            : "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%223b82f6%22><circle cx=%2212%22 cy=%2212%22 r=%2710%22/></svg>')";
      el.style.backgroundSize = "contain";
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.cursor = "pointer";

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `
        <div class="font-medium text-sm">
          <p class="font-semibold">${waypoint.name}</p>
          <p class="text-xs text-gray-600">Day ${waypoint.day}</p>
        </div>
      `
      );

      new mapboxgl.Marker(el)
        .setLngLat([waypoint.longitude, waypoint.latitude])
        .setPopup(popup)
        .addTo(map.current);
    });

    // Draw route lines connecting waypoints
    if (normalizedWaypoints.length > 1) {
      map.current.on("load", () => {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          },
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 3,
            "line-opacity": 0.6,
          },
        });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [normalizedWaypoints]);

  return (
    <div
      ref={mapContainer}
      className="h-full w-full rounded-lg border border-slate-200 dark:border-slate-700"
      style={{ minHeight: "400px" }}
    />
  );
}
