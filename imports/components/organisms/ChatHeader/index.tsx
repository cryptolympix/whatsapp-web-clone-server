import React from 'react';

import Avatar from '../../atoms/Avatar';
import { MdMoreVert, MdOutlineSearch } from 'react-icons/md';
import IconWithMenu from '../../molecules/IconWithMenu';
import './styles.scss';

type ChatHeaderProps = {
  className?: string;
  chat: Chat;
};

const ChatHeader = ({ chat, className }: ChatHeaderProps) => {
  const onClickAvatar = () => {};

  const onClickSearch = () => {};

  const handleSelectMenuItem = (index: number) => {
    switch (index) {
      case 0:
        return;
      case 1:
        return;
      case 2:
        return;
      case 3:
        return;
      case 4:
        return;
      case 5:
        return;
      case 6:
        return;
    }
  };

  return (
    <div className={['chatHeader', className].join(' ')}>
      <div className={'chatHeader__icons'}>
        <Avatar
          avatarUrl={chat ? chat.picture : ''}
          iconClassName="chatHeader__icon chatHeader__icon--left"
          onClick={onClickAvatar}
        />
      </div>
      <div className="chatHeader__infos">
        <span className="chatHeader__infos__title">{chat.title}</span>
        <span className="chatHeader__infos__subtitle">en ligne</span>
      </div>
      <div className="chatHeader__icons">
        <MdOutlineSearch
          className="chatHeader__icon chatHeader__icon--right"
          onClick={onClickSearch}
        />
        <IconWithMenu
          Icon={MdMoreVert}
          iconClassName={'chatHeader__icon chatHeader__icon--right'}
          useHoverColor
          menuItems={[
            'Infos du contact',
            'Sélectionner des messages',
            'Fermer la discussion',
            'Notifications en mode silencieux',
            'Messages éphémères',
            'Effacer les messages',
            'Supprimer la discussion',
          ]}
          onSelectMenuItem={handleSelectMenuItem}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
