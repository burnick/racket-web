import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { addLocation } from 'store/slice/location';
import { useDispatch } from 'react-redux';
import { JobProps, ManilaLatLong } from 'types';
import { CoordinateService } from 'hooks/useCoordinateService';
import InputSlider from 'components/InputSlider';
import dynamic from 'next/dynamic';
import isEqual from 'lodash/isEqual';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { JobService } from 'hooks/useJobService';
import Loading from './Loading';
import consoleHelper from 'utils/consoleHelper';
const OpenMaps = dynamic(() => import('components/OpenMaps'), {
  ssr: false,
});

interface LocationMapProps {
  userUid: string;
  userRadius?: number;
  userLat?: number;
  userLng?: number;
  address?: string;
  //jobListing?: JobProps[];
  showJobLocations?: boolean;
}

const LocationMap = ({
  userUid,
  userLat = ManilaLatLong.lat,
  userLng = ManilaLatLong.lng,
  address = ManilaLatLong.address,
  // jobListing,
  userRadius = 10000,
  showJobLocations = false,
}: LocationMapProps) => {
  const [bigMap, setBigMap] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { UpsertCoordinates } = CoordinateService();
  const { mutate, isError } = UpsertCoordinates();
  const { GetAllJobs } = JobService();

  const [location, setLocation] = useState({
    lat: userLat,
    lng: userLng,
    address,
  });

  const [radius, setRadius] = useState<number>(userRadius);

  useEffect(() => {
    if (!isEqual(userRadius, radius) && location?.lng) {
      dispatch(addLocation({ ...location, radius }));
    }
  }, [radius, location, dispatch, userRadius]);

  useEffect(() => {
    if (!isEqual(userRadius, radius) && location?.lng && userUid) {
      consoleHelper('updating location', userRadius, location, radius);
      mutate({
        uid: userUid,
        ...location,
        radius,
      });
    }
  }, [radius, location, mutate, userUid, userRadius]);

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
