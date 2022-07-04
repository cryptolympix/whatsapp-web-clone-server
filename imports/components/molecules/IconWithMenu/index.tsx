import React from 'react';
import { IconType } from 'react-icons';
import './styles.scss';

type IconWithMenuProps = {
  Icon: IconType;
  iconClassName?: string;
  menuClassName?: string;
  menuItemClassName?: string;
  menuItems: string[];
  onSelectMenuItem?: (index: number) => void;
  transformType?: 'right' | 'left';
};

const IconWithMenu = ({
  Icon,
  iconClassName,
  menuClassName,
  menuItems,
  menuItemClassName,
  onSelectMenuItem,
}: IconWithMenuProps) => {
  const [menuHidden, setMenuHidden] = React.useState(true);

  return (
    <div
      className={[
        'iconWithMenu',
        iconClassName,
        !menuHidden && 'iconWithMenu--highlight',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Icon onClick={() => setMenuHidden(!menuHidden)} />
      <ul
        className={[
          'iconWithMenu__menu',
          menuClassName,
          menuHidden && 'iconWithMenu__menu--hide',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {menuItems.map((item, i) => (
          <li
            key={i}
            className={['iconWithMenu__menuItem', menuItemClassName].join(' ')}
            onClick={() => {
              setMenuHidden(true);
              onSelectMenuItem(i);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IconWithMenu;
