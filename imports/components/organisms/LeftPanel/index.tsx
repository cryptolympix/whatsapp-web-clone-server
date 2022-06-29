import React from 'react';
import './styles.scss';

import Header from '../../molecules/Header';

type LeftPanelProps = {};

const icons: string[] = ['circle-notch', 'comment-alt', 'ellipsis-v'];

const LeftPanel = (props: LeftPanelProps): JSX.Element => {
  return (
    <div className="leftPanel">
      <Header icons={icons} />
    </div>
  );
};

export default LeftPanel;
