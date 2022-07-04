import React from 'react';
import { MdNotificationsOff, MdChevronRight } from 'react-icons/md';
import './styles.scss';

type NotificationPanelProps = {};

const NotificationPanel = (props: NotificationPanelProps) => {
  return (
    <div className="notificationPanel">
      <MdNotificationsOff className="notificationPanel__icon" />
      <div className="notificationPanel__labels">
        <p className="notificationPanel__title">
          Être averti(e) des nouveaux messages
        </p>
        <a className="notificationPanel__link" href="#">
          Activer les notifications sur le bureau{' '}
          <MdChevronRight className="notificationPanel__link__chevron" />
        </a>
      </div>
    </div>
  );
};

export default NotificationPanel;
