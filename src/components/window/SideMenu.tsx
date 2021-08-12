import React, { ReactElement } from 'react';
import tw from 'twin.macro';
import { windowHooks, windowTypes } from '@modules/window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

const SideMenuBar = tw.div`w-12 h-full bg-white`;
const SideMenuItem = styled.div<{ selected: boolean }>(props => [
  tw`flex items-center justify-center w-12 h-12`,
  props.selected && tw`bg-green-50`,
]);

// hook으로 인해 presentational이랑 분리가되는 경우. 재사용하는 컴포넌트는 hook을 쓰지 않고 props를 전달받기
// TODO: 박민규 2021-08-12 메뉴 종류가 늘어나면 알아서 되게 만들기
// TODO: 박민규 2021-08-12 메뉴 종류마다 알아서 클릭되게 만들기
export default function SideMenu(): ReactElement {
  const setSelectedLeftMenu = windowHooks.useSelectLeftMenu();
  const selectedMenu = windowHooks.useSelectedLeftMenu();
  return (
    <SideMenuBar>
      {windowTypes.leftMenus.map((menu, i) => (
        <SideMenuItem
          key={`side_menu_item_${i}`}
          selected={selectedMenu === menu}
          onClick={() => setSelectedLeftMenu(menu)}
        >
          <FontAwesomeIcon icon={windowTypes.leftMenuIconMap[menu]} size="lg" />
        </SideMenuItem>
      ))}
    </SideMenuBar>
  );
}
