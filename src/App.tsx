/** @jsxImportSource @emotion/react */
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import './App.css';
import { ModalPortal } from './components/common/modal/ModalPortal';
import Map from './components/map/Map';
import tw from 'twin.macro';
import MenuOverlay from '@components/map/MenuOverlay';

const AppContainer = tw.div`flex w-full h-full`;

function App(): EmotionJSX.Element {
  return (
    <AppContainer>
      <MenuOverlay />
      <Map />
      <ModalPortal />
    </AppContainer>
  );
}

export default App;
