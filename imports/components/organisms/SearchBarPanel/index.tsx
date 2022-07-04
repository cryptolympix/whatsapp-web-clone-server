import React from 'react';
import './styles.scss';

import SearchBar from '../../molecules/SearchBar';

type SearchBarPanelProps = {};

const SearchBarPanel = (props: SearchBarPanelProps) => {
  return (
    <div className="searchBarPanel">
      <SearchBar useIcons />
    </div>
  );
};

export default SearchBarPanel;
