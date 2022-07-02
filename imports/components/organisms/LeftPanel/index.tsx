import React from 'react';
import './styles.scss';

import Header from '../../molecules/LeftPanelHeader';

type LeftPanelProps = {};

const LeftPanel = (props: LeftPanelProps): JSX.Element => {
  return (
    <div className="leftPanel">
      <Header />
    </div>
  );
};

export default LeftPanel;
