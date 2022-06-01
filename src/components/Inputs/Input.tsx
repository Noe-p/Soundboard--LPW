import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { colors } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { font, position } from '../../../appStyle';

interface InputProps extends TextInputProps {
  icon?: string;
}

export function Input(props: InputProps): JSX.Element {
  const { icon, style } = props;
  return (
    <View style={[position.rowCenter, styleInput.container, style]}>
      {icon ? (
        <Ionicons
          style={styleInput.icon}
          name={icon}
          size={30}
          color={'black'}
        />
      ) : (
        <></>
      )}
      <TextInput
        {...props}
        placeholderTextColor={'black'}
        style={[styleInput.input, font.text]}
      />
    </View>
  );
}

const styleInput = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
  },
  input: {
    paddingLeft: 5,
    flex: 1,
  },
  icon: { height: 30 },
});
