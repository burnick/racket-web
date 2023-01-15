import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CategoriesService } from 'hooks/useCategoriesService';
import { CoordinateService } from 'hooks/useCoordinateService';
import { store } from 'store';
import dynamic from 'next/dynamic';
import InputSlider from 'components/InputSlider';
import PostJobComponent from './postjob.component';
import { ManilaLatLong } from 'types';
import isEqual from 'lodash/isEqual';
import Loading from 'components/Loading';

const OpenMaps = dynamic(() => import('components/OpenMaps'), {
  ssr: false,
});

interface AppProps {
  userUid: string;
  userLat?: number;
  userLng?: number;
  address?: string;
}

const PostJob = ({
  userLat = ManilaLatLong.lat,
  userLng = ManilaLatLong.lng,
  address = ManilaLatLong.address,
}: AppProps) => {
  const state = store.getState();
  const refSliderElem = useRef<HTMLInputElement | null>(null);
  const node = refSliderElem.current;
  const { FindAllCategories } = CategoriesService();
  const { GetCoordinates, UpsertCoordinates } = CoordinateService();
  const {
    mutate,
    isError,
    isLoading: coordinatesUpdatesLoading,
  } = UpsertCoordinates();
  const [location, setLocation] = useState({
    lat: userLat,
    lng: userLng,
    address,
  });

  const { data: coordinatesData, isLoading: isCoordinatesLoading } =
    GetCoordinates(state.user?.uid);

  const [radius, setRadius] = useState<number>(
    coordinatesData ? coordinatesData.radius : 10000
  );

  const { data: categoriesData, isLoading } = FindAllCategories();

  useEffect(() => {
    if (coordinatesData?.radius !== radius && location?.lng) {
      console.log(
        'updating location',
        coordinatesData?.radius,
        location,
        radius
      );
      mutate({
        uid: state.user.uid,
        ...location,
        radius,
      });
    }
  }, [radius, location, mutate, state.user.uid, coordinatesData]);

  useEffect(() => {
    if (node) {
      node.addEventListener('touchend', () => {
        if (!isEqual(node.value, radius)) {
          //console.log('radius changed via mobile', node.value);
          setRadius(node.value as unknown as number);
        }
      });

      node.addEventListener('mouseout', () => {
        if (!isEqual(node.value, radius)) {
          setRadius(node.value as unknown as number);
          //console.log('radius changed via desktop', node.value, radius);
        }
      });
    }

    return () => {
      // refSliderElem.current = null;
      node?.removeEventListener('touchend', () => {
        console.log('remove touchend listener');
      });
      node?.removeEventListener('mouseout', () => {
        console.log('remove mouseout listener');
      });
    };
  }, [radius, node]);

  return (
    <>
      {(coordinatesUpdatesLoading || isCoordinatesLoading || isLoading) && (
        <Loading />
      )}
      <Container>
        <MapContainer>
          <OpenMaps
            radius={radius}
            marker={{
              ...location,
            }}
            setMarkers={setLocation}
          />
        </MapContainer>
        <InputSlider
          value={radius}
          inputRef={refSliderElem}
          disabled={isError}
        />

        <PostJobComponent
          uid={state.user?.uid}
          {...location}
          categoriesData={categoriesData}
          isLoading={isLoading}
        />
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const MapContainer = styled.div`
  display: flex;
  position: relative;
  height: 30vh;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
`;

export default PostJob;
