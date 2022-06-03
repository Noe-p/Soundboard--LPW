import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { colors, position } from '../../appStyle';
import { Input, PageModal, SongCard } from '../components';
import { soundSelector } from '../redux/userSoundsSlice';
import { SoundType } from '../types';
import { ActionsOnUserSound } from './ActionsOnUserSound';
import { ChooseImport } from './ChooseImport';
import { EditSound } from './EditSound';
import { Record } from './Record';
import { SearchFreeSound } from './SearchFreeSound';

interface UserSoundsProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

//Cette vue correspond à la Bibliothèque de sons
//Depuis cette vue il est possible :
// - d'ajouter un nouveau son (ChooseImport).
// - D'écouter un son.
// - De supprimer, éditer, ajouter au soundBoard un son. (ActionOnUserSound)
export function UserSounds(props: UserSoundsProps) {
  const { modalVisible, setModalVisible } = props;
  const [userSound, setUserSound] = useState<SoundType>();

  //Open Modals
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [searchFreeSoundVisible, setSearchFreeSoundVisible] = useState(false);
  const [recordVisible, setRecordVisible] = useState(false);
  const [choiceVisible, setChoiceVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [text, setText] = useState('');

  //Redux
  const userSoundList: SoundType[] = useSelector(soundSelector).sound;

  function openEditUserSound() {
    setChoiceVisible(false);
    setEditModalVisible(true);
  }

  function openActionsOnUserSound(sound: SoundType) {
    setUserSound(sound);
    setChoiceVisible(true);
  }

  function filterSound(list: SoundType[]) {
    if (text) {
      const indexes: number[] = [];
      list.forEach((ele, i) => {
        ele.tags.forEach((tag) => {
          if (tag.toLowerCase() == text.toLowerCase()) indexes.push(i);
        });
      });
      return indexes.map((i) => list[i]);
    } else {
      return list;
    }
  }

  return (
    <PageModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      title='Bibliothèque'
      animation
      open={setImportModalVisible}
    >
      <View style={[position.row, style.searchInput]}>
        <Input
          value={text}
          onChangeText={setText}
          style={{ flex: 1, marginRight: 10 }}
          placeholder={'Artistes, titres ou podcasts'}
        />
      </View>
      <FlatList
        data={filterSound(userSoundList)}
        renderItem={({ item }) => (
          <SongCard song={item} text={text}>
            <Pressable onPress={() => openActionsOnUserSound(item)}>
              <Ionicons
                name={'ellipsis-horizontal'}
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
      <ChooseImport
        modalVisible={importModalVisible}
        setModalVisible={setImportModalVisible}
        openFreeSound={setSearchFreeSoundVisible}
        openRecord={setRecordVisible}
      />
      <SearchFreeSound
        modalVisible={searchFreeSoundVisible}
        setModalVisible={setSearchFreeSoundVisible}
      />
      <Record modalVisible={recordVisible} setModalVisible={setRecordVisible} />

      {userSound ? (
        <>
          <ActionsOnUserSound
            modalVisible={choiceVisible}
            setModalVisible={setChoiceVisible}
            editSound={openEditUserSound}
            userSound={userSound}
            closeUserSoundModal={setModalVisible}
          />
          <EditSound
            modalVisible={editModalVisible}
            setModalVisible={setEditModalVisible}
            userSound={userSound}
            setUserSound={setUserSound}
          />
        </>
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
