import React from 'react';
import {
  MdDataUsage,
  MdAccountCircle,
  MdMoreVert,
  MdChat,
} from 'react-icons/md';

import IconWithMenu from '../../atoms/IconWithMenu';
import './styles.scss';

type LeftPanelHeaderProps = {
  icons: string[];
  smallIcons?: boolean;
};

const LeftPanelHeader = (props: LeftPanelHeaderProps): JSX.Element => {
  const onClickAccount = () => {};

  const onClickData = () => {};

  const onClickChat = () => {};

  const handleSelectMenuItem = (index: number) => {
    console.log(index);
  };

  return (
    <div className="leftPanelHeader">
      <div className={'leftPanelHeader__icons'}>
        <MdAccountCircle
          className="leftPanelHeader__icon leftPanelHeader__icon--left"
          onClick={onClickAccount}
        />
      </div>
      <div className="leftPanelHeader__icons leftPanelHeader__icon--right">
        <MdDataUsage
          className="leftPanelHeader__icon leftPanelHeader__icon--right"
          onClick={onClickData}
        />
        <MdChat
          className="leftPanelHeader__icon leftPanelHeader__icon--right"
          onClick={onClickChat}
        />
        <IconWithMenu
          Icon={MdMoreVert}
          iconClassName={'leftPanelHeader__icon leftPanelHeader__icon--right'}
          menuItems={[
            'Nouveau groupe',
            'Messages importants',
            'Paramètres',
            'Déconnexion',
          ]}
          onSelectMenuItem={handleSelectMenuItem}
        />
      </div>
    </div>
  );
};

export default LeftPanelHeader;
