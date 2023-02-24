import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { addLocation } from 'src/store/slice/location';
import { useDispatch } from 'react-redux';
import { JobProps } from 'types';
import { CoordinateService } from 'hooks/useCoordinateService';
import InputSlider from 'components/InputSlider';
import dynamic from 'next/dynamic';
import isEqual from 'lodash/isEqual';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { JobService } from 'hooks/useJobService';
import Loading from './Loading';
import consoleHelper from 'src/utils/consoleHelper';
const OpenMaps = dynamic(() => import('components/OpenMaps'), {
  ssr: false,
});

interface LocationMapProps {
  userUid: string;
  userRadius: number;
  userLat: number;
  userLng: number;
  address: string;
  //jobListing?: JobProps[];
  showJobLocations?: boolean;
}
const { UpsertCoordinates, UpsertRadius } = CoordinateService();
const { GetAllJobs } = JobService();

const LocationMap = ({
  userUid,
  userLat,
  userLng,
  address,
  // jobListing,
  userRadius = 10000,
  showJobLocations = false,
}: LocationMapProps) => {
  const [bigMap, setBigMap] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [radius, setRadius] = useState<number>(userRadius);
  const { mutate, isError } = UpsertCoordinates();
  const { mutate: mutateRadius } = UpsertRadius();

  const [location, setLocation] = useState({
    lat: userLat,
    lng: userLng,
    address,
  });

  useEffect(() => {
    if (location?.lng || !isEqual(userRadius, radius)) {
      //setState for location
      dispatch(addLocation({ ...location, radius }));
    }
  }, [dispatch, location, radius, userRadius]);

  useEffect(() => {
    if (!isEqual(userLat, location?.lat)) {
      consoleHelper('updating location', location);
      mutate({
        uid: userUid,
        ...location,
        radius,
      });
    }
  }, [radius, location, mutate, userLat, userUid, userRadius]);

  useEffect(() => {
    if (!isEqual(userRadius, radius) && userUid) {
      consoleHelper('updating radius', userRadius, radius);
      mutateRadius({
        uid: userUid,
        radius,
      });
    }
  }, [radius, userUid, mutateRadius, userRadius]);

  const handleMapClick = useCallback(() => setBigMap((value) => !value), []);

  const { data: jobListing, isLoading } = GetAllJobs({
    total: 50,
    lat: userLat,
    lng: userLng,
    radius: userRadius || 30000,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MapContainer bigMap={bigMap}>
        <OpenMaps
          radius={radius}
          marker={{
            ...location,
          }}
          multipleMarkers={
            showJobLocations && jobListing && jobListing?.data
              ? jobListing.data
                  ?.map((job: JobProps) => job)
                  .filter((job: JobProps) => job?.id)
              : []
          }
          setMarkers={setLocation}
        />
        {!bigMap ? (
          <ArrowDownStyled onClick={handleMapClick} />
        ) : (
          <ArrowUpStyled onClick={handleMapClick} />
        )}
      </MapContainer>
      <InputSlider value={radius} onChange={setRadius} disabled={isError} />
    </>
  );
};

const MapContainer = styled.div<{ bigMap: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 30vh;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  ${({ bigMap }) =>
    bigMap &&
    `
  height: 650px;
  `};
`;

const ArrowDownStyled = styled(CaretDownOutlined)`
  svg {
    width: 30px;
    height: 30px;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ArrowUpStyled = styled(CaretUpOutlined)`
  svg {
    width: 30px;
    height: 30px;
    color: ${(props) => props.theme.colors.primary};
  }
`;
export default LocationMap;
