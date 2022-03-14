import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMAGE_BASE_URL} from '../constants/api';
import {cardShadowStyle} from '../constants/styling';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {CastMember} from '../models/CastMember';

interface MovieMemberCardProps {
  member: CastMember;
}

const MovieMemberCard: FC<MovieMemberCardProps> = ({member}) => {
  const {surfaceVariantStyle, foregroundStyle} = useColorTheme();

  return (
    <View
      style={[styles.cardContainer, surfaceVariantStyle, cardShadowStyle]}
      key={member.cast_id}>
      <Image
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: IMAGE_BASE_URL + member.profile_path,
        }}
      />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={[foregroundStyle, {flexWrap: 'wrap'}]}>
          {member.name}
        </Text>
        <Text
          numberOfLines={1}
          style={[{fontStyle: 'italic', flexWrap: 'wrap'}, foregroundStyle]}>
          {' '}
          as{' '}
        </Text>
        <Text
          numberOfLines={1}
          style={[foregroundStyle, {flex: 1, flexWrap: 'wrap'}]}>
          {member.character}
        </Text>
      </View>
    </View>
  );
};

export default MovieMemberCard;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,

    marginBottom: 10,
    height: 60,
    borderRadius: 5,
  },
  image: {
    width: 40,
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
  },
});