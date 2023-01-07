import React from 'react';
import styled from 'styled-components';

interface InputTextProps {
  placeholder?: string;
  errorMessage?: string;
}

const InputTextArea: React.FC<InputTextProps> = ({
  placeholder,
  errorMessage,
  ...props
}) => {
  // const [isActive, setIsActive] = useState(false);

  return (
    <>
      <label htmlFor={placeholder}>
        {placeholder ? placeholder : 'Placeholder'}
      </label>
      <Input
        {...props}
        id={placeholder}
        placeholder={placeholder}

        // disabled={isActive}
        // onChange={(e) => handleTextChange(e.target.value)}
      />

      <Error>{errorMessage}</Error>
    </>
  );
};

const Input = styled.textarea.attrs(
  (props: { ref?: React.ForwardedRef<unknown> }) => props
)`
  min-height: 50px;
  margin: 10px 0; // add top and bottom margin
  border: 2px solid #eee;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 10px;
  @media (pointer: none), (pointer: coarse) {
    font-size: 12px;
  }
`;
const Error = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  height: 30px;
  @media (pointer: none), (pointer: coarse) {
    font-size: 12px;
  }
`;
export default InputTextArea;
