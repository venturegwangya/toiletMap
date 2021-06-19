/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import firebase from 'firebase';
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { BodyLayout, Header } from './components/common';
import { Avatar } from './components/common/Avatar';
import { LogInModal } from './components/common/modal/LogInModal';
import { ModalPortal } from './components/common/modal/ModalPortal';
import Map from './components/map/Map';
import { mapHooks } from './modules/map';
import TestComponent from './components/TestComponent';
import { requestToiletsInArea } from './modules/map/actions';
import { showModal } from './modules/modal/actions';
import { useAppDispatch } from './modules/configureStore';
import { authAPI } from './apis/auth';

function App(): EmotionJSX.Element {
  const [user, setUser] = useState<firebase.User | null>(null);
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
      {needRequestAgain && (
        <div
          css={css`
            position: fixed;
            left: 50%;
            top: 50px;
            z-index: 500;
            background-color: wheat;
          `}
          onClick={() => fetchNearByToilets()}
        >
          이 위치에서 다시 검색
        </div>
      )}
      <Header>
        <img src="https://tva1.sinaimg.cn/large/008i3skNgy1gr8n1r9v8vj304601et8m.jpg" />
        <Avatar
          size={48}
          imgSrc="https://pbs.twimg.com/media/E1Pe-mSUYAE3NXV?format=jpg&name=large"
          onClick={() => dispatch(showModal(React.createElement(LogInModal)))}
        />
      </Header>
      <BodyLayout
        LeftChild={
          <TestComponent user={user} toilets={toilets} curpos={position} />
        }
        RightChild={<Map toilets={toilets} />}
      />
      <ModalPortal />
    </div>
  );
}

export default App;
