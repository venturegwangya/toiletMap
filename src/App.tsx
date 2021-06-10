/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { subscribeToAuthChange } from './apis/authentication';
import { fetchToiletWithArea, Toilet } from './apis/toilets';
import './App.css';
import { Avartar } from './components/Avatar';
import Map from './components/map/Map';
import TestComponent from './components/TestComponent';
import SignUpPage from './pages/SignUp';
import { useMapPosition } from './hooks/useMapPosition';
import { BodyLayout, Header } from './components/common';

const goLogin = () => {
  window.location.href = '/login';
};

const goHome = () => {
  window.location.href = '/';
};

function App(): EmotionJSX.Element {
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [user, setUser] = useState<firebase.User | null>(null);
  const position = useMapPosition();
  console.debug('위치', position);
  useEffect(() => {
    // user바뀔 때
    const unsubscribe = subscribeToAuthChange(
      authUser => {
        setUser(authUser);
      },
      () => setUser(null),
    );
    return () => {
      unsubscribe(); // detach backend listener
    };
  }, []);

  useEffect(() => {
    // componentMount/Update
    const seoul: firebase.firestore.GeoPoint = new firebase.firestore.GeoPoint(
      37.40095,
      126.733522,
    );
    fetchToiletWithArea(seoul, 1000).then(toilets => setToilets(toilets));
    // const data = res.map((r: { data: () => any; id: any }) =>
    // );
    // setToilets(data);
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
        <img
          src="https://tva1.sinaimg.cn/large/008i3skNgy1gr8n1r9v8vj304601et8m.jpg"
          onClick={goHome}
        />
        <Avartar
          size={48}
          imgSrc={
            'https://pbs.twimg.com/media/E1Pe-mSUYAE3NXV?format=jpg&name=large'
          }
          onClick={goLogin}
        />
      </Header>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <BodyLayout
              LeftChild={<SignUpPage />}
              RightChild={<Map toilets={toilets} />}
            />
          </Route>
          <Route path="/">
            <BodyLayout
              LeftChild={
                <TestComponent
                  user={user}
                  toilets={toilets}
                  curpos={position}
                />
              }
              RightChild={<Map toilets={toilets} />}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
