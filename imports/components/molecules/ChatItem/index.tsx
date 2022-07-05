import React from 'react';
import dayjs from 'dayjs';
import { findMessageById } from '../../../api/helpers';

import Avatar from '../../atoms/Avatar';
import './styles.scss';

type ChatItemProps = {
  _id: string;
  title: string;
  picture?: string;
  messages?: string[];
  participants: string[];
};

const ChatItem = ({
  title,
  participants,
  picture,
  messages,
}: ChatItemProps): JSX.Element => {
  const [lastMessage, setLastMessage] = React.useState<Message>();

  React.useEffect(() => {
    const lastMessageId = messages.slice(-1)[0];
    setLastMessage(findMessageById(lastMessageId));
  }, []);

  if (!lastMessage) {
    return <div className="chatItem"></div>;
  } else {
    const now = dayjs().format('D/MM/YYYY');
    const today = dayjs(lastMessage.createdAt).format('D/MM/YYYY');

    return (
      <div className="chatItem">
        <Avatar iconClassName="chatItem__avatar" avatarUrl={picture} large />
        <div className="chatItem__content">
          <div className="chatItem__row">
            <span className="chatItem__title">{title}</span>
            <div
              className={[
                'chatItem__date',
                !lastMessage.read && 'chatItem__date--colored',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {now === today
                ? dayjs(lastMessage.createdAt).format('HH:mm')
                : dayjs(lastMessage.createdAt).format('D/MM/YYYY')}
            </div>
          </div>
          <div className="chatItem__row">
            <span
              className={[
                'chatItem__message',
                !lastMessage.read && 'chatItem__message--new',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {lastMessage.content}
            </span>
            {!lastMessage.read && <div className="chatItem__badge">4</div>}
          </div>
        </div>
      </div>
    );
  }
};

export default ChatItem;
