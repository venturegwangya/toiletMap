import { SideMenu } from '@components/window/SideMenu';
import SideMenuButtons from '@components/window/SideMenuBar';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { toiletHooks } from '@modules/toilet';
import React, { ReactElement } from 'react';
import tw from 'twin.macro';
import Pill from './Pill';

/**
 * Hook에 의해 Props전달이 필요없는 경우가 생기는데,
 * 언제 Model에 대한 정보를 View가 알아도 괜찮을까?
 * 1. 앱의 고유한 기능과 로직을 가진 Component인 경우
 * 2. 내부의 더 작은 단위가 재사용될 가능성이 적고, 현재 Component가 Model과 관계가 고유해서 느슨하지 않아도 재사용이 가능할 때.
 */

const MenuOverlayContainer = tw.div`flex flex-row absolute w-full h-full gap-4`;
// TODO: 박민규 2021-08-21 지도 쪽에 더 넣으려면 변경해야함
const PopupPillContainer = tw.div`flex w-full h-full justify-center padding[3em]`;

export default function MenuOverlay(): ReactElement {
  const { requestAgain } = toiletHooks.useToilet();
  const fetchNearByToilets = toiletHooks.useFetchNearByToilets();
  return (
    <MenuOverlayContainer>
      <SideMenuButtons />
      <SideMenu />
      <PopupPillContainer>
        <Pill
          show={requestAgain}
          text="이 위치에서 다시 검색"
          icon={faRedo}
          onClick={fetchNearByToilets}
        />
      </PopupPillContainer>
    </MenuOverlayContainer>
  );
}
