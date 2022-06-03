import { Sound } from 'expo-av/build/Audio';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Trimmer from 'react-native-trimmer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, font, position } from '../../../appStyle';
import { playSound, uploadSound } from '../../service/expoAudio';
import { SoundType } from '../../Types';

interface TrimmerSoundProps {
  userSound: SoundType;
  setInitValue: (value: number) => void;
  setEndValue: (value: number) => void;
  soundVolume: number;
}

//Ce component permet de rogner un son
export function TrimmerSound(props: TrimmerSoundProps): JSX.Element {
  const { userSound, setInitValue, setEndValue, soundVolume } = props;

  const maxTrimDuration = userSound.duration;
  const minimumTrimDuration = 10;
  const totalDuration = userSound.duration;
  const initialTrimmerLeftPosition = userSound.initValue;
  const initialTrimmerRightPosition = userSound.endValue;
  const scrubInterval = 10;
  const initScrubberPosition = userSound.initValue;

  const [sound, setSound] = useState<Sound>();
  const [playing, setPlaying] = useState(false);
  const [trimmerLeft, setTrimmerLeft] = useState(initialTrimmerLeftPosition);
  const [trimmerRight, setTrimmerRight] = useState(initialTrimmerRightPosition);
  const [scrubberPosition, setScrubberPosition] =
    useState(initScrubberPosition);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  async function playScrubber() {
    const sound = await uploadSound(userSound.uri);
    if (sound) {
      playSound(sound, scrubberPosition, soundVolume, userSound.endValue);
      setPlaying(true);
      setSound(sound);
    }
  }

  useEffect(() => {
    if (playing) {
      setScrubberPosition(scrubberPosition + scrubInterval);
      const newTimer = setInterval(() => {
        setTimer(newTimer);
        clearInterval(timer);
      }, scrubInterval);
      if (scrubberPosition >= trimmerRight) {
        pauseScrubber();
        setScrubberPosition(trimmerLeft);
      }
    }
  }, [playing, timer]);

  async function pauseScrubber() {
    clearInterval(timer);
    setPlaying(false);
    await sound?.pauseAsync();
  }

  const onHandleChange = (position: {
    leftPosition: number;
    rightPosition: number;
  }) => {
    setTrimmerLeft(position.leftPosition);
    setTrimmerRight(position.rightPosition);
    setEndValue(position.rightPosition);
    setInitValue(position.leftPosition);
    if (position.leftPosition >= scrubberPosition) {
      setScrubberPosition(position.leftPosition);
    }
  };

  const onScrubbingComplete = (newValue: number) => {
    setPlaying(false);
    setScrubberPosition(newValue);
  };

  return (
    <>
      <Trimmer
        onHandleChange={onHandleChange}
        totalDuration={totalDuration}
        trimmerLeftHandlePosition={trimmerLeft}
        trimmerRightHandlePosition={trimmerRight}
        minimumTrimDuration={minimumTrimDuration}
        maxTrimDuration={maxTrimDuration}
        tintColor={colors.yellow}
        markerColor={colors.grey}
        trackBackgroundColor={colors.softBlueLight}
        trackBorderColor={colors.softBlue}
        scrubberColor={colors.white}
        scrubberPosition={scrubberPosition}
        onScrubbingComplete={onScrubbingComplete}
      />

      <View style={[position.columnCenter]}>
        <View style={[position.rowSpace, { width: '80%' }]}>
          <Text style={[font.white, font.h3]}>
            {(trimmerLeft / 1000).toFixed(2)}
          </Text>
          <Text style={[font.white, font.h2, font.bold]}>
            {(scrubberPosition / 1000).toFixed(2)}
          </Text>
          <Text style={[font.white, font.h3]}>
            {(trimmerRight / 1000).toFixed(2)}
          </Text>
        </View>
        <Pressable
          style={[style.playPauseButton]}
          onPress={playing ? pauseScrubber : playScrubber}
        >
          <Ionicons
            name={playing ? 'pause' : 'play'}
            style={{ color: colors.white }}
            size={25}
          />
        </Pressable>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  playPauseButton: {
    backgroundColor: colors.yellowLight,
    borderWidth: 1,
    borderColor: colors.yellow,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 10,
  },
});
