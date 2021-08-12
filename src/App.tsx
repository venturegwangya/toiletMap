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
import { mapHooks } from './modules/map';
import ToiletList from './components/toilet/ToiletList';
import { showModal } from './modules/window/actions';
import { useAppDispatch } from './modules/configureStore';
import PopupPill from '@components/common/PopupPill';
import LeftMenuContainer from '@components/menu/LeftMenuContainer';
import LeftMenuItemView from '@components/menu/LeftMenu';
import {
  faList,
  faPoop,
  faRedo,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { ReviewPanel } from '@components/review/ReviewPanel';
import { toiletActions, toiletHooks } from '@modules/toilet';
import { windowHooks } from '@modules/window';
import { authHooks } from '@modules/auth';

export type LeftMenu = 'LIST' | 'USER_SETTING' | 'WRITE_REVIEW';
const LEFT_PANEL_MENU_WIDTH = '300px';

function App(): EmotionJSX.Element {
  const [selectedMenu, setMenu] = useState<LeftMenu | null>('LIST');
  const leftContainerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const user = authHooks.useUser();

  const toilets = toiletHooks.useToilets();
  const position = mapHooks.useMapPosition();
  const needRequestAgain = toiletHooks.useNeedRequestAgain();
  const selectedToilet = toiletHooks.useSelectedToilet();
  const refreshPillButtonPosition =
    windowHooks.useLeftPosition(leftContainerRef);

  const fetchNearByToilets = useCallback(() => {
    const { lat, lng } = position;
    dispatch(
      toiletActions.requestToiletsInArea(
        new firebase.firestore.GeoPoint(lat, lng),
        100,
      ),
    );
    dispatch(toiletActions.selectToilet(null));
  }, [dispatch, position]);

  useEffect(() => {
    // componentMount/Update
    fetchNearByToilets();
    // 한번만 실행해야함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenuClick = useCallback(
    (menu: LeftMenu) => {
      setMenu(menu === selectedMenu ? null : menu);
    },
    [selectedMenu],
  );

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
            <LeftMenuContainer>
              <LeftMenuItemView
                onClick={handleMenuClick}
                id={'USER_SETTING'}
                selected={'USER_SETTING' === selectedMenu}
                iconProps={{
                  icon: faUser,
                }}
              />
              <LeftMenuItemView
                onClick={handleMenuClick}
                id={'LIST'}
                selected={'LIST' === selectedMenu}
                iconProps={{
                  icon: faList,
                }}
              />
              <LeftMenuItemView
                onClick={handleMenuClick}
                id={'WRITE_REVIEW'}
                selected={'WRITE_REVIEW' === selectedMenu}
                iconProps={{
                  icon: faPoop,
                }}
              />
            </LeftMenuContainer>
            {/* 화장실 리스트 */}
            {selectedMenu === 'LIST' && (
              <>
                <ToiletList toilets={toilets} />
                {selectedToilet && (
                  <ReviewPanel toilet={selectedToilet} user={user} />
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
            {needRequestAgain && (
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
