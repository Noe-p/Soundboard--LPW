import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { Input } from './Input';
interface SearchInputProps extends TextInputProps {}

export function SearchInput(props: SearchInputProps): JSX.Element {
  const { style } = props;
  return (
    <Input
      icon={'search'}
      {...props}
      style={[searchInputStyle.inputSearch, style]}
    />
  );
}

const searchInputStyle = StyleSheet.create({
  inputSearch: {},
});
