import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import { AddIcon } from '../../icons';

const Text = styled.span`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  text-transform: uppercase;
  white-space: nowrap;

  svg {
    transform: translateX(-4px);
    transition: 0.4s ease;
  }
`;

const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  margin: 8px;
  padding: 12px 14px;
  padding-left: 18px;
  transition: 0.3s ease;
  user-select: none;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: ${({ theme }) => theme.colors.digital.blue.translucent};
    transition: 0.4s ease;
    z-index: 0;
  }

  &:focus-within,
  &:hover {
    &::before {
      width: 100%;
      background-color: ${({ theme }) => theme.colors.digital.blue.normal};
      opacity: 0.7;
    }

    ${Text} {
      svg {
        transform: translateX(0);
      }
    }
  }

  &:active {
    transform: scale(0.96);
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`;

type Props = {
  onLoad: (data: any) => void;
};

export const UploadSpec = ({ onLoad }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const blob = event.target.files;
    if (blob && blob[0]) {
      const reader = new FileReader();
      reader.onload = handleReaderLoad;
      reader.readAsText(blob[0]);
    }
  };
  const handleReaderLoad = (event: ProgressEvent<FileReader>) => {
    if (event.target && typeof event.target.result === 'string') {
      const json = JSON.parse(event.target.result);
      onLoad(json);
    }
  };

  return (
    <Wrapper htmlFor="upload-spec">
      <Text>
        Upload specification
        <AddIcon size={14} />
      </Text>
      <HiddenInput
        id="upload-spec"
        type="file"
        accept="application/json"
        onChange={handleChange}
      />
    </Wrapper>
  );
};
