import React from 'react';
import styled from 'styled-components';
import { CategoriesService } from 'hooks/useCategoriesService';
import { CoordinateService } from 'hooks/useCoordinateService';
import { store } from 'store';
import PostJobComponent from './postjob.component';
import { ManilaLatLong } from 'types';
import Loading from 'components/Loading';
import LocationMap from 'components/LocationMap';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

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
  const { GetCategories } = CategoriesService();

  const { data: categoriesData, isLoading } = GetCategories();

  return (
    <Container>
      <LocationMap
        userUid={userUid}
        userLng={userLng}
        userRadius={userRadius}
        userLat={userLat}
      />
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_RECAPTCHA_KEY as string}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      >
        <PostJobComponent
          uid={userUid}
          lng={userLng}
          lat={userLat}
          address={address}
          categoriesData={categoriesData}
          isLoading={isLoading}
        />
      </GoogleReCaptchaProvider>
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

export default PostJob;
