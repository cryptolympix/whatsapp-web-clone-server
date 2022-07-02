import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { MdDataUsage, MdMoreVert, MdChat } from 'react-icons/md';

import IconWithMenu from '../../atoms/IconWithMenu';
import Avatar from '../../atoms/Avatar';
import './styles.scss';

type LeftPanelHeaderProps = {};

const LeftPanelHeader = (props: LeftPanelHeaderProps): JSX.Element => {
  const navigate = useNavigate();

  const onClickAccount = () => {};

  const onClickData = () => {};

  const onClickChat = () => {};

  const handleSelectMenuItem = (index: number) => {
    switch (index) {
      case 0:
        return;
      case 1:
        return;
      case 2:
        return;
      case 3:
        Meteor.logout();
        navigate('/');
        console.log('Log out successfully');
        return;
    }
  };

  return (
    <div className="leftPanelHeader">
      <div className={'leftPanelHeader__icons'}>
        <Avatar
          avatarUrl={Meteor.user() ? Meteor.user().profile.picture : null}
          iconClassName="leftPanelHeader__icon leftPanelHeader__icon--left"
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
