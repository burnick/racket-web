import React from 'react';
import styled from 'styled-components';
import isUndefined from 'lodash/isUndefined';

interface SelectInputProps {
  placeholder?: string;
  errorMessage?: string;
  name: string;
  value: string;
  options: Record<string, string | number>[];
  onChange: (e: React.ChangeEvent<unknown>) => void;
  isLoading?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  placeholder,
  errorMessage,
  options,
  isLoading = false,
  ...props
}) => {
  // const [isActive, setIsActive] = useState(false);
  if (isLoading) {
    return <InputSelect placeholder="Loading...." />;
  }

  return (
    <Container>
      <Title htmlFor={placeholder}>
        {placeholder ? placeholder : 'Placeholder'}
      </Title>
      <InputSelect
        {...props}
        id={placeholder}
        placeholder={placeholder}
        error={!isUndefined(errorMessage)}
      >
        <OptionsContainer value={''}>{placeholder}</OptionsContainer>
        {options.map((option) => {
          const objKeys = Object.keys(option);

          return (
            <OptionsContainer
              key={`${placeholder}-${option[objKeys[0]]}`}
              value={option[objKeys[0]]}
            >
              {option[objKeys[1]] ? option[objKeys[1]] : option[objKeys[0]]}
            </OptionsContainer>
          );
        })}

        {/* {options.map((option) => {
            const objKeys = Object.keys(option);
            <OptionsContainer key={`${placeholder}-${option[objKeys[0]]}`} value={option[objKeys[0]]}>
              {option[objKeys[1]]}
            </OptionsContainer>;
          })} */}
      </InputSelect>
      <Error role="alert" arial-aria-live="assertive">
        <span>{errorMessage}</span>
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
const InputSelect = styled.select<{ error?: boolean }>`
  height: 39px;
  margin: 10px 0;
  border: 2px solid
    ${({ theme, error }) =>
      error ? theme.colors.danger : theme.colors.lightgray};

  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 2px;
  border-radius: 10px;
  @media (pointer: none), (pointer: coarse) {
    font-size: 12px;
  }
`;
const OptionsContainer = styled.option``;

export default SelectInput;
