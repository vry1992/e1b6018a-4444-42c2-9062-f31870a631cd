import L, { Control, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, useMap } from 'react-leaflet';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useSearchParams } from 'react-router-dom';

// Base map tile:
const maps = {
  base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MapContainer
      center={[37.0902, -95.7129]}
      zoom={3}
      zoomControl={false}
      style={{ height: '100vh', width: '100%', padding: 0 }}>
      {children}
    </MapContainer>
  );
};

export const Map = () => {
  const [params] = useSearchParams();
  // Save map instance to state here:
  const map = useMap();
  // Save routing machine instance to state here:
  const [routingMachine, setRoutingMachine] = useState(null);

  const [points, setPoints] = useState<LatLng[]>([]);

  // Routing machine ref
  const RoutingMachineRef = useRef<Control | null>(null);

  // Create the routing-machine instance:
  useEffect(() => {
    // @ts-ignore
    RoutingMachineRef.current = L.Routing.control({
      position: 'topleft',
      autoRoute: false,
      // @ts-ignore
      lineOptions: {
        styles: [
          {
            color: '#757de8',
          },
        ],
      },
      waypoints: [],
    });
    console.log(RoutingMachineRef.current);
    // @ts-ignore
    setRoutingMachine(RoutingMachineRef.current);
  }, [map]);

  useEffect(() => {
    const rawParams = params.get('p');
    const first = rawParams?.split(';');
    const pos = first?.map((item) => {
      const [x, y] = item.split(',');
      return L.latLng(+x, +y);
    }) as LatLng[];
    setPoints(pos);
  }, [params]);

  // // Set waypoints when start and end points are updated:
  useEffect(() => {
    if (routingMachine) {
      //@ts-ignore
      routingMachine.addTo(map);
      //@ts-ignore
      routingMachine.setWaypoints(points);
    }
  }, [routingMachine, points]);

  // Update start and end points on button click:

  return (
    <LayersControl position="topright">
      {/* <LayersControl.BaseLayer checked name="Map"> */}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={maps.base}
      />
      {/* </LayersControl.BaseLayer> */}
    </LayersControl>
  );
};
