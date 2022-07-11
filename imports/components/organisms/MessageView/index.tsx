import React from 'react';
import { Meteor } from 'meteor/meteor';
import MessageBox from '../../molecules/MessageBox';

import './styles.scss';

type MessageViewProps = {
  className?: string;
  messages: Message[];
};

const MessageView = ({ className, messages }: MessageViewProps) => {
  const ref = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    ref.current.scrollBy({ top: ref.current.scrollHeight });
  }, [messages]);

  return (
    <div ref={ref} className={['messageView', className].join(' ')}>
      {messages
        .sort(
          (msg1, msg2) => msg1.createdAt.valueOf() - msg2.createdAt.valueOf()
        )
        .map((message) => (
          <div
            key={message._id}
            className={[
              'messageView__row',
              message.senderId === Meteor.userId()
                ? 'messageView__row--right'
                : 'messageView__row--left',
            ].join(' ')}
          >
            <MessageBox
              className={[
                'messageView__message',
                message.senderId === Meteor.userId()
                  ? 'messageView__message--right'
                  : 'messageView__message--left',
              ].join(' ')}
              message={message}
              side={message.senderId === Meteor.userId() ? 'right' : 'left'}
            />
          </div>
        ))}
    </div>
  );
};

export default MessageView;
