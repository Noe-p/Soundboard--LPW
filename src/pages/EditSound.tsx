import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Slider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { colors, font, general, position } from '../../appStyle';
import { Input, PageModal, Tags, TrimmerSound } from '../components';
import {
  removeSound_SoundBoard,
  soundBoardSelector,
  updateSound_SounBoard,
} from '../redux/soundBoardSlice';
import { addSound, soundSelector, updateSound } from '../redux/userSoundsSlice';
import { isElementExist } from '../service/utils';
import { SoundType } from '../Types';

interface EditSoundProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  userSound: SoundType;
  closeLastModal?: (visible: boolean) => void;
  removeButton?: boolean;
  setUserSound?: (ele: undefined) => void;
}

//Cette vue permet d'éditer un nouveau son mais également un son déjà présent
//Fonctionnalités : Changer le titre, Ajouter/Supprimer un tag, modifier le volume, Rogner le son
//Quand on ouvre cette vue depuis le soundBoard, Un bouton permet d'enlever le son du sounBoard
export function EditSound(props: EditSoundProps) {
  const {
    modalVisible,
    setModalVisible,
    userSound,
    closeLastModal,
    removeButton,
    setUserSound,
  } = props;

  //Redux
  const soundBoardList: SoundType[] =
    useSelector(soundBoardSelector).soundBoard;
  const userSongList: SoundType[] = useSelector(soundSelector).sound;
  const dispatch = useDispatch();

  const [title, setTitle] = useState(userSound.title);
  const [tagsList, setTagsList] = useState<string[]>(userSound.tags);
  const [initValue, setinitValue] = useState(userSound.initValue);
  const [endValue, setEndValue] = useState(userSound.endValue);
  const [newSound, setNewSound] = useState<SoundType>();
  const [volume, setVolume] = useState(userSound.volume);

  useEffect(() => {
    setNewSound({
      ...userSound,
      title: title,
      tags: tagsList,
      initValue: initValue,
      endValue: endValue,
      volume: volume,
    });
  }, [title, tagsList, initValue, endValue, volume]);

  function updateUserSound() {
    if (isElementExist(userSound, soundBoardList)) {
      dispatch(updateSound_SounBoard(newSound));
    }
    dispatch(updateSound(newSound));
    setModalVisible(false);
    if (closeLastModal) closeLastModal(false);
    if (setUserSound) setUserSound(undefined);
  }

  function addUSerSound() {
    dispatch(addSound({ sound: newSound }));
    setModalVisible(false);
    if (closeLastModal) closeLastModal(false);
    if (setUserSound) setUserSound(undefined);
  }

  function removeSoundOfSoundBoard() {
    dispatch(removeSound_SoundBoard(newSound));
    setModalVisible(false);
    if (setUserSound) setUserSound(undefined);
  }

  return (
    <PageModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      title='Éditer'
    >
      <ScrollView>
        <View style={[style.inputsContainer]}>
          <View style={[style.inputContainer]}>
            <Text style={[font.h3, style.label]}>Entrer un titre</Text>
            <Input placeholder='Titre' value={title} onChangeText={setTitle} />
          </View>

          <View style={[style.inputContainer, general.borderTop]}>
            <Text style={[font.h3, style.label]}>Entrer des tags</Text>
            <Tags tagsList={tagsList} setTagsList={setTagsList} />
          </View>

          <View style={[style.inputContainer]}>
            <Text style={[font.h3, style.label]}>Changer le volume</Text>
            <Slider
              minimumValue={0}
              maximumValue={1}
              onValueChange={setVolume}
              value={volume}
              thumbTintColor={colors.purple}
              trackStyle={{
                borderColor: 'red',
              }}
            />
          </View>

          <View style={[style.inputContainer, general.borderTop]}>
            <Text style={[font.h3, style.label]}>Rogner le son</Text>
            <TrimmerSound
              userSound={userSound}
              setInitValue={setinitValue}
              setEndValue={setEndValue}
              soundVolume={volume}
            />
          </View>

          <View style={[position.columnCenter, general.borderTop]}>
            <Pressable
              style={[style.submitButton]}
              onPress={
                isElementExist(userSound, userSongList)
                  ? updateUserSound
                  : addUSerSound
              }
            >
              <Text style={[font.h3, font.bold, { color: colors.white }]}>
                {isElementExist(userSound, userSongList)
                  ? 'Modifier'
                  : 'Ajouter'}
              </Text>
            </Pressable>

            {removeButton ? (
              <Pressable
                style={[
                  style.submitButton,
                  position.row,
                  {
                    borderColor: colors.red,
                    backgroundColor: colors.lightRed,
                    marginTop: -50,
                  },
                ]}
                onPress={removeSoundOfSoundBoard}
              >
                <Ionicons
                  name={'trash'}
                  style={{ marginRight: 10 }}
                  color={colors.white}
                  size={20}
                />
                <Text style={[font.text, font.bold, { color: colors.white }]}>
                  Supprimer du SoundBoard
                </Text>
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </PageModal>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
    backgroundColor: colors.lightDark,
    borderTopLeftRadius: general.bigBorderRadius,
    borderTopRightRadius: general.bigBorderRadius,
  },
  inputsContainer: {
    paddingHorizontal: 10,
  },
  label: { color: colors.white, marginBottom: 5 },
  inputContainer: { paddingVertical: 20 },
  submitButton: {
    backgroundColor: colors.purpleLight,
    borderWidth: 1,
    borderColor: colors.purple,
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 50,
    marginTop: 50,
    marginBottom: 100,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
