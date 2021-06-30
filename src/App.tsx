/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import firebase from 'firebase';
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { BodyLayout, FlexRowDiv, Header } from './components/common';
import { Avatar } from './components/common/Avatar';
import { LogInModal } from './components/common/modal/LogInModal';
import { ModalPortal } from './components/common/modal/ModalPortal';
import Map from './components/map/Map';
import { mapHooks } from './modules/map';
import ToiletList from './components/toilet/ToiletList';
import { requestToiletsInArea } from './modules/map/actions';
import { showModal } from './modules/modal/actions';
import { useAppDispatch } from './modules/configureStore';
import { authAPI } from '@apis/auth';
import PopupPill from '@components/common/PopupPill';
import LeftMenuContainer from '@components/menu/LeftMenuContainer';
import LeftMenuItemView from '@components/menu/LeftMenu';
import { faList, faPoop, faUser } from '@fortawesome/free-solid-svg-icons';

export type LeftMenu = 'LIST' | 'USER_SETTING' | 'WRITE_REVIEW';

function App(): EmotionJSX.Element {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [selectedMenu, setMenu] = useState<LeftMenu | null>('LIST');
  const dispatch = useAppDispatch();

  const toilets = mapHooks.useToilets();
  const position = mapHooks.useMapPosition();
  const needRequestAgain = mapHooks.useNeedRequestAgain();

  useEffect(() => {
    // user바뀔 때
    const unsubscribe = authAPI.subscribeToAuthChange(
      authUser => {
        setUser(authUser);
      },
      () => setUser(null),
    );
    return () => {
      unsubscribe(); // detach backend listener
    };
  }, []);

  const fetchNearByToilets = useCallback(() => {
    const { lat, lng } = position;
    dispatch(
      requestToiletsInArea(new firebase.firestore.GeoPoint(lat, lng), 100),
    );
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
        showLeft={toilets.length > 0}
        LeftOverlayComponent={
          <FlexRowDiv>
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
            {selectedMenu === 'LIST' && (
              <ToiletList user={user} toilets={toilets} />
            )}
            {selectedMenu === 'USER_SETTING' && (
              <div style={{ width: '300px', backgroundColor: 'yellow' }}>
                <text>CANVAS처럼 트랜지션 넣을 거임 </text>
              </div>
            )}
            {selectedMenu === 'WRITE_REVIEW' && (
              <div style={{ width: '300px', backgroundColor: 'yellow' }}>
                <text>리뷰쓰기</text>
              </div>
            )}
          </FlexRowDiv>
        }
        BodyComponent={
          <>
            {needRequestAgain && (
              <PopupPill
                text={'이 위치에서 다시 검색'}
                icon={'fa-redo'}
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
