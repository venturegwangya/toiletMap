/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';
import { windowHooks, windowTypes } from '@modules/window';

type LeftMenuItemViewProps = {
  id: windowTypes.LeftMenu;
  iconProps: FontAwesomeIconProps;
  selected: boolean;
};

export default function LeftMenuItemView({
  id,
  iconProps,
  selected,
}: LeftMenuItemViewProps): ReactElement {
  const setSelectedLeftMenu = windowHooks.useSelectLeftMenu();
  return (
    <div
      onClick={() => setSelectedLeftMenu(id)}
      css={css`
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${selected ? 'yellow' : 'transparent'};
        &:hover {
          cursor: pointer;
        }
      `}
    >
      <FontAwesomeIcon {...iconProps} size="lg" />
    </div>
  );
}
