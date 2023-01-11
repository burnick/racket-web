import React from 'react';
import MainPage from 'components/MainPage';
import styled from 'styled-components';
import { CategoriesService } from 'hooks/useCategoriesService';
import { CoordinateService } from 'hooks/useCoordinateService';
import { store } from 'store';
import { Spin } from 'antd';
import PostJobComponent from './postjob.content';

const PostJob = () => {
  const state = store.getState();
  const { FindAllCategories } = CategoriesService();
  const { GetCoordinates } = CoordinateService();

  const { data: coordinatesData, isLoading: isCoordinatesLoading } =
    GetCoordinates(state.user?.uid);
  const { data: categoriesData, isLoading } = FindAllCategories();

  const contentIsLoading = isCoordinatesLoading || isLoading;
  return (
    <MainPage>
      <Container>
        {contentIsLoading && <Spin tip={'Loading'} size="small" />}
        {!contentIsLoading && (
          <PostJobComponent
            uid={state.user?.uid}
            categoriesData={categoriesData}
            coordinatesData={coordinatesData}
            isLoading={isLoading}
          />
        )}
      </Container>
    </MainPage>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default PostJob;
