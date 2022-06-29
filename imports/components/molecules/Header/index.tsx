import React from 'react';
import './styles.scss';

type HeaderProps = {
  icons: string[];
  smallIcons?: boolean;
};

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <div className="header">
      <div
        className={props.smallIcons ? 'header__icons' : 'header__icons--small'}
      >
        {props.icons.map((icon, i) => (
          <></>
        ))}
      </div>
    </div>
  );
};

export default Header;
