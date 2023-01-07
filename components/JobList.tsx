import React, {
  useEffect,
  useCallback,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import styled from 'styled-components';
import PanelCard from 'components/PanelCard';
import { JobProps } from 'types';
import moment from 'moment';
import consoleHelper from 'utils/consoleHelper';
import isEqual from 'lodash/isEqual';
import HideShowContact from 'components/HideShowContact';

interface JobListProps {
  jobListing: JobProps[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const JobList = ({ jobListing, page = 0, setPage }: JobListProps) => {
  const elemRef = useRef<HTMLDivElement | null>(null);

  const [data, setData] = useState<JobProps[]>(jobListing);

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
    const node = elemRef.current;
    if (node) {
      node.addEventListener('scroll', (event) => handleNavigation(event));
    }

    return () => {
      if (node) {
        node.removeEventListener('scroll', (event) => handleNavigation(event));
      }
    };
  }, [handleNavigation]);

  useEffect(() => {
    if (jobListing?.length > 0 && !isEqual(data, jobListing)) {
      setData([...data, ...jobListing]);
    }
  }, [jobListing, data]);

  return (
    <Container ref={elemRef}>
      {jobListing?.length <= 0 ? (
        <NoListing>No job listing found!</NoListing>
      ) : (
        jobListing?.map((jobDetails: JobProps, index: number) => {
          return (
            <PanelCard title={'Job list'} key={`panel-${index}`}>
              <Content>
                Job Title:<Title> {jobDetails.title}</Title>
                Salary:<Title> {jobDetails.salary}</Title>
                Type:<Title> {jobDetails.employmentType}</Title>
                Address:<Title> {jobDetails.address}</Title>
                {jobDetails.phone && (
                  <>
                    Phone:
                    <HideShowContact phone={jobDetails.phone} />
                  </>
                )}
                Expiration date:
                <Title>
                  {moment(jobDetails.expirationDate).format('YYYY-MM-DD')}
                </Title>
                Email: <HideShowContact email={jobDetails.email} />
                Description:
                <div
                  dangerouslySetInnerHTML={{ __html: jobDetails.description }}
                />
              </Content>
            </PanelCard>
          );
        })
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
  display: flex;
  flex-direction: column;
  min-height: 100px;
  width: 100%;
  justify-content: flex-start;
  padding: 2%;
  overflow-x: hidden;
  text-align: left;
`;

const Title = styled.div`
  margin-left: 15%;
  font-weight: bold;
  text-align: left;
`;

const NoListing = styled.div`
  font-weight: bold;
  margin-top: 20%;
  color: ${(props) => props.theme.colors.danger} !important;
`;

export default JobList;
