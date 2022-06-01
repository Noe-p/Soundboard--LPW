import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { colors } from '../../appStyle';
import { PageModal, SongCard } from '../components';
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

  return (
    <PageModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      title='Bibliothèque'
      animation
      open={setImportModalVisible}
    >
      <FlatList
        data={userSoundList}
        renderItem={({ item }) => (
          <SongCard song={item}>
            <Pressable onPress={() => openActionsOnUserSound(item)}>
              <Ionicons
                name={'ellipsis-horizontal'}
                style={{ color: colors.purple }}
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
