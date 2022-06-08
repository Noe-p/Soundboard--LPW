import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MultipleBottomButton } from '../components';
import {
  addSound_SoundBoard,
  removeSound_SoundBoard,
  soundBoardSelector,
} from '../redux/soundBoardSlice';
import { removeSound } from '../redux/userSoundsSlice';
import { isElementExist } from '../service/utils';
import { SoundType } from '../Types';

interface ActionsOnUserSoundProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  editSound: () => void;
  userSound: SoundType;
  closeUserSoundModal: (visible: boolean) => void;
}

//Cette Vue permet de faire plusieurs action sur un son :
// - Supprimer un son
// - Ajouter un son au soundBoard
// - Éditer un son
export function ActionsOnUserSound(
  props: ActionsOnUserSoundProps
): JSX.Element {
  const {
    closeUserSoundModal,
    modalVisible,
    setModalVisible,
    editSound,
    userSound,
  } = props;

  //Redux
  const dispatch = useDispatch();
  const soundBoardList: SoundType[] =
    useSelector(soundBoardSelector).soundBoard;

  function removeUserSound() {
    if (isElementExist(userSound, soundBoardList)) {
      dispatch(removeSound_SoundBoard(userSound));
    }
    dispatch(removeSound(userSound));
    setModalVisible(false);
  }

  function addSoundOnSoundBoard() {
    if (userSound) {
      if (!isElementExist(userSound, soundBoardList)) {
        dispatch(addSound_SoundBoard({ soundBoard: { ...userSound } }));
        setModalVisible(false);
        closeUserSoundModal(false);
      }
    }
  }

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View style={style.modalOverlay} />
      </TouchableWithoutFeedback>
      <MultipleBottomButton
        closeModal={setModalVisible}
        buttonList={[
          {
            label: 'Ajouter au SoundBoard',
            icon: 'library-add',
            action: addSoundOnSoundBoard,
          },
          { label: 'Éditer', icon: 'square-edit-outline', action: editSound },
          {
            label: 'Supprimer de la bibliothèque',
            icon: 'trash-can-outline',
            action: removeUserSound,
          },
        ]}
      />
    </Modal>
  );
}

const style = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
