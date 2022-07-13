import React from 'react';
import { findChats } from '../../../api/helpers';
import { useTracker } from 'meteor/react-meteor-data';
import './styles.scss';

import Header from '../../organisms/LeftPanelHeader';
import NotificationPanel from '../../organisms/NotificationPanel';
import SearchBarPanel from '../../organisms/SearchBarPanel';
import ChatList from '../../organisms/ChatList';

type LeftPanelProps = {
  className?: string;
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  chatSelected?: Chat;
};

const LeftPanel = ({
  className,
  onSelectChat,
  onDeleteChat,
  chatSelected,
}: LeftPanelProps): JSX.Element => {
  const [search, setSearch] = React.useState<string>('');
  // const [chats, setChats] = React.useState<Chat[]>(allChats);

  const chats = useTracker(() => {
    // Filter with the title of the chat (simplified)
    if (search === '') {
      return findChats();
    } else {
      return findChats().filter(
        (chat) => chat.title.toUpperCase().indexOf(search.toUpperCase()) > -1
      );
    }
  });

  return (
    <div className={['leftPanel', className].join(' ')}>
      <Header
        onClickAvatar={() => null}
        onClickChat={() => null}
        onClickData={() => null}
      />
      <NotificationPanel onClick={() => null} />
      <SearchBarPanel onChangeSearch={setSearch} />
      <ChatList
        chats={chats}
        onSelectChat={onSelectChat}
        onDeleteChat={onDeleteChat}
        chatSelected={chatSelected}
        onClickArchive={() => null}
      />
    </div>
  );
};

export default LeftPanel;
