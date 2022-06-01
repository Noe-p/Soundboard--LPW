import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { colors, general } from '../../../appStyle';
import { Topbar } from '../Topbar';

interface PageModalProps {
  children?: JSX.Element[] | JSX.Element;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  title: string;
  animation?: boolean;
  open?: (visible: boolean) => void;
}

export function PageModal(props: PageModalProps): JSX.Element {
  const { children, modalVisible, setModalVisible, title, animation, open } =
    props;

  return (
    <Modal
      animationType={animation ? 'slide' : 'none'}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View style={style.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={[style.container]}>
        <Topbar
          title={title}
          close={setModalVisible}
          open={open ? open : undefined}
        />
        {children}
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightDark,
    borderTopLeftRadius: general.bigBorderRadius,
    borderTopRightRadius: general.bigBorderRadius,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
