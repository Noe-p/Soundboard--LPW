import { Recording } from 'expo-av/build/Audio';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, position } from '../../appStyle';
import { PageModal } from '../components';
import {
  startRecording,
  stopRecording,
  uploadSound,
} from '../service/expoAudio';
import { SoundType } from '../Types';
import { EditSound } from './EditSound';

interface RecordProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

//Cette Vue correspond à l'enregistrement d'un son
//Quand un son est enregistré, on ouvre la modale pour l'éditer et ensuite l'ajouter
export function Record(props: RecordProps) {
  const { modalVisible, setModalVisible } = props;

  //Open Modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [recording, setRecording] = useState<Recording>();
  const [userSound, setUserSound] = useState<SoundType>();

  async function onStopRecording() {
    if (recording) {
      const getUri = await stopRecording(recording);
      if (getUri) {
        setRecording(undefined); //Si on veut enregistrer un nouveau son, on doit réinitialiser la variable
        const sound = await uploadSound(getUri);
        if (sound) {
          await sound.playAsync(); //Curieusiement on est obligé de lancer le son au moins une fois pour récupérer ses infos
          sound.setOnPlaybackStatusUpdate(async (data) => {
            if (data.isLoaded) {
              if (data.durationMillis) {
                await sound.pauseAsync(); //On stop directement le son, et on récupère ses infos
                const userSound: SoundType = {
                  id: '_' + Math.random().toString(36),
                  title: 'Enregistrement',
                  duration: data.durationMillis,
                  tags: ['Enregistrement'],
                  uri: getUri,
                  initValue: 0,
                  endValue: data.durationMillis,
                  volume: 1,
                };
                setUserSound(userSound);
                setEditModalVisible(true); //On ouvre la modale d'éditage
              }
            }
          });
        }
      }
    }
  }

  return (
    <PageModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      title='Enregistrer'
    >
      <View style={[position.columnCenter, style.butonsContainer]}>
        {recording ? (
          <Pressable style={[style.recordButton]} onPress={onStopRecording}>
            <View style={[style.recordIcon, style.stopIcon]} />
          </Pressable>
        ) : (
          <Pressable
            style={[style.recordButton]}
            onPress={async () => setRecording(await startRecording())}
          >
            <View style={[style.recordIcon]} />
          </Pressable>
        )}
      </View>

      {userSound ? (
        <EditSound
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          userSound={userSound}
          setUserSound={setUserSound}
          closeLastModal={setModalVisible}
        />
      ) : (
        <></>
      )}
    </PageModal>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.lightDark,
  },
  butonsContainer: {
    height: '80%',
  },
  recordButton: {
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 102,
    height: 102,
  },
  recordIcon: {
    width: 90,
    height: 90,
    backgroundColor: colors.red,
    borderRadius: 50,
  },
  stopIcon: {
    borderRadius: 4,
    width: 60,
    height: 60,
  },
});
