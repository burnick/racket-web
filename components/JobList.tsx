import React, {
  useEffect,
  useCallback,
  //useState,
  Dispatch,
  SetStateAction,
} from 'react';
import styled from 'styled-components';
//import PanelCard from 'components/PanelCard';
//import moment from 'moment';
import consoleHelper from 'utils/consoleHelper';
//import isEqual from 'lodash/isEqual';
//import HideShowContact from 'components/HideShowContact';
import { JobService } from 'hooks/useJobService';
import Loading from './Loading';
import { JobProps } from 'types';
import ImgCard from './ImgCard';
import Router from 'next/router';
const { GetAllJobs } = JobService();
interface JobListProps {
  lat: number;
  lng: number;
  radius: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const JobList = ({
  lat,
  lng,
  radius = 300000,
  page = 0,
  setPage,
}: JobListProps) => {
  const elemRef = React.useRef<HTMLDivElement | null>(null);

  const { data: jobListing, isLoading } = GetAllJobs({
    page,
    total: 50,
    lat,
    lng,
    radius,
  });
  //const [data, setData] = useState<JobProps[]>([]);

  const handleNavigation = useCallback(
    (e: Event) => {
      const element = e.target as HTMLInputElement;
      const windowHeight =
        element && element.scrollHeight - element.clientHeight;

      if (element.scrollTop <= 0) {
        consoleHelper('you at the top', page);
        setPage((val) => (val > 0 ? val - 1 : 0));
      }
      // console.log(element.scrollTop, windowHeight - 10);
      if (element.scrollTop >= windowHeight - 10) {
        //setPage((val) => val + 1);
        consoleHelper('you at the bottom', page);
      }
    },
    [page, setPage]
  );

  useEffect(() => {
    const node = elemRef?.current;
    if (node) {
      node.addEventListener('scroll', (event) => handleNavigation(event));
    }

    return () => {
      if (node) {
        node.removeEventListener('scroll', (event) => handleNavigation(event));
      }
    };
  }, [handleNavigation]);

  const handleOnClick = useCallback((id: string | number | undefined) => {
    if (id) {
      Router.push(`/job/${id}`);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container ref={elemRef}>
      {jobListing && jobListing?.data?.length <= 0 ? (
        <NoListing>No job listing found!</NoListing>
      ) : (
        <ListDetails>
          {jobListing &&
            jobListing?.data.map((item: JobProps) => (
              <ImgCard
                key={item.id}
                title={item.title.toUpperCase()}
                imgUrl={item.imgUrl}
                description={
                  <Content>
                    <ItemDetails>
                      <Title>Salary:</Title> {item.salary} pesos/day
                    </ItemDetails>
                    <ItemDetails>
                      <Title>Type:</Title> {item.employmentType}
                    </ItemDetails>
                  </Content>
                }
                onClick={() => handleOnClick(item?.id)}
              />
            ))}
        </ListDetails>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
`;
const Content = styled.div`
  max-height: 100px;
  justify-content: center;
  padding: 2%;
  overflow-x: hidden;
  text-align: left;
`;

const Title = styled.div`
  font-weight: bold;
  text-align: left;
  display: inline;
  font-size: 18px;
  width: 10%;
  margin-right: 10px;
`;

const NoListing = styled.div`
  font-weight: bold;
  margin-top: 20%;
  color: ${(props) => props.theme.colors.danger} !important;
`;
const ItemDetails = styled.div``;
const ListDetails = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  gap: 10px;
`;

export default JobList;
