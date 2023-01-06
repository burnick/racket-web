import React, { useState, Suspense, useCallback } from 'react';
import styled from 'styled-components';
import Button from './Button';

const HideShowContact = ({
  email,
  phone,
}: {
  email?: string;
  phone?: string;
}) => {
  const [showingContact, setShowingContact] = useState(false);

  const handleOnClick = useCallback(() => {
    setShowingContact((val) => !val);
  }, []);

  const suspenseEmail = showingContact ? (
    <ContactLink href={email ? `mailto:${email}` : `tel:${phone}`}>
      {email ?? phone}
    </ContactLink>
  ) : (
    <Button onClick={handleOnClick}>Click for contact info</Button>
  );
  return (
    <Suspense fallback={<Loading>loading...</Loading>}>
      <Container>{suspenseEmail}</Container>
    </Suspense>
  );
};

const Container = styled.div`
  margin-left: 15%;
`;

const ContactLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
`;

const Loading = styled.div``;

export default HideShowContact;
