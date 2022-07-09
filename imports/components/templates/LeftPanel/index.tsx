import React from 'react';
import { findChats } from '../../../api/helpers';
import './styles.scss';

import Header from '../../organisms/LeftPanelHeader';
import NotificationPanel from '../../organisms/NotificationPanel';
import SearchBarPanel from '../../organisms/SearchBarPanel';
import ChatList from '../../organisms/ChatList';

type LeftPanelProps = {
  onSelectChat?: (chatId: string) => void;
  chatSelected?: Chat;
};

const LeftPanel = ({
  onSelectChat,
  chatSelected,
}: LeftPanelProps): JSX.Element => {
  const allChats = findChats();
  const [search, setSearch] = React.useState<string>('');
  const [chats, setChats] = React.useState<Chat[]>(allChats);

  React.useEffect(() => {
    // Filter with the title of the chat (simplified)
    if (search === '') {
      setChats(allChats);
    } else {
      setChats(
        allChats.filter(
          (chat) => chat.title.toUpperCase().indexOf(search.toUpperCase()) > -1
        )
      );
    }
  }, [search]);

  return (
    <div className="leftPanel">
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
        chatSelected={chatSelected}
        onClickArchive={() => null}
      />
    </div>
  );
};

export default LeftPanel;
