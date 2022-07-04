import React from 'react';
import './styles.scss';

import Header from '../../organisms/LeftPanelHeader';
import NotificationPanel from '../../organisms/NotificationPanel';
import SearchBarPanel from '../../organisms/SearchBarPanel';

type LeftPanelProps = {};

const LeftPanel = (props: LeftPanelProps): JSX.Element => {
  return (
    <div className="leftPanel">
      <Header />
      <NotificationPanel />
      <SearchBarPanel />
    </div>
  );
};

export default LeftPanel;
