import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  padding: 10px;
`;

const InputStyled = styled.input`
  height: 7px;
  background: grey;
  border-radius: 5px;
  background-image: linear-gradient(#d46a6a, #d46a6a);
  background-repeat: no-repeat;

  :-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #d46a6a;
    cursor: pointer;
    box-shadow: 0 0 2px 0 #555;
  }

  :-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  :-webkit-slider-thumb:hover {
    box-shadow: #d46a6a50 0px 0px 0px 8px;
  }

  :-webkit-slider-thumb:active {
    box-shadow: #d46a6a50 0px 0px 0px 11px;
    transition: box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 350ms cubic- bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

const LabelStyled = styled.label``;

const InputSlider = ({
  value,
  inputRef,
  disabled = false,
}: {
  value: number;
  inputRef?:
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
  disabled?: boolean;
}) => {
  const [inputValue, setInputValue] = useState<number>(value);
  const MAX = 30000;
  const getBackgroundSize = useCallback(() => {
    return {
      backgroundSize: `${(value * 100) / MAX}% 100%`,
    };
  }, [value]);

  const handleOnChange = useCallback((e: { target: { value: string } }) => {
    setInputValue(parseInt(e.target.value));
  }, []);

  return (
    <Container id={`inputSlider-${0}`}>
      <LabelStyled htmlFor="slider">Radius:</LabelStyled>
      <InputStyled
        type="range"
        min="1000"
        max={MAX}
        onChange={handleOnChange}
        style={getBackgroundSize()}
        value={inputValue}
        ref={inputRef}
        disabled={disabled}
      />
    </Container>
  );
};

export default InputSlider;
