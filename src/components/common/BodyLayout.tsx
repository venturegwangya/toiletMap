/** @jsxImportSource @emotion/react */
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';

interface BodyLayoutProps {
  LeftChild: React.ReactNode;
  RightChild: React.ReactNode;
}

const FixedHeightBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 60px);
`;

const FlexBodyContainer = styled.div<{
  flex?: number;
  scroll?: boolean;
}>(props => ({
  display: 'flex',
  flex: props.flex,
  height: '100%',
  overflowY: props.scroll ? 'scroll' : 'initial',
}));

function BodyLayout({
  LeftChild,
  RightChild,
}: BodyLayoutProps): EmotionJSX.Element {
  return (
    <FixedHeightBodyContainer>
      <FlexBodyContainer scroll>{LeftChild}</FlexBodyContainer>
      <FlexBodyContainer flex={3}>{RightChild}</FlexBodyContainer>
    </FixedHeightBodyContainer>
  );
}

export default BodyLayout;
