import { Sound } from 'expo-av/build/Audio';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, font, position } from '../../../appStyle';
import { playSound, uploadSound } from '../../service/expoAudio';
import { SoundType } from '../../types';

interface SongCardProps {
  song: SoundType;
  text?: string;
  children?: JSX.Element[] | JSX.Element;
}
export const SongCard = (props: SongCardProps) => {
  const { song, text, children } = props;

  const [sound, setSound] = useState<Sound>();
  const [isPause, setIsPause] = useState(true);

  async function onPressPlay() {
    const sound = await uploadSound(song.uri);
    if (sound) {
      setSound(sound);
      playSound(sound, song.initValue, song.volume, song.endValue, setIsPause);
      setIsPause(false);
    }
  }

  async function onPressPause() {
    if (sound) {
      await sound.pauseAsync();
      setIsPause(true);
    }
  }

  return (
    <Pressable style={[style.container, position.rowCenter]}>
      {isPause ? (
        <Ionicons
          onPress={onPressPlay}
          name={'play'}
          size={30}
          style={{ color: colors.purple }}
        />
      ) : (
        <Ionicons
          onPress={onPressPause}
          name={'pause'}
          size={30}
          style={{ color: colors.purple }}
        />
      )}

      <View style={style.containerTextSongCard}>
        <Text style={[font.text, font.bold, font.white]}>{song.title}</Text>
        <View style={[position.row]}>
          {song?.tags
            ?.map((tag) => (
              <Text
                key={tag}
                style={[
                  style.tags,
                  text?.toLowerCase() == tag.toLowerCase()
                    ? { opacity: 1 }
                    : { opacity: 0.5 },
                ]}
              >
                {tag}
              </Text>
            ))
            .slice(0, 3)}
        </View>
      </View>
      {children}
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  containerTextSongCard: {
    flex: 1,
    paddingLeft: 10,
  },
  tags: {
    borderWidth: 1,
    marginRight: 5,
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: colors.green,
    color: colors.white,
    backgroundColor: colors.lightGreen,
    overflow: 'hidden',
    textAlign: 'center',
    minWidth: 70,
  },
});
