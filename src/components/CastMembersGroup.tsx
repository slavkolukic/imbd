import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Cast} from '../models/Cast';
import InfoCard from './InfoCard';

interface CastMembersGroupProps {
  castMembers: Cast[];
}

const CastMembersGroup: FC<CastMembersGroupProps> = ({castMembers}) => {
  const {accentVariantColorForegroundStyle, foregroundVariantStyle} =
    useColorTheme();

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={[{fontSize: 16}, foregroundVariantStyle]}>
          Cast ({castMembers.length})
        </Text>
        <Text style={[accentVariantColorForegroundStyle]}>View All</Text>
      </View>
      {castMembers.slice(0, 8).map((castMember: Cast) => {
        return (
          <InfoCard
            key={castMember.cast_id}
            name={castMember.name}
            picture={castMember.profile_path}
            role={castMember.character}
          />
        );
      })}
    </>
  );
};

export default CastMembersGroup;

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
});
