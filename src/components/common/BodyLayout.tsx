/** @jsxImportSource @emotion/react */
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';

interface BodyLayoutProps {
  showLeft: boolean;
  LeftOverlayComponent: React.ReactNode;
  BodyComponent: React.ReactNode;
  id?: string;
}

const FixedHeightBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 60px);
`;

const FlexBodyContainer = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
`;

const LeftPanel = styled.div<{ show: boolean }>(props => ({
  display: 'flex',
  height: '100%',
  position: 'fixed',
  zIndex: 500,
  transform: props.show ? 'none' : 'translateX(-100%)',
  transition: 'transform 0.5s',
}));

function BodyLayout({
  showLeft,
  LeftOverlayComponent,
  BodyComponent,
  id,
}: BodyLayoutProps): EmotionJSX.Element {
  return (
    <FixedHeightBodyContainer id={id}>
      <LeftPanel show={showLeft}>{LeftOverlayComponent}</LeftPanel>
      <FlexBodyContainer>{BodyComponent}</FlexBodyContainer>
    </FixedHeightBodyContainer>
  );
}

export default BodyLayout;
