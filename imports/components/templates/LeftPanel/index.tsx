import React from 'react';
import './styles.scss';

import Header from '../../organisms/LeftPanelHeader';
import NotificationPanel from '../../organisms/NotificationPanel';

type LeftPanelProps = {};

const LeftPanel = (props: LeftPanelProps): JSX.Element => {
  return (
    <div className="leftPanel">
      <Header />
      <NotificationPanel />
    </div>
  );
};

export default LeftPanel;
