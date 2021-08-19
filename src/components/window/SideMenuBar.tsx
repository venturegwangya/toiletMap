import React, { ReactElement } from 'react';
import tw from 'twin.macro';
import { windowHooks, windowTypes } from '@modules/window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

const SideMenuBarContainer = tw.div`w-12 h-full bg-white`;

const SideMenuItem = styled.div<{ selected: boolean }>(props => [
  tw`flex items-center justify-center w-12 h-12`,
  props.selected && tw`bg-green-50`,
]);

// hook으로 인해 presentational이랑 분리가되는 경우. 재사용하는 컴포넌트는 hook을 쓰지 않고 props를 전달받기
export default function SideMenuBar(): ReactElement {
  const setSelectedLeftMenu = windowHooks.useSelectLeftMenu();
  const selectedMenu = windowHooks.useSelectedLeftMenu();
  return (
    <SideMenuBarContainer>
      {windowTypes.leftMenus.map(menu => (
        <SideMenuItem
          key={menu}
          selected={selectedMenu === menu}
          onClick={() => setSelectedLeftMenu(menu)}
        >
          <FontAwesomeIcon icon={windowTypes.leftMenuIconMap[menu]} size="lg" />
        </SideMenuItem>
      ))}
    </SideMenuBarContainer>
  );
}
