import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, position } from '../../../appStyle';
import { Input } from './Input';

interface TagsProps {
  tagsList: string[];
  setTagsList: (tags: string[]) => void;
}

export function Tags(props: TagsProps): JSX.Element {
  const { tagsList, setTagsList } = props;
  const [tag, setTag] = useState('');

  function addTag() {
    if (tag && !tagsList.includes(tag)) {
      setTagsList([...tagsList, tag]);
      setTag('');
    }
  }

  function removeTag(tag: string) {
    setTagsList(tagsList.filter((item: string) => item != tag));
  }

  return (
    <View style={[style.container]}>
      <View style={[position.row, { marginBottom: 5 }]}>
        <Input
          placeholder='Violon, Guitar, Voiture...'
          placeholderTextColor={colors.grey}
          value={tag}
          onChangeText={setTag}
          style={{ flex: 1 }}
          onSubmitEditing={addTag}
          returnKeyType='previous'
        />
        <Pressable
          style={[position.columnCenter, style.submitTag]}
          onPress={addTag}
        >
          <Ionicons
            name={'add-circle-outline'}
            style={{ color: colors.purple }}
            size={40}
          />
        </Pressable>
      </View>
      <View style={[position.row, { flexWrap: 'wrap' }]}>
        {tagsList.map((tag: string) => (
          <View style={[style.tags, position.rowCenter]} key={tag}>
            <Text
              style={{
                color: colors.white,
              }}
            >
              {tag}
            </Text>
            <Pressable onPress={() => removeTag(tag)}>
              <Ionicons
                name={'close-outline'}
                style={{
                  color: colors.white,
                  marginLeft: 5,
                }}
                size={20}
              />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {},
  submitTag: { marginLeft: 10 },
  tags: {
    borderWidth: 1,
    marginRight: 5,
    marginTop: 5,
    paddingVertical: 5,
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
