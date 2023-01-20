import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PanelCard from 'components/PanelCard';
import { JobService } from 'hooks/useJobService';
import Loading from 'components/Loading';
import moment from 'moment';
//import isEqual from 'lodash/isEqual';
import HideShowContact from 'components/HideShowContact';
const { FindJob } = JobService();
const Job = () => {
  const router = useRouter();
  const [id] = (router.query.jobInfo as string[]) || [];

  const { data: jobData, isLoading, isError } = FindJob({ id: id });
  const item = useMemo(() => jobData && jobData?.data, [jobData]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <PanelCard>
        {isError ? (
          'Unknown Job'
        ) : (
          <Content>
            <ItemDetails>
              <Title>Title:</Title>
              {item.title}
            </ItemDetails>
            <ItemDetails>
              <Title>Salary:</Title> {item.salary} per day
            </ItemDetails>
            <ItemDetails>
              <Title>Type:</Title> {item.employmentType}
            </ItemDetails>
            <ItemDetails>
              <Title>Address:</Title> {item.address}
            </ItemDetails>
            {item.phone && (
              <ItemDetails>
                <Title>Phone:</Title>
                <HideShowContact phone={item.phone} />
              </ItemDetails>
            )}
            <ItemDetails>
              <Title>Expiration date:</Title>
              {moment(item.expirationDate).format('YYYY-MM-DD')}
            </ItemDetails>
            {item.email && (
              <ItemDetails>
                <Title>Email:</Title>
                <HideShowContact email={item.email} />
              </ItemDetails>
            )}
            <ItemDetails>
              <Title>Description:</Title>
            </ItemDetails>
            <p dangerouslySetInnerHTML={{ __html: item.description }} />
          </Content>
        )}
      </PanelCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ItemDetails = styled.div``;

const Content = styled.div`
  flex: 1;
  flex-direction: column;
  justify-content: start;
`;

const Title = styled.div`
  font-weight: bold;
  text-align: left;
  display: inline;
  font-size: 18px;
  width: 10%;
  margin-right: 10px;
`;
export default Job;
