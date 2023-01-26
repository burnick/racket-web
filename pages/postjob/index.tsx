import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, store } from 'store';
import styled from 'styled-components';
import { CategoriesService } from 'hooks/useCategoriesService';
import { CoordinateService } from 'hooks/useCoordinateService';
import PostJobComponent from './postjob.component';
// import { ManilaLatLong } from 'types';
import Loading from 'components/Loading';
import LocationMap from 'components/LocationMap';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import AuthRoute from 'pages/authRoute';
import consoleHelper from 'utils/consoleHelper';
// import consoleHelper from 'utils/consoleHelper';

const { GetCategories } = CategoriesService();
const { GetCoordinates } = CoordinateService();

interface AppProps {
  userUid: string;
  userLat: number;
  userLng: number;
  address: string;
}

interface AppProps {
  userUid: string;
  userRadius: number;
  userLat: number;
  userLng: number;
  address: string;
}

const LocationComponent = ({
  userUid,
  userLat,
  userLng,
  address,
  userRadius,
}: AppProps) => {
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    GetCategories();

  return (
    <AuthRoute>
      <Container>
        <LocationMap
          userUid={userUid}
          userLng={userLng}
          userRadius={userRadius}
          userLat={userLat}
          address={address}
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
            isLoading={isCategoriesLoading}
          />
        </GoogleReCaptchaProvider>
      </Container>
    </AuthRoute>
  );
};

const PostJob = () => {
  const state = store.getState();
  const stateUid = state.user.user?.uid;
  const stateLocation = useSelector(
    (state: RootState) => state.location.location
  );
  const { data: coordinatesData, isLoading } = GetCoordinates(stateUid);
  const [newLocation, setNewLocation] = useState(coordinatesData);

  useEffect(() => {
    if (newLocation?.address !== stateLocation?.address) {
      consoleHelper('My Redux state has changed!', stateLocation);
      setNewLocation(stateLocation);
    } else {
      setNewLocation(coordinatesData);
    }
  }, [stateLocation, coordinatesData, newLocation?.address]);

  return (
    <>
      {isLoading || (!newLocation && !newLocation?.uid) ? (
        <Loading />
      ) : (
        <LocationComponent
          userUid={stateUid}
          userLng={newLocation?.lng}
          userRadius={newLocation.radius}
          userLat={newLocation.lat}
          address={newLocation.address}
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
