import React, {
  useEffect,
  useCallback,
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
import { List } from 'antd';

interface JobListProps {
  jobListing: JobProps[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const JobList = ({ jobListing, page = 0, setPage }: JobListProps) => {
  const elemRef = React.useRef<HTMLDivElement | null>(null);

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
        <List
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered
          itemLayout="vertical"
          dataSource={jobListing}
          renderItem={(item) => (
            <List.Item>
              <PanelCard width={100} key={`panel-${item.id}`}>
                <Content>
                  <p>
                    <Title>Title:</Title>
                    {item.title}
                  </p>
                  <p>
                    <Title>Salary:</Title> {item.salary} per day
                  </p>
                  <p>
                    <Title>Type:</Title> {item.employmentType}
                  </p>
                  <p>
                    <Title>Address:</Title> {item.address}
                  </p>
                  {item.phone && (
                    <p>
                      <Title>Phone:</Title>{' '}
                      <HideShowContact phone={item.phone} />
                    </p>
                  )}
                  <p>
                    <Title>Expiration date:</Title>{' '}
                    {moment(item.expirationDate).format('YYYY-MM-DD')}
                  </p>
                  {item.email && (
                    <p>
                      <Title>Email:</Title>{' '}
                      <HideShowContact email={item.email} />
                    </p>
                  )}
                  <p>
                    <Title>Description:</Title>
                  </p>
                  <p dangerouslySetInnerHTML={{ __html: item.description }} />
                </Content>
              </PanelCard>
            </List.Item>
          )}
        />
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

export default JobList;
