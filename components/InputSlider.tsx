import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Row, Slider, InputNumber } from 'antd';
import customStyle from 'default.theme.json';

// const InputStyled = styled.input`
//   height: 7px;
//   background: grey;
//   border-radius: 5px;
//   background-image: linear-gradient(#d46a6a, #d46a6a);
//   background-repeat: no-repeat;

//   :-webkit-slider-thumb {
//     -webkit-appearance: none;
//     height: 20px;
//     width: 20px;
//     border-radius: 50%;
//     background: #d46a6a;
//     cursor: pointer;
//     box-shadow: 0 0 2px 0 #555;
//   }

//   :-webkit-slider-runnable-track {
//     -webkit-appearance: none;
//     box-shadow: none;
//     border: none;
//     background: transparent;
//   }

//   :-webkit-slider-thumb:hover {
//     box-shadow: #d46a6a50 0px 0px 0px 8px;
//   }

//   :-webkit-slider-thumb:active {
//     box-shadow: #d46a6a50 0px 0px 0px 11px;
//     transition: box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
//       left 350ms cubic- bezier(0.4, 0, 0.2, 1) 0ms,
//       bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//   }
// `;

const InputSlider = ({
  value,
  onChange,
  disabled = false,
}: {
  value: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}) => {
  const MAX = 30000;
  const [sliderValue, setSliderValue] = useState(value);

  const handleOnChange = (value: number | null) => {
    if (value) onChange(value);
  };

  return (
    <Container>
      <Row>
        <Col span={2} />
        <Col span={2}>Radius:</Col>
        <Col span={16}>
          <Slider
            min={1}
            max={MAX}
            onChange={setSliderValue}
            onAfterChange={handleOnChange}
            value={sliderValue}
            step={1}
            disabled={disabled}
            trackStyle={{ background: `${customStyle.colors.primary}` }}
            handleStyle={{
              boxShadow: `0 0 0 2px ${customStyle.colors.primary}`,
              borderRadius: '50%',
              zIndex: 99999,
            }}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={MAX}
            style={{ margin: '0 16px' }}
            value={sliderValue}
            onChange={handleOnChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  width: 100%;
`;

export default InputSlider;
