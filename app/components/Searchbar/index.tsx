/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';

import $ from '../../styles/global';
import IPC from '../../constants/ipcActions.json';
import data from './data.json';
import { addKeys } from '../../utils';
import { SearchState } from '../../reducers/types';
import routes from '../../constants/routes.json';

import { SearchButton, PillMain, PillExtension } from './styled';
import Input from './Input';
import Radio from './Radio';
import Checkbox from './Checkbox';
import PillInput from './PillInput';
import { Provider } from './context';

const dataWithKeys = addKeys(data);

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: ${$.layout.margin2}px;
  width: 100%;
  height: 50%;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  outline: none;
`;

const Searchbar = () => {
  const searchOptions: SearchState = useSelector(state => state.search);
  const [isExtended, setIsExtended] = useState<boolean>(false);
  // TODO: Invoke ipc in new results page, receive args from redux
  // TODO: Componentalise PillInput
  return (
    <Wrapper>
      <Provider
        value={{
          isExtended,
          setIsExtended
        }}
      >
        <PillMain connectBorder={isExtended}>
          <PillInput />
          <SearchButton extend={isExtended}>
            <StyledLink to={routes.RESULT}>
              <FontAwesomeIcon
                icon={
                  searchOptions && searchOptions.isTextSearch
                    ? 'search'
                    : 'search-location'
                }
              />
            </StyledLink>
          </SearchButton>
          <PillExtension visible={isExtended}>
            {dataWithKeys.map(({ key, header, component, ...rest }) => {
              switch (component) {
                case 'radio':
                  return (
                    <Radio key={key} {...rest}>
                      {header}
                    </Radio>
                  );
                case 'input':
                  return (
                    <Input key={key} {...rest}>
                      {header}
                    </Input>
                  );
                case 'checkmark':
                  return (
                    <Checkbox key={key} {...rest}>
                      {header}
                    </Checkbox>
                  );
                default:
                  throw new Error('Invalid JSON');
              }
            })}
          </PillExtension>
        </PillMain>
      </Provider>
    </Wrapper>
  );
};

export default Searchbar;
