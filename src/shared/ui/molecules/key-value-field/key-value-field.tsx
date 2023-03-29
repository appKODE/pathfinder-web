import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../../hooks';
import { Button } from '../../atoms';
import { Box } from '../../core';

type Props = {
  title: string;
  placeholder?: string;
  initialValue: string;
  onApply: (value: string) => void;
};

const Wrapper = styled.div`
  position: relative;
`;
const DropArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 8px;
  box-shadow: 3px 3px 5px rgb(0 0 0 / 21%);
  background-color: rgb(255 255 255 / 40%);
  border-radius: 4px;
  backdrop-filter: blur(3px);
`;

const TextArea = styled.textarea`
  min-width: 400px;
  min-height: 300px;
  padding: 8px;
`;

const Badge = styled.div`
  height: 8px;
  width: 8px;
  background: ${({ theme }) => theme.colors.digital.red.normal};
  position: absolute;
  top: -3px;
  left: -3px;
  border-radius: 50%;
`;

export const KeyValueField = ({
  initialValue,
  title,
  placeholder,
  onApply,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleCloseMenu = () => setIsOpen(false);

  useClickOutside({
    ref: wrapperRef,
    handler: handleCloseMenu,
    flag: isOpen,
  });

  const onApplyHandler = () => {
    onApply(value);
    setIsOpen(false);
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Button onClick={() => setIsOpen(true)}>{title}</Button>
      {value && <Badge />}

      {isOpen && (
        <DropArea>
          <TextArea
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder={placeholder}
            value={value}
          />
          <Box h={8} />
          <Button onClick={onApplyHandler}>Apply</Button>
        </DropArea>
      )}
    </Wrapper>
  );
};
