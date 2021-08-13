/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import firebase from 'firebase';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { BodyLayout, FlexRowDiv, Header } from './components/common';
import { Avatar } from './components/common/Avatar';
import { LogInModal } from './components/common/modal/LogInModal';
import { ModalPortal } from './components/common/modal/ModalPortal';
import Map from './components/map/Map';
import ToiletList from './components/toilet/ToiletList';
import { showModal } from './modules/window/actions';
import { useAppDispatch } from './modules/configureStore';
import PopupPill from '@components/common/PopupPill';
import SideMenu from '@components/window/SideMenu';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { ReviewPanel } from '@components/review/ReviewPanel';
import { toiletHooks } from '@modules/toilet';
import { windowHooks, windowTypes } from '@modules/window';
import { subscribeToAuthChange } from '@modules/auth/api';

const LEFT_PANEL_MENU_WIDTH = '300px';

function App(): EmotionJSX.Element {
  const [user, setUser] = useState<firebase.User | null>(null);
  const selectedMenu = windowHooks.useSelectedLeftMenu();
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { toilets, selectedToilet, requestAgain } = toiletHooks.useToilet();
  const fetchNearByToilets = toiletHooks.useFetchNearByToilets();
  const refreshPillButtonPosition =
    windowHooks.useLeftPosition(leftContainerRef);

  useEffect(() => {
    // componentMount/Update
    const unsub = subscribeToAuthChange(
      user => {
        // setUser(user);
      },
      () => {
        // setUser(null);
      },
    );
    fetchNearByToilets();
    return () => {
      unsub();
    };
    // 한번만 실행해야함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
      `}
    >
      <Header>
        <img src="https://tva1.sinaimg.cn/large/008i3skNgy1gr8n1r9v8vj304601et8m.jpg" />
        <Avatar
          size={48}
          imgSrc="https://pbs.twimg.com/media/E1Pe-mSUYAE3NXV?format=jpg&name=large"
          onClick={() => dispatch(showModal(React.createElement(LogInModal)))}
        />
      </Header>
      <BodyLayout
        showLeft
        LeftOverlayComponent={
          <FlexRowDiv id="leftContainer" ref={leftContainerRef}>
            <SideMenu />
            {/* 화장실 리스트 */}
            {selectedMenu === 'LIST' && (
              <>
                <ToiletList toilets={toilets} />
                {selectedToilet && (
                  <ReviewPanel toilet={selectedToilet} user={null} />
                )}
              </>
            )}
            {/* 리뷰 리스트 */}
            {selectedMenu === 'USER_SETTING' && (
              <div
                style={{
                  width: LEFT_PANEL_MENU_WIDTH,
                  backgroundColor: 'yellow',
                }}
              >
                <text>CANVA처럼 트랜지션 넣을 거임 </text>
              </div>
            )}
          </FlexRowDiv>
        }
        BodyComponent={
          <>
            {requestAgain && (
              <PopupPill
                text="이 위치에서 다시 검색"
                icon={faRedo}
                left={refreshPillButtonPosition}
                onClick={fetchNearByToilets}
              />
            )}
            <Map toilets={toilets} />
          </>
        }
      />
      <ModalPortal />
    </div>
  );
}

export default App;
