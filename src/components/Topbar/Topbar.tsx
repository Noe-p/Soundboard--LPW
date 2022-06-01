import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, font, general, position } from '../../../appStyle';

interface TopbarProps {
  close: (visible: boolean) => void;
  title?: string;
  open?: (visible: boolean) => void;
}

export function Topbar(props: TopbarProps): JSX.Element {
  const { close, title, open } = props;

  return (
    <View style={[style.container, position.rowSpace]}>
      <Pressable onPress={() => close(false)}>
        <Text style={[font.h3, font.blue]}>Annuler</Text>
      </Pressable>
      <Text style={[font.h3, font.white, font.bold]}>{title}</Text>
      {open ? (
        <Pressable onPress={() => open(true)}>
          <Ionicons name='add-outline' size={30} color={colors.purple} />
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    borderTopLeftRadius: general.bigBorderRadius,
    borderTopRightRadius: general.bigBorderRadius,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
});
