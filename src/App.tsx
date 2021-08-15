/** @jsxImportSource @emotion/react */
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import './App.css';
import { ModalPortal } from './components/common/modal/ModalPortal';
import Map from './components/map/Map';
import SideMenuBar from '@components/window/SideMenuBar';
import tw from 'twin.macro';
import { SideMenu } from '@components/window/SideMenu';

const AppContainer = tw.div`flex w-full h-full`;

function App(): EmotionJSX.Element {
  return (
    <AppContainer>
      <SideMenuBar />
      <SideMenu />
      <Map />
      <ModalPortal />
    </AppContainer>
  );
}

export default App;
