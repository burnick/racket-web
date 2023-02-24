import React from 'react';
import styled from 'styled-components';
import AuthRoute from 'src/pages/authRoute';

const Profile: React.FC = () => {
  return (
    <AuthRoute>
      <Container />
    </AuthRoute>
  );
};

const Container = styled.div``;

export default Profile;
