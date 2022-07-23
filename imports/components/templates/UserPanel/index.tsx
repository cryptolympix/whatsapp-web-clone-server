import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MdArrowBack, MdEdit } from 'react-icons/md';
import Avatar from '../../atoms/Avatar';
import './styles.scss';

type UserPanelProps = {
  className?: string;
  user: Meteor.User;
  onBack?: () => void;
};

const UserPanel = ({ className, user, onBack }: UserPanelProps) => {
  const [username, setUsername] = React.useState(user.username);
  const [status, setStatus] = React.useState(user.profile.status);
  const usernameInputRef = React.useRef<HTMLInputElement>();
  const statusInputRef = React.useRef<HTMLInputElement>();

  const updateUsername = (newUsername: string) => {
    if (username === newUsername) return;

    Meteor.call(
      'users.update',
      user.username,
      { username: newUsername },
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`User ${user._id} updates username`);
        }
      }
    );
  };

  const updateStatus = (newStatus: string) => {
    if (status === newStatus) return;

    Meteor.call(
      'users.update',
      user.username,
      { profile: { ...user.profile, status: newStatus } },
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`User ${user._id} updates status`);
        }
      }
    );
  };

  React.useEffect(() => {
    const onPress = (event: KeyboardEvent) => {
      if (
        document.activeElement === usernameInputRef.current &&
        event.key === 'Enter'
      ) {
        updateUsername(username);
        usernameInputRef.current.blur();
      }
      if (
        document.activeElement === statusInputRef.current &&
        event.key === 'Enter'
      ) {
        updateStatus(status);
        statusInputRef.current.blur();
      }
    };

    document.addEventListener('keydown', onPress);
    return () => document.removeEventListener('keydown', onPress);
  }, [username, status]);

  return (
    <div className={['userPanel', className].join(' ')}>
      <div className="userPanel__header">
        <MdArrowBack className="userPanel__header__arrow" onClick={onBack} />
        <span className="userPanel__header__title">Profil</span>
      </div>
      <Avatar
        avatarUrl={user.profile.picture}
        iconClassName="userPanel__avatar"
      />
      <div className="userPanel__section">
        <span className="userPanel__section__title">Votre nom</span>
        <div className="userPanel__section__row">
          <input
            ref={usernameInputRef}
            className="userPanel__section__label"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => updateUsername(username)}
          />
          <MdEdit
            className="userPanel__section__edit"
            onClick={() => usernameInputRef.current.focus()}
          />
        </div>
        <span className="userPanel__section__info">
          Ce n'est pas votre nom d'utilisateur ou code pin. Ce nom sera visible
          auprès de vos contacts WhatsApp.
        </span>
      </div>
      <div className="userPanel__section">
        <span className="userPanel__section__title">Actu</span>
        <div className="userPanel__section__row">
          <input
            ref={statusInputRef}
            className="userPanel__section__label"
            value={status}
            type="text"
            onChange={(e) => setStatus(e.target.value)}
            onBlur={() => updateStatus(status)}
          />
          <MdEdit
            className="userPanel__section__edit"
            onClick={() => statusInputRef.current.focus()}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
