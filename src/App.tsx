/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { useEffect, useRef } from 'react';
import './App.css';
import { BodyLayout, FlexRowDiv } from './components/common';
import { ModalPortal } from './components/common/modal/ModalPortal';
import Map from './components/map/Map';
import ToiletList from './components/toilet/ToiletList';
import PopupPill from '@components/common/PopupPill';
import SideMenu from '@components/window/SideMenu';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { ReviewPanel } from '@components/review/ReviewPanel';
import { toiletHooks } from '@modules/toilet';
import { windowHooks } from '@modules/window';
import { subscribeToAuthChange } from '@modules/auth/api';
import { authHooks } from '@modules/auth';
import { SignUp } from './pages';

const LEFT_PANEL_MENU_WIDTH = '300px';

function App(): EmotionJSX.Element {
  const { user, setUser } = authHooks.useUser();
  const selectedMenu = windowHooks.useSelectedLeftMenu();
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const { toilets, selectedToilet, requestAgain } = toiletHooks.useToilet();
  const fetchNearByToilets = toiletHooks.useFetchNearByToilets();
  const refreshPillButtonPosition =
    windowHooks.useLeftPosition(leftContainerRef);

  const logOut = authHooks.useLogOut();

  useEffect(() => {
    // componentMount/Update
    const unsub = subscribeToAuthChange(
      _user => {
        setUser(_user);
      },
      () => {
        setUser(null);
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
                {user == null ? (
                  <SignUp />
                ) : (
                  <>
                    <div>이름: {user.displayName}</div>
                    <div>email: {user.email}</div>
                    <button onClick={logOut}>로그아웃 할끄니까!</button>
                  </>
                )}
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
