import { ReviewOverlay } from '@components/review/ReviewOverlay';
import { SideMenu } from '@components/window/SideMenu';
import SideMenuBar from '@components/window/SideMenuBar';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { authHooks } from '@modules/auth';
import { toiletHooks } from '@modules/toilet';
import React, { ReactElement } from 'react';
import tw from 'twin.macro';
import Pill from './Pill';

const MenuOverlayContainer = tw.div`flex flex-row absolute w-full h-full gap-4`;
// TODO: 박민규 2021-08-21 지도 쪽에 더 넣으려면 변경해야함
const PopupPillContainer = tw.div`flex w-full h-full justify-center padding[3em]`;

export default function MenuOverlay(): ReactElement {
  const { user } = authHooks.useUser();
  const { selectedToilet, requestAgain } = toiletHooks.useToilet();
  const fetchNearByToilets = toiletHooks.useFetchNearByToilets();
  return (
    <MenuOverlayContainer>
      <SideMenuBar />
      <SideMenu />
      {selectedToilet && <ReviewOverlay toilet={selectedToilet} user={user} />}
      <PopupPillContainer>
        {requestAgain && (
          <Pill
            text="이 위치에서 다시 검색"
            icon={faRedo}
            onClick={fetchNearByToilets}
          />
        )}
      </PopupPillContainer>
    </MenuOverlayContainer>
  );
}
