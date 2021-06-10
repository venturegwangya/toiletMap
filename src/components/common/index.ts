/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import BodyLayout from './BodyLayout';
import { Avatar } from './Avatar';
import StyledIcon from './StyledIcon';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const TitleSpan = styled.span`
  font-size: 1.2em;
`;

const SubtitleSpan = styled.span`
  font-size: 1em;
  color: grey;
`;

export {
  FlexColumnDiv,
  FlexRowDiv,
  TitleSpan,
  SubtitleSpan,
  BodyLayout,
  Header,
  Avatar,
  StyledIcon,
};
