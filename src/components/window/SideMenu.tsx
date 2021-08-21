/** @jsxImportSource @emotion/react */
import ToiletList from '@components/toilet/ToiletList';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { authHooks } from '@modules/auth';
import { subscribeToAuthChange } from '@modules/auth/api';
import { toiletHooks } from '@modules/toilet';
import { windowHooks } from '@modules/window';
import { useEffect } from 'react';
import { SignUp, UserProfileInfoView } from '../../pages';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { ReviewList } from '@components/review/ReviewList';

const SideMenuContainer = styled.div<{ show: boolean }>(props => [
  tw`fixed flex-shrink-0 w-screen bottom-0 flex z-over-map h-max`,
  tw`md:(relative bottom-auto w-96 h-full)`,
  !props.show && tw`hidden`,
]);

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
    <SideMenuContainer show={selectedMenu != null}>
      {/* 화장실 리스트 */}
      {selectedMenu === 'LIST' &&
        (selectedToilet ? (
          <ReviewList selectedToilet={selectedToilet} />
        ) : (
          <ToiletList toilets={toilets} />
        ))}
      {/* 리뷰 리스트 */}
      {selectedMenu === 'USER_SETTING' &&
        (user == null ? (
          <SignUp />
        ) : (
          <UserProfileInfoView user={user} logOut={logOut} />
        ))}
    </SideMenuContainer>
  );
}
