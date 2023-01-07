import dynamic from 'next/dynamic';
import isUndefined from 'lodash/isUndefined';
import React from 'react';
import styled from 'styled-components';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
interface InputTextProps {
  placeholder?: string;
  errorMessage?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RichText: React.FC<InputTextProps> = ({
  placeholder,
  errorMessage,
  onChange,
  value,
}) => {
  return (
    <Container error={!isUndefined(errorMessage)}>
      <Title htmlFor={placeholder}>
        {placeholder ? placeholder : 'Placeholder'}
      </Title>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        id={placeholder}
        placeholder={placeholder}
        //error={!isUndefined(errorMessage)}
      />
      <Error role="alert" arial-aria-live="assertive">
        <span>{errorMessage}</span>
      </Error>
    </Container>
  );
};

const Container = styled.div<{ error?: boolean }>`
  grid-template-columns: minmax(0, 1fr);
  display: grid;
  grid-row-end: span 1;
  grid-column-end: span 12;
  text-align: left;
  min-height: 185px;
  margin: 5px 0;
`;
const Title = styled.label`
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 10px;
`;
const Error = styled.span`
  margin-top: 20px;
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
export default RichText;
