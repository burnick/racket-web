import styled from 'styled-components';
import AuthRoute from 'pages/authRoute';

const Profile: React.FC = () => {
  return (
    <AuthRoute>
      <Container />
    </AuthRoute>
  );
};

const Container = styled.div``;

export default Profile;
