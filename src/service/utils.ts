import { SoundType } from './../Types/SoundType';

export function isElementExist(
  sound: SoundType,
  soundList: SoundType[]
): boolean {
  let exist = false;
  soundList.map((soundBoard: SoundType) => {
    if (soundBoard.id === sound.id && !exist) exist = true;
  });
  return exist;
}
