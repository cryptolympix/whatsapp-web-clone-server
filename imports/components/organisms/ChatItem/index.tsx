import React from 'react';
import dayjs from 'dayjs';
import { Meteor } from 'meteor/meteor';
import { findMessageByChats } from '../../../api/helpers';

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
  active?: boolean;
};

const ChatItem = ({
  _id,
  title,
  participants,
  picture,
  active,
  onSelectChat,
}: ChatItemProps): JSX.Element => {
  const [hover, setHover] = React.useState(false);

  const messages = findMessageByChats(_id);
  const lastMessage = messages.slice(-1)[0];
  const numberMessagesNotRead = messages.reduce((number, message) => {
    if (
      // Check if the user id is on the array
      message.read.findIndex((userId) => userId === Meteor.userId()) !== -1 ||
      // You are the sender of the message
      message.senderId === Meteor.userId()
    )
      return number;
    else return number + 1;
  }, 0);

  const getDateLabel = (messageDate: Date) => {
    const today = dayjs().format('D/MM/YYYY');
    const yesterday = dayjs().subtract(1, 'day').format('D/MM/YYYY');
    const lastWeek = dayjs().subtract(7, 'day').valueOf();
    const messageDay = dayjs(messageDate).format('D/MM/YYYY');
    const messageTimestamp = dayjs(messageDate).valueOf();

    if (messageDay === today) {
      return dayjs(messageDate).format('HH:mm');
    } else if (messageDay === yesterday) {
      return 'hier';
    } else if (messageTimestamp >= lastWeek) {
      const day = dayjs(messageDate).day();
      switch (day) {
        case 0:
          return 'dimanche';
        case 1:
          return 'lundi';
        case 2:
          return 'mardi';
        case 3:
          return 'mercredi';
        case 4:
          return 'jeudi';
        case 5:
          return 'vendredi';
        case 6:
          return 'samedi';
      }
    } else {
      return messageDay;
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
      <div
        className="chatItem__container"
        onClick={() => onSelectChat(_id)}
      ></div>
      <div className="chatItem__content--left">
        <Avatar iconClassName="chatItem__avatar" avatarUrl={picture} large />
      </div>
      <div className="chatItem__content--right">
        <div className="chatItem__row">
          <span className="chatItem__title">{title}</span>
          <div
            className={[
              'chatItem__date',
              numberMessagesNotRead > 0 && 'chatItem__date--colored',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {getDateLabel(lastMessage.createdAt)}
          </div>
        </div>
        <div className="chatItem__row">
          <span className="chatItem__message">{lastMessage.content}</span>
          {numberMessagesNotRead > 0 ? (
            <div className="chatItem__badge">{numberMessagesNotRead}</div>
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
              onSelectMenuItem={() => null}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
