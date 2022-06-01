import { Audio, AVPlaybackStatus } from 'expo-av';
import { Recording, Sound } from 'expo-av/build/Audio';

export async function startRecording(): Promise<Recording | undefined> {
  try {
    //Permissions
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    //Starting recording..
    const record = new Audio.Recording();
    await record.prepareToRecordAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );
    await record.startAsync();

    return record;
  } catch (err) {
    console.error('Failed to start recording', err);
  }
}

export async function stopRecording(
  recording: Recording
): Promise<string | null> {
  await recording.stopAndUnloadAsync();
  return recording.getURI();
}

export async function uploadSound(uri: string): Promise<Sound | undefined> {
  try {
    //Upload Sound
    const { sound } = await Audio.Sound.createAsync({
      uri: uri,
    });
    sound.setVolumeAsync(1);
    return sound;
  } catch (err) {
    console.error('Unloading SoundRecord', err);
  }
  return undefined;
}

export async function getSoundStatus(
  sound?: Sound
): Promise<AVPlaybackStatus | undefined> {
  return sound?.getStatusAsync();
}

export async function playSound(
  sound: Sound,
  initValue: number = 0,
  volume: number = 1,
  endValue: number,
  setIsPause?: (value: boolean) => void
) {
  sound.setVolumeAsync(volume);
  await sound.setPositionAsync(initValue);
  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate(async (data) => {
    if (data.isLoaded) {
      if (data.positionMillis >= endValue) {
        await sound.pauseAsync();
        if (setIsPause) setIsPause(true);
      }
    }
  });
}
