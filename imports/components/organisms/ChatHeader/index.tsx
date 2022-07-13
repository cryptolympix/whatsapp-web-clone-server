import React from 'react';
import { Meteor } from 'meteor/meteor';

import Avatar from '../../atoms/Avatar';
import { MdMoreVert, MdOutlineSearch } from 'react-icons/md';
import IconWithMenu from '../../molecules/IconWithMenu';
import './styles.scss';

type ChatHeaderProps = {
  className?: string;
  chat: Chat;
  onCloseChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  onDisplayContactInfo?: () => void;
};

const ChatHeader = ({
  chat,
  className,
  onCloseChat,
  onDeleteChat,
  onDisplayContactInfo,
}: ChatHeaderProps) => {
  const onClickSearch = () => {};

  const handleSelectMenuItem = (index: number) => {
    switch (index) {
      case 0:
        onDisplayContactInfo();
        return;
      case 1:
        return;
      case 2:
        onCloseChat(chat._id);
        return;
      case 3:
        return;
      case 4:
        return;
      case 5:
        Meteor.call('messages.deleteForChat', chat._id, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(
              `Messages inside the chat ${chat._id} has been deleted successfully`
            );
          }
        });
        return;
      case 6:
        Meteor.call('chats.delete', chat._id, (err) => {
          if (err) {
            console.error(err);
          } else {
            onDeleteChat(chat._id);
            console.log(`Chat ${chat._id} deleted successfully`);
          }
        });
        return;
    }
  };

  return (
    <div className={['chatHeader', className].join(' ')}>
      <div className={'chatHeader__icons'}>
        <Avatar
          avatarUrl={chat ? chat.picture : ''}
          iconClassName="chatHeader__icon chatHeader__icon--left"
          onClick={onDisplayContactInfo}
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
