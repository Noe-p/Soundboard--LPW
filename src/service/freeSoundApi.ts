import { SoundType } from '../types';

const baseUrl = 'https://freesound.org/apiv2/';
const apiKey = '3lgFjuAqUf8NshX7UPLrFwTxEztJhILz5t46cv5U';
const uri = {
  name: 'search/text',
  id: 'sounds/',
};

const createSearchRequest = (obj: any) => {
  return (
    '/?' +
    Object.keys(obj)
      .map((k) => k + '=' + obj[k].toLowerCase().replace(' ', '+'))
      .join('&') +
    '&token=' +
    apiKey
  );
};

const transformSong = (song: any): SoundType => {
  return {
    id: song.id,
    title: song.name,
    duration: song.duration * 1000,
    tags: [...song.tags, 'FreeSound'],
    uri: song.previews['preview-hq-mp3'],
    initValue: 0,
    endValue: song.duration * 1000,
    volume: 1,
  };
};

export const getSongsByName = async (
  title: string
): Promise<SoundType[] | []> => {
  try {
    let res = await fetch(
      baseUrl +
        uri.name +
        createSearchRequest({
          query: title,
          format: 'json',
        })
    );
    const json = await res.json();
    const idList = json.results.map((song: any) => song.id);
    const soundList = await Promise.all(idList.map(getSongById));

    return soundList.filter((ele) => ele !== undefined);
  } catch (e) {
    console.log('Erreur', e);
    return [];
  }
};

const getSongById = async (id: number): Promise<SoundType | undefined> => {
  try {
    let res = await fetch(
      baseUrl +
        uri.id +
        id +
        createSearchRequest({
          format: 'json',
        })
    );
    const json = await res.json();
    return transformSong(json);
  } catch (e) {
    console.log('Erreur', e);
    return undefined;
  }
};
