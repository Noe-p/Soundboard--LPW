import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import getMP3Duration from 'react-native-get-mp3-duration';
import { colors, general } from '../../appStyle';
import { MultipleBottomButton } from '../components';
import { SoundType } from '../Types';
import { EditSound } from './EditSound';

interface ChooseImportProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  openFreeSound: (visible: boolean) => void;
  openRecord: (visible: boolean) => void;
}

// Cette View Permert de choisir les différents importation de sons possible. (FreeSound, Record)
// Elle gère également l'importation de fichiers locaux
export function ChooseImport(props: ChooseImportProps): JSX.Element {
  const { modalVisible, setModalVisible, openFreeSound, openRecord } = props;
  const [userSound, setUserSound] = useState<SoundType>();

  //Open Modal
  const [editModalVisible, setEditModalVisible] = useState(false);

  function onButtonClick(open: (e: boolean) => void) {
    open(true);
    setModalVisible(false);
  }

  async function pickFile() {
    const file = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
    const duration = await getMP3Duration(file.uri);
    const sound: SoundType = {
      id: '_' + Math.random().toString(36),
      title: file.name,
      duration: duration,
      tags: ['Local'],
      uri: file.uri,
      endValue: duration,
      initValue: 0,
      volume: 1,
    };
    setUserSound(sound);
    setEditModalVisible(true);
  }

  return (
    <Modal
      animationType='slide'
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
            label: 'Importer depuis les fichiers',
            icon: 'smartphone',
            action: pickFile,
          },
          {
            label: 'Importer depuis FreeSound',
            icon: 'web',
            action: () => onButtonClick(openFreeSound),
          },
          {
            label: 'Enregistrer',
            icon: 'record-circle-outline',
            action: () => onButtonClick(openRecord),
          },
        ]}
      />

      {userSound ? (
        <EditSound
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          userSound={userSound}
          closeLastModal={setModalVisible}
          setUserSound={setUserSound}
        />
      ) : (
        <></>
      )}
    </Modal>
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
