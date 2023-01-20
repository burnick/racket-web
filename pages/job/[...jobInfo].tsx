import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PanelCard from 'components/PanelCard';
import { JobService } from 'hooks/useJobService';
import Loading from 'components/Loading';
import moment from 'moment';
//import isEqual from 'lodash/isEqual';
import HideShowContact from 'components/HideShowContact';
import { Col, Row } from 'antd';

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
      <PanelCard width={80}>
        {isError ? (
          'Unknown Job'
        ) : (
          <Content>
            <Row>
              <StyledCol span={12}>
                <Title>Title:</Title>
              </StyledCol>
              <StyledCol span={12}>{item.title}</StyledCol>
            </Row>
            <Row>
              <StyledCol span={12}>
                <Title>Employment Type:</Title>
              </StyledCol>
              <StyledCol span={12}>{item.employmentType}</StyledCol>
            </Row>
            <Row>
              <StyledCol span={12}>
                <Title>Salary:</Title>
              </StyledCol>
              <StyledCol span={12}>{item.salary} Pesos per day</StyledCol>
            </Row>
            <Row>
              <StyledCol span={12}>
                <Title>Address:</Title>
              </StyledCol>
              <StyledCol span={12}>{item.address}</StyledCol>
            </Row>
            {item.phone && (
              <Row>
                <StyledCol span={12}>
                  <Title>Phone:</Title>
                </StyledCol>
                <StyledCol span={12}>
                  <HideShowContact phone={item.phone} />
                </StyledCol>
              </Row>
            )}
            {item.email && (
              <Row>
                <StyledCol span={12}>
                  <Title>Email:</Title>
                </StyledCol>
                <StyledCol span={12}>
                  <HideShowContact email={item.email} />
                </StyledCol>
              </Row>
            )}
            <Row>
              <StyledCol span={12}>
                <Title>Expiration date:</Title>
              </StyledCol>
              <StyledCol span={12}>
                {moment(item.expirationDate).format('YYYY-MM-DD')}
              </StyledCol>
            </Row>
            <Row>
              <StyledCol span={12}>
                <Title>Description:</Title>
              </StyledCol>
              <StyledCol span={12}>
                <p dangerouslySetInnerHTML={{ __html: item.description }} />
              </StyledCol>
            </Row>
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

const Content = styled.div`
  width: 100%;
  align-items: left;
`;

const Title = styled.div`
  font-weight: bold;
  text-align: left;
  display: inline;
  font-size: 18px;
  width: 10%;
  margin-right: 10px;
`;

const StyledCol = styled(Col)`
  text-align: left;
`;
export default Job;
