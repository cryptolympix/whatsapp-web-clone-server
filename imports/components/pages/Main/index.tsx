import React from 'react';
import './styles.scss';

import LeftPanel from '../../templates/LeftPanel';
import RightPanel from '../../templates/RightPanel';

type MainProps = {};

const Main = (props: MainProps): JSX.Element => {
  return (
    <div className="main">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default Main;
