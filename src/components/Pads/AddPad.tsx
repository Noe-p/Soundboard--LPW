import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, font, general, position } from '../../../appStyle';

interface AddPadProps extends PressableProps {}

export function AddPad(props: AddPadProps) {
  return (
    <Pressable {...props} style={[position.columnCenter, style.container]}>
      <Text style={[font.h3, font.white]}>
        <Ionicons name='add-outline' size={50} color={colors.white} />
      </Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.purpleLight,
    borderColor: colors.purple,
    borderWidth: 1,
    borderRadius: general.borderRadius,
    margin: 10,
    padding: 10,
    height: 150,
    width: 150,
  },
});
