import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { colors, position } from '../../appStyle';
import { Input, PageModal, SongCard } from '../components';
import {
  removeSound_SoundBoard,
  soundBoardSelector,
} from '../redux/soundBoardSlice';
import { removeSound, soundSelector } from '../redux/userSoundsSlice';
import { getSongsByName } from '../service/freeSoundApi';
import { isElementExist } from '../service/utils';
import { SoundType } from '../types';
import { EditSound } from './EditSound';

interface SearchFreeSoundProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

//Cette Vue Correspond à la recherche FreeSound
//Si un musique éxiste déjà dans la bibliothèque, on peut la supprimer depuis cette vue.
//Quand on ajoute un son, on ouvre la modale pour l'éditer et ensuite l'ajouter
export function SearchFreeSound(props: SearchFreeSoundProps) {
  const { modalVisible, setModalVisible } = props;
  const [text, setText] = useState('');
  const [songList, setsongList] = useState<SoundType[]>([]);
  const [userSound, setUserSound] = useState<SoundType>();

  //open Modal
  const [editModalVisible, setEditModalVisible] = useState(false);

  //Redux
  const dispatch = useDispatch();
  const userSongList: SoundType[] = useSelector(soundSelector).sound;
  const soundBoardList: SoundType[] =
    useSelector(soundBoardSelector).soundBoard;

  const fetchData = async () => {
    let res: SoundType[] = [];
    if (text) {
      try {
        res = await getSongsByName(text);
      } catch (error) {
        console.log(error);
      }
    }
    setsongList(res);
  };

  function openEditModal(newSound: SoundType) {
    setUserSound(newSound);
    setEditModalVisible(true);
  }

  function removeUserSound(sound: SoundType) {
    if (isElementExist(sound, soundBoardList)) {
      dispatch(removeSound_SoundBoard(sound));
    }
    dispatch(removeSound(sound));
    setModalVisible(false);
  }

  return (
    <PageModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      title='FreeSound'
    >
      <View style={[position.row, style.searchInput]}>
        <Input
          value={text}
          onChangeText={setText}
          style={{ flex: 1, marginRight: 10 }}
          placeholder={'Artistes, titres ou podcasts'}
          returnKeyType='search'
          onSubmitEditing={fetchData}
        />
        <Pressable onPress={fetchData}>
          <Ionicons
            name={'search-outline'}
            style={{ color: colors.softBlue }}
            size={40}
          />
        </Pressable>
      </View>
      <FlatList
        data={songList}
        renderItem={({ item }) => (
          <SongCard song={item} text={text}>
            <Pressable
              onPress={() =>
                isElementExist(item, userSongList)
                  ? removeUserSound(item)
                  : openEditModal(item)
              }
            >
              <Ionicons
                name={
                  isElementExist(item, userSongList)
                    ? 'trash-outline'
                    : 'add-circle-outline'
                }
                style={{ color: colors.softBlue }}
                size={30}
              />
            </Pressable>
          </SongCard>
        )}
        keyExtractor={(item) => item.id}
        style={{
          paddingTop: 10,
        }}
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
    </PageModal>
  );
}

const style = StyleSheet.create({
  searchInput: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
