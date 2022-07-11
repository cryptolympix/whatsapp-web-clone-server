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
  const [areaRows, setAreaRows] = React.useState(1);
  const areaRef = React.useRef<HTMLTextAreaElement>();

  React.useEffect(() => {
    const onPress = (event: KeyboardEvent) => {
      if (document.activeElement === areaRef.current) {
        if (event.altKey && event.key === 'Enter') {
          setTextInput((textInput) => textInput + '\n');
          setAreaRows((row) => row + 1);
        } else if (event.key === 'Enter') {
          onSendMessage(textInput);
        } else if (
          event.key === 'Backspace' &&
          areaRef.current.value.endsWith('\n')
        ) {
          setAreaRows((row) => row - 1);
        }
      }
    };

    document.addEventListener('keydown', onPress);
    return () => document.removeEventListener('keydown', onPress);
  }, [textInput]);

  const onEmojiClick = () => {};
  const onAttachFileClick = () => {};
  const onMicrophoneClick = () => {};

  const onSendMessage = (message: string) => {
    if (message !== '') {
      onSendClick(message);
      setTextInput('');
      setAreaRows(1);
    } else {
      console.log('Nothing to send. Text is empty.');
    }
  };

  return (
    <div className={['chatFooter', className].join(' ')}>
      <BsEmojiSmile className="chatFooter__icon" onClick={onEmojiClick} />
      <MdAttachFile className="chatFooter__icon" onClick={onAttachFileClick} />
      <textarea
        ref={areaRef}
        className="chatFooter__textarea"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        placeholder="Taper un message"
        autoComplete="off"
        rows={areaRows}
      ></textarea>
      {textInput === '' ? (
        <FaMicrophone
          className="chatFooter__icon"
          onClick={onMicrophoneClick}
        />
      ) : (
        <MdSend
          className="chatFooter__icon"
          onClick={() => onSendMessage(textInput)}
        />
      )}
    </div>
  );
};

export default ChatFooter;
