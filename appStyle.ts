import { StyleSheet } from 'react-native';

export const colors = {
  dark: 'rgb(38, 43, 49)',
  lightDark: 'rgb(55,62,71)',
  green: 'rgb(110,235,131)',
  lightGreen: 'rgba(110,235,131,0.2)',
  red: 'rgb(250,0,0)',
  lightRed: 'rgba(250,0,0, 0.2)',
  orange: '#FF8552',
  rose: '#CB9CF2',
  white: 'white',
  blue: 'rgb(0,122,255)',
  grey: 'grey',
  purple: '#8547F8',
  purpleLight: 'rgba(133, 71, 248, 0.2)',
};

export const general = {
  borderRadius: 5,
  bigBorderRadius: 10,
  fullBorderRadius: '50%',
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
};

export const position = StyleSheet.create({
  columnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  rowCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rowSpace: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export const font = StyleSheet.create({
  h1: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 37,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
  },
  text: {
    fontSize: 16,
  },
  desc: {
    fontSize: 13,
    color: colors.grey,
  },
  white: {
    color: colors.white,
  },
  blue: {
    color: colors.blue,
  },
  bold: {
    fontWeight: 'bold',
  },
});
