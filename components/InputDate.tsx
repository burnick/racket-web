import React from 'react';
import styled from 'styled-components';
import isUndefined from 'lodash/isUndefined';
import { FormikErrors } from 'formik';
import moment from 'moment';

interface InputTextProps {
  placeholder: string;
  name?: string;
  errorMessage?: FormikErrors<Date> | undefined;
  onChange: (e: React.ChangeEvent<unknown>) => void;
  value: Date;
}

const InputDate: React.FC<InputTextProps> = ({
  placeholder = 'Placeholder',
  errorMessage,
  name,
  value,
  onChange,
}) => {
  const dateErrorString = errorMessage
    ? moment(Date.parse(errorMessage as string)).format('MMMM DD, YYYY')
    : null;
  return (
    <Container>
      <Title htmlFor={placeholder}>{placeholder}</Title>
      <Input
        id={placeholder}
        name={name}
        placeholder={placeholder}
        type={'date'}
        error={!isUndefined(errorMessage)}
        value={moment(value).format('YYYY-MM-DD')}
        onChange={onChange}
      />
      <Error role="alert" arial-aria-live="assertive">
        <span>
          {dateErrorString ? `Date must be before ${dateErrorString}` : ''}
        </span>
      </Error>
    </Container>
  );
};

const Container = styled.div`
  grid-template-columns: minmax(0, 1fr);
  display: grid;
  grid-row-end: span 1;
  grid-column-end: span 12;
  text-align: left;
`;
const Title = styled.label`
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 10px;
`;
const Error = styled.span`
  font-size: small;
  display: inline-block;
  top: calc(100% - 0.7rem);
  left: 0px;
  color: ${({ theme }) => theme.colors.danger};
  position: relative;
  span {
    padding: 2px;
  }
`;
const Input = styled.input.attrs(
  (props: { error: boolean; ref?: React.ForwardedRef<unknown> }) => props
)`
  height: 40px;
  margin-bottom: 0px;
  border: 1px solid
    ${(props) =>
      props.error ? props.theme.colors.danger : props.theme.colors.primary};
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 10px;
  @media (pointer: none), (pointer: coarse) {
    font-size: 12px;
  }
`;

export default InputDate;
