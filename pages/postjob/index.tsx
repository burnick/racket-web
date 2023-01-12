import React, { useState, useEffect, useRef } from 'react';
import MainPage from 'components/MainPage';
import styled from 'styled-components';
import { CategoriesService } from 'hooks/useCategoriesService';
import { CoordinateService } from 'hooks/useCoordinateService';
import { store } from 'store';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import InputSlider from 'components/InputSlider';
import PostJobComponent from './postjob.content';
import { ManilaLatLong } from 'types';

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
  const { FindAllCategories } = CategoriesService();
  const { GetCoordinates, UpsertCoordinates } = CoordinateService();
  const { mutate, isError } = UpsertCoordinates();
  const [location, setLocation] = useState({
    lat: userLat,
    lng: userLng,
    address,
  });

  const { data: coordinatesData, isLoading: isCoordinatesLoading } =
    GetCoordinates(state.user?.uid);
  const [radius, setRadius] = useState<number>(coordinatesData?.radius);
  const { data: categoriesData, isLoading } = FindAllCategories();

  useEffect(() => {
    if (radius && location?.lng) {
      mutate({
        uid: state.user.uid,
        ...location,
        radius,
      });
    }
  }, [radius, location, mutate]);

  const contentIsLoading = isCoordinatesLoading || isLoading;
  return (
    <MainPage>
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
        {contentIsLoading && <Spin tip={'Loading'} size="small" />}
        {!contentIsLoading && (
          <PostJobComponent
            uid={state.user?.uid}
            {...location}
            categoriesData={categoriesData}
            isLoading={isLoading}
          />
        )}
      </Container>
    </MainPage>
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
