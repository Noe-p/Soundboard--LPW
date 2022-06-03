import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors, font, general, position } from '../../../appStyle';

interface MultipleBottomButtonProps {
  buttonList: Button[];
  closeModal: (visible: boolean) => void;
}

interface Button {
  label: string;
  icon: string;
  action: () => void;
}

export function MultipleBottomButton(
  props: MultipleBottomButtonProps
): JSX.Element {
  const { buttonList, closeModal } = props;
  const firstEle = buttonList.shift();

  return (
    <View style={[style.container, position.columnCenter]}>
      <Pressable
        onPress={() => firstEle?.action()}
        style={[
          style.button,
          position.row,
          style.topButton,
          general.borderBottom,
        ]}
      >
        <Icon
          type='material'
          name={firstEle?.icon}
          color={colors.softBlue}
          tvParallaxProperties
        />
        <Text style={[style.buttonText, font.h3]}>{firstEle?.label}</Text>
      </Pressable>
      {buttonList.map((button: Button) => (
        <Pressable
          key={button.label}
          onPress={() => button.action()}
          style={[style.button, position.row, general.borderBottom]}
        >
          <Icon
            type='material-community'
            name={button.icon}
            color={colors.softBlue}
            tvParallaxProperties
          />
          <Text style={[style.buttonText, font.h3]}>{button.label}</Text>
        </Pressable>
      ))}
      <Pressable
        onPress={() => closeModal(false)}
        style={[style.button, style.submit]}
      >
        <Text style={[style.buttonText, font.h3, { color: colors.yellow }]}>
          Annuler
        </Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  button: {
    backgroundColor: colors.dark,
    width: '95%',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    color: colors.softBlue,
  },
  topButton: {
    borderTopLeftRadius: general.bigBorderRadius,
    borderTopRightRadius: general.bigBorderRadius,
  },
  bottomButton: {
    borderBottomLeftRadius: general.bigBorderRadius,
    borderBottomRightRadius: general.bigBorderRadius,
  },
  submit: {
    marginTop: 5,
    borderRadius: general.bigBorderRadius,
  },
});
