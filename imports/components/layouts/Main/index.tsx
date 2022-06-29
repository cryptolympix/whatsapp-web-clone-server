import React from 'react';
import './styles.scss';

import LeftPanel from '../../organisms/LeftPanel';
import RightPanel from '../../organisms/RightPanel';

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
