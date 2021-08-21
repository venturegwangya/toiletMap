import React, { ReactElement } from 'react';
import tw from 'twin.macro';
import { windowHooks, windowTypes } from '@modules/window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

const SideMenuBarContainer = tw.div`relative flex flex-col w-max z-over-map gap-2 margin-left[1em] margin-top[1em]`;

const SideMenuBarItem = styled.div<{ selected: boolean }>(props => [
  tw`flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-default hover:(shadow-hover)`,
  props.selected && tw`bg-green-50`,
]);

// hook으로 인해 presentational이랑 분리가되는 경우. 재사용하는 컴포넌트는 hook을 쓰지 않고 props를 전달받기
export default function SideMenuBar(): ReactElement {
  const setSelectedLeftMenu = windowHooks.useSelectLeftMenu();
  const selectedMenu = windowHooks.useSelectedLeftMenu();
  return (
    <SideMenuBarContainer>
      {windowTypes.leftMenus.map(menu => (
        <SideMenuBarItem
          key={menu}
          selected={selectedMenu === menu}
          onClick={() =>
            setSelectedLeftMenu(menu === selectedMenu ? null : menu)
          }
        >
          <FontAwesomeIcon icon={windowTypes.leftMenuIconMap[menu]} size="sm" />
        </SideMenuBarItem>
      ))}
    </SideMenuBarContainer>
  );
}
