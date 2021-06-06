/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { subscribeToAuthChange } from './apis/authentication';
import { fetchToiletWithArea, Toilet } from './apis/toilets';
import './App.css';
import { Avartar } from './components/Avatar';
import Map from './components/Map';
import TestComponent from './components/TestComponent';
import BodyLayout from './layouts/BodyLayout';
import HeaderLayout from './layouts/HeaderLayout';
import SignUpPage from './pages/SignUp';
import { MapState } from './store/mapReducer';

function App(): EmotionJSX.Element {
  const [toilets, setToilets] = useState<unknown[]>([]);
  const [user, setUser] = useState<firebase.User | null>(null);

  // TODO: 박민규 2021-06-05 hook파일에 따로 관리
  // @links https://react-redux.js.org/using-react-redux/usage-with-typescript
  const position = useSelector<MapState, MapState['position']>(
    state => state.position,
  );

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
    fetchToiletWithArea(seoul, 1000).then(res =>
      setToilets(res.map(r => Object.assign(r.data(), { id: r.id }))),
    );
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
      <HeaderLayout>
        <div>logo</div>
        <Avartar
          size={48}
          imgSrc={
            'https://pbs.twimg.com/media/E1Pe-mSUYAE3NXV?format=jpg&name=large'
          }
          onClick={() => alert('winter')}
        />
      </HeaderLayout>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <BodyLayout
              LeftPanel={<SignUpPage />}
              RightPanel={<Map toilets={toilets as Toilet[]} />}
            />
          </Route>
          <Route path="/">
            <BodyLayout
              LeftPanel={
                <TestComponent
                  user={user}
                  toilets={toilets as Toilet[]}
                  curpos={position}
                />
              }
              RightPanel={<Map toilets={toilets as Toilet[]} />}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
