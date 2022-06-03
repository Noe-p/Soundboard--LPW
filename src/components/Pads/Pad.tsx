import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import { colors, font, general, position } from '../../../appStyle';
import { SoundType } from '../../Types';

interface PadProps extends PressableProps {
  song: SoundType;
}

export function Pad(props: PadProps) {
  const { song } = props;
  return (
    <Pressable {...props} style={[position.columnCenter, style.container]}>
      <Text style={[font.h3, font.white]}>{song.title}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.yellowLight,
    borderColor: colors.yellow,
    borderWidth: 1,
    borderRadius: general.borderRadius,
    margin: 10,
    padding: 10,
    height: 150,
    width: 150,
  },
});
