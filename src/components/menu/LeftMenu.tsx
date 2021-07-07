/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faList, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { ReactElement, useCallback } from 'react';
import { LeftMenu } from 'src/App';

type LeftMenuItemViewProps = {
  onClick: (id: LeftMenu) => void;
  id: LeftMenu;
  iconProps: FontAwesomeIconProps;
  selected: boolean;
};

export default function LeftMenuItemView({
  onClick,
  id,
  iconProps,
  selected,
}: LeftMenuItemViewProps): ReactElement {
  const handleClick = useCallback(
    (_id: LeftMenu) => {
      onClick(_id);
    },
    [onClick],
  );
  return (
    <div
      onClick={() => handleClick(id)}
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
