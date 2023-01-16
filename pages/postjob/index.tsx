import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addLocation } from 'store/slice/location';
import { CategoriesService } from 'hooks/useCategoriesService';
import { CoordinateService } from 'hooks/useCoordinateService';
import { store } from 'store';
import dynamic from 'next/dynamic';
import InputSlider from 'components/InputSlider';
import PostJobComponent from './postjob.component';
import { ManilaLatLong } from 'types';
import isEqual from 'lodash/isEqual';
import Loading from 'components/Loading';
import { useDispatch } from 'react-redux';

const OpenMaps = dynamic(() => import('components/OpenMaps'), {
  ssr: false,
});

interface AppProps {
  userUid: string;
  userLat?: number;
  userLng?: number;
  address?: string;
}

interface AppProps {
  userUid: string;
  userRadius?: number;
  userLat?: number;
  userLng?: number;
  address?: string;
}

const LocationComponent = ({
  userUid,
  userLat = ManilaLatLong.lat,
  userLng = ManilaLatLong.lng,
  address = ManilaLatLong.address,
  userRadius = 10000,
}: AppProps) => {
  const { UpsertCoordinates } = CoordinateService();
  const dispatch = useDispatch();
  const { GetCategories } = CategoriesService();
  const [radius, setRadius] = useState<number>(userRadius);
  const { mutate, isError, isLoading } = UpsertCoordinates();

  const [location, setLocation] = useState({
    lat: userLat,
    lng: userLng,
    address,
  });

  const { data: categoriesData } = GetCategories();

  useEffect(() => {
    if (!isEqual(userRadius, radius) && location?.lng) {
      dispatch(addLocation({ ...location, radius }));
    }
  }, [radius, location, dispatch, userRadius]);

  useEffect(() => {
    if (!isEqual(userRadius, radius) && location?.lng && userUid) {
      console.log('updating location', userRadius, location, radius);
      mutate({
        uid: userUid,
        ...location,
        radius,
      });
    }
  }, [radius, location, mutate, userUid, userRadius]);

  return (
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
      <InputSlider value={radius} onChange={setRadius} disabled={isError} />

      <PostJobComponent
        uid={userUid}
        {...location}
        categoriesData={categoriesData}
        isLoading={isLoading}
      />
    </Container>
  );
};

const PostJob = () => {
  const state = store.getState();
  const stateUid = state.user.user?.uid;
  const stateLocation = state.location?.location;
  const { GetCoordinates } = CoordinateService();
  const { data: coordinatesData, isLoading } = GetCoordinates(stateUid);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <LocationComponent
          userUid={stateUid}
          userLng={
            stateLocation?.lng ? stateLocation?.lng : coordinatesData?.lng
          }
          userRadius={
            stateLocation?.radius
              ? stateLocation?.radius
              : coordinatesData?.radius
          }
          userLat={
            stateLocation?.lat ? stateLocation?.lat : coordinatesData?.lat
          }
        />
      )}
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
