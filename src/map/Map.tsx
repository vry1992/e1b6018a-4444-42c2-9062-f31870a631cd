import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useSearchParams } from 'react-router-dom';

const maps = {
  base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MapContainer
      center={[46.4314118, 30.7008806]}
      zoom={3}
      zoomControl={false}
      style={{ height: '100vh', width: '100%', padding: 0 }}>
      {children}
    </MapContainer>
  );
};

const icon = new L.DivIcon({
  html: `<div style="position: relative;background: red; width: 10px; height: 10px; border-radius: 5px"></div>`,
  iconSize: [10, 10],
  className: 'leaflet-div-icon-custom',
});

export const Map = () => {
  const [params] = useSearchParams();

  const [points, setPoints] = useState<LatLng[]>([]);

  useEffect(() => {
    const rawParams = params.get('p');
    const first = rawParams?.split(';');
    const pos = first?.map((item) => {
      const [x, y] = item.split(',');
      return L.latLng(+x, +y);
    }) as LatLng[];
    setPoints(pos);
  }, [params]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={maps.base}
      />
      <>
        {points.map((latlng) => (
          <Marker position={latlng} icon={icon} />
        ))}
      </>
    </>
  );
};
