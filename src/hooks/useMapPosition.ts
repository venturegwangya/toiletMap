import { useState, useCallback, useEffect } from 'react';
import { Map as LeafletMap, LatLng } from 'leaflet';

export function useMapPosition(map: LeafletMap | undefined): LatLng | null {
  const [position, setPosition] = useState(
    map != null ? map.getCenter() : null,
  );

  const onMove = useCallback(() => {
    if (map) setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    if (map) map.on('move', onMove);
    return () => {
      if (map) map.off('move', onMove);
    };
  }, [map, onMove]);

  return position;
}
