/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ipcRenderer } from 'electron';

import $ from '../../styles/global';
import IPC from '../../constants/ipcActions.json';
import data from './data.json';
import { addKeys } from '../../utils';
import { SearchState } from '../../reducers/types';

import Chevron from '../Chevron';
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

          <SearchButton
            onClick={() => {
              // eslint-disable-next-line promise/catch-or-return
              ipcRenderer
                .invoke(IPC.DB.SEARCH, {
                  keyword: searchText,
                  ...searchOptions
                })
                .then(res => console.log(res));
            }}
            extend={isExtended}
          >
            <FontAwesomeIcon
              icon={
                // eslint-disable-next-line valid-typeof
                typeof searchOptions !== undefined && searchOptions.isTextSearch
                  ? 'search'
                  : 'search-location'
              }
            />
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
