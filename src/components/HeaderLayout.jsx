/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

function HeaderLayout({ children }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
      `}
    >
      {children}
    </div>
  );
}

HeaderLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderLayout;
