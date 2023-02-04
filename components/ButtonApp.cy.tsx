import React from 'react';
import Button from './Button';

describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button onClick={() => alert('test')}>My Button</Button>);
  });
});
