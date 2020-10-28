import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import { Loading } from 'components/Loading';
import SearchInput from './SearchInput';



const StyledLoading = styled(Loading)`
  position: absolute;
  top: 14px;
  right: 16px;
`;

/**
 * Renders search input
 */
const Search = ({
  placeholder
}) => {

  const [loading, setLoading] = useState(false);


  return (
    <SearchInput
      placeholder={placeholder}
    >
      {loading && <StyledLoading size="xxs" />}

    </SearchInput>
  );
};


export default Search;
