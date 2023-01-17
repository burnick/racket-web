import React from 'react';
import styled from 'styled-components';
import isUndefined from 'lodash/isUndefined';
import { Input } from 'antd';
// import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';

interface InputTextProps {
  placeholder?: string;
  name?: string;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<unknown>) => void;
  value: string | number;
}

const InputText: React.FC<InputTextProps> = ({
  placeholder,
  errorMessage,
  name,
  ...props
}) => {
  // const [isActive, setIsActive] = useState(false);

  return (
    <Container>
      <Title htmlFor={placeholder}>
        {placeholder ? placeholder : 'Placeholder'}
      </Title>
      <StyledInput
        {...props}
        id={placeholder}
        name={name}
        placeholder={!isUndefined(errorMessage) ? errorMessage : placeholder}
        type={'text'}
        status={!isUndefined(errorMessage) ? 'error' : ''}
        //prefix={!isUndefined(errorMessage) ? <ClockCircleOutlined /> : null}
      />
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
  margin-bottom: 7px;
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
const StyledInput = styled(Input)`
  height: 40px;
  margin-bottom: 0px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 10px;
  @media (pointer: none), (pointer: coarse) {
    font-size: 12px;
  }
`;

export default InputText;
