import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { findMessageByChats } from '../../../api/helpers';
import { getDateLabel } from '../../../utils/date';

import Avatar from '../../atoms/Avatar';
import IconWithMenu from '../../molecules/IconWithMenu';
import { TbChevronDown } from 'react-icons/tb';
import './styles.scss';

type ChatItemProps = {
  _id: string;
  title: string;
  picture?: string;
  participants: string[];
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  active?: boolean;
};

const ChatItem = ({
  _id,
  title,
  participants,
  picture,
  active,
  onSelectChat,
  onDeleteChat,
}: ChatItemProps): JSX.Element => {
  const [hover, setHover] = React.useState(false);

  const getNumberMessagesNotRead = () =>
    messages.reduce((number, message) => {
      if (
        // Check if the user id is on the array
        message.read.findIndex((userId) => userId === Meteor.userId()) !== -1 ||
        // You are the sender of the message
        message.senderId === Meteor.userId()
      )
        return number;
      else return number + 1;
    }, 0);

  // Reactive render
  const messages = useTracker(() => findMessageByChats(_id));
  const lastMessage = useTracker(() => messages.slice(-1)[0] || null);
  const nbMessagesNotRead = useTracker(() => getNumberMessagesNotRead());

  const onClick = () => {
    onSelectChat(_id);
    if (nbMessagesNotRead > 0) {
      for (let i = messages.length - 1; i >= 0; i--) {
        let isRead =
          messages[i].read.findIndex((userId) => userId === Meteor.userId()) >
          -1;
        let isOthers = messages[i].senderId !== Meteor.userId();
        if (isRead && isOthers) {
          console.log('hey');
          break;
        } else {
          messages[i].read.push(Meteor.userId());
          Meteor.call(
            'messages.update',
            messages[i]._id,
            messages[i],
            (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log(
                  'Update successfully the message with id:',
                  messages[i]._id
                );
              }
            }
          );
        }
      }
    }
  };

  const handleSelectMenuItem = (index: number) => {
    switch (index) {
      case 0:
        return;
      case 1:
        return;
      case 2:
        onDeleteChat(_id);
        Meteor.call('chats.delete', _id, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Chat ${_id} deleted successfully`);
          }
        });
        return;
      case 3:
        return;
      case 4:
        return;
    }
  };

  return (
    <div
      className={['chatItem', active && 'chatItem--active']
        .filter(Boolean)
        .join(' ')}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="chatItem__container" onClick={onClick}></div>
      <div className="chatItem__content--left">
        <Avatar iconClassName="chatItem__avatar" avatarUrl={picture} large />
      </div>
      <div className="chatItem__content--right">
        <div className="chatItem__row">
          <span className="chatItem__title">{title}</span>
          <div
            className={[
              'chatItem__date',
              nbMessagesNotRead > 0 && 'chatItem__date--colored',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {lastMessage ? getDateLabel(lastMessage.createdAt, true) : ''}
          </div>
        </div>
        <div className="chatItem__row">
          <span className="chatItem__message">
            {lastMessage ? lastMessage.content : ''}
          </span>
          {nbMessagesNotRead > 0 ? (
            <div className="chatItem__badge">{nbMessagesNotRead}</div>
          ) : (
            <IconWithMenu
              iconClassName={[
                'chatItem__chevron',
                !hover && 'chatItem__chevron--hidden',
              ]
                .filter(Boolean)
                .join(' ')}
              Icon={TbChevronDown}
              menuItems={[
                'Archiver la discussion',
                'Notification en mode silencieuses',
                'Supprimer la discussion',
                'Épingler la discussion',
                'Marquer comme non lu',
              ]}
              menuPlacement="right"
              onSelectMenuItem={handleSelectMenuItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
