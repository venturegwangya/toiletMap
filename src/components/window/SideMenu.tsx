/** @jsxImportSource @emotion/react */
import { ReviewPanel } from '@components/review/ReviewPanel';
import ToiletList from '@components/toilet/ToiletList';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { authHooks } from '@modules/auth';
import { subscribeToAuthChange } from '@modules/auth/api';
import { toiletHooks } from '@modules/toilet';
import { windowHooks } from '@modules/window';
import { useEffect } from 'react';
import { SignUp } from '../../pages/SignUp';
import tw from 'twin.macro';

const SideMenuContainer = tw.div`flex`;

export function SideMenu(): EmotionJSX.Element {
  const logOut = authHooks.useLogOut();
  const selectedMenu = windowHooks.useSelectedLeftMenu();
  const { selectedToilet, toilets } = toiletHooks.useToilet();
  const { user, setUser } = authHooks.useUser();
  const fetchNearByToilets = toiletHooks.useFetchNearByToilets();

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
    <SideMenuContainer>
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
    </SideMenuContainer>
  );
}
