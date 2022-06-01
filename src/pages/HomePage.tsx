import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors, position } from '../../appStyle';
import { AddPad, Pad } from '../components';
import { soundBoardSelector } from '../redux/soundBoardSlice';
import { playSound, uploadSound } from '../service/expoAudio';
import { SoundType } from '../Types';
import { EditSound } from './EditSound';
import { UserSounds } from './UserSounds';

//Cette View Correspond à la vue pricipale avec les pads,
//Le dernier pad sert sert à l'importation d'un nouveau son
//Un long clique sur un pad permet de l'éditer
export function HomePage() {
  //Open Modals
  const [UserSoundsVisible, setUserSoundsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  //Redux
  const songList: SoundType[] = useSelector(soundBoardSelector).soundBoard;
  const [userSound, setUserSound] = useState<SoundType>();

  async function onPressPlay(song: SoundType) {
    const sound = await uploadSound(song.uri);
    if (sound) {
      playSound(sound, song.initValue, song.volume, song.endValue);
      setUserSound(song);
    }
  }

  function openEditModal(sound: SoundType) {
    setUserSound(sound);
    setEditModalVisible(true);
  }

  return (
    <View style={[style.container]}>
      <View style={[position.rowCenter, style.padContainer]}>
        {songList.map((song) => (
          <Pad
            onPress={() => onPressPlay(song)}
            onLongPress={() => openEditModal(song)}
            key={song.id}
            song={song}
          />
        ))}
        <AddPad onPress={() => setUserSoundsVisible(true)} />
      </View>
      <UserSounds
        modalVisible={UserSoundsVisible}
        setModalVisible={setUserSoundsVisible}
      />
      {userSound ? (
        <EditSound
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          userSound={userSound}
          removeButton
          setUserSound={setUserSound}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.lightDark,
    paddingTop: 30,
    height: '100%',
  },
  padContainer: {
    marginHorizontal: 10,
    marginVertical: 30,
    flexWrap: 'wrap',
  },
});
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
