import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet, ListRenderItem, View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MiniHeader from '../components/MiniHeader';
import MovieCreditCard from '../components/MovieCreditCard';
import VerticalSpacing from '../components/VerticalSpacing';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {cardOnlyTopShadow} from '../constants/styling';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Cast} from '../models/Cast';
import {Crew} from '../models/Crew';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';

type FullCreditsScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.FULL_CREDITS
>;

const FullCreditsScreen: FC<FullCreditsScreenProps> = ({route, navigation}) => {
  const dataSource = route.params;
  const {surfaceStyle, colorTheme, primaryVariantColorForegroundStyle} =
    useColorTheme();

  const getRole = (credit: Cast | Crew): string => {
    if ('job' in credit) {
      return credit.job;
    }
    return credit.character;
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem: ListRenderItem<Cast | Crew> = ({item}) => (
    <MovieCreditCard
      key={item.credit_id}
      name={item.name}
      picture={item.profile_path}
      role={getRole(item)}
    />
  );

  const keyExtractor = (item: Cast | Crew) => {
    return item.credit_id + getRole(item);
  };

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="close"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );

  const headerMiddleElement: JSX.Element = (
    <Text
      numberOfLines={1}
      style={[{fontSize: 17}, primaryVariantColorForegroundStyle]}>
      Cast ({dataSource.length})
    </Text>
  );

  return (
    <View style={[styles.container, cardOnlyTopShadow, surfaceStyle]}>
      <MiniHeader
        middleElement={headerMiddleElement}
        leftButton={headerLeftButton}
      />
      <FlatList
        style={styles.list}
        data={dataSource as Array<Cast | Crew>}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={<VerticalSpacing spacing={60} />}
        ListHeaderComponent={<VerticalSpacing spacing={20} />}
      />
    </View>
  );
};

export default FullCreditsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',

    marginTop: 80,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  list: {
    paddingHorizontal: 20,
  },
});