import React from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { MdAttachFile, MdSend } from 'react-icons/md';
import { FaMicrophone } from 'react-icons/fa';

import './styles.scss';

type ChatFooterProps = {
  className?: string;
  onSendClick?: (message: string) => void;
};

const ChatFooter = ({ className, onSendClick }: ChatFooterProps) => {
  const [textInput, setTextInput] = React.useState('');

  const onEmojiClick = () => {};
  const onAttachFileClick = () => {};
  const onMicrophoneClick = () => {};

  return (
    <div className={['chatFooter', className].join(' ')}>
      <BsEmojiSmile className="chatFooter__icon" onClick={onEmojiClick} />
      <MdAttachFile className="chatFooter__icon" onClick={onAttachFileClick} />
      <input
        className="chatFooter__input"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        type="text"
        placeholder="Taper un message"
        autoComplete="off"
      ></input>
      {textInput === '' ? (
        <FaMicrophone
          className="chatFooter__icon"
          onClick={onMicrophoneClick}
        />
      ) : (
        <MdSend
          className="chatFooter__icon"
          onClick={() => onSendClick(textInput)}
        />
      )}
    </div>
  );
};

export default ChatFooter;
