import React, { ReactElement } from 'react';
import tw from 'twin.macro';
import { windowHooks, windowTypes } from '@modules/window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

const SideMenuButtonsContainer = tw.div`fixed flex flex-col w-max z-over-menu gap-2 margin-left[1em] margin-top[1em] md:(relative)`;

const SideMenuButton = styled.div<{ selected: boolean }>(props => [
  tw`flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-default hover:(shadow-hover)`,
  props.selected && tw`bg-green-50`,
]);

// hook으로 인해 presentational이랑 분리가되는 경우. 재사용하는 컴포넌트는 hook을 쓰지 않고 props를 전달받기
export default function SideMenuButtons(): ReactElement {
  const setSelectedLeftMenu = windowHooks.useSelectLeftMenu();
  const selectedMenu = windowHooks.useSelectedLeftMenu();
  return (
    <SideMenuButtonsContainer>
      {windowTypes.leftMenus.map(menu => (
        <SideMenuButton
          key={menu}
          selected={selectedMenu === menu}
          onClick={() =>
            setSelectedLeftMenu(menu === selectedMenu ? null : menu)
          }
        >
          <FontAwesomeIcon icon={windowTypes.leftMenuIconMap[menu]} size="sm" />
        </SideMenuButton>
      ))}
    </SideMenuButtonsContainer>
  );
}
