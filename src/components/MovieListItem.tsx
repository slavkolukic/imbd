import React, {FC, memo, useCallback, useState} from 'react';
import {Alert, AlertButton, Image, StyleSheet, Text, View} from 'react-native';
import {IMAGE_BASE_URL} from '../constants/api';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import moment from 'moment';
import {cardShadowStyle} from '../constants/styling';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {Movie} from '../models';
import FadeInView from './FadeInView';
import {randomIntFromInterval} from '../utilities/misc';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import {AppRoute} from '../enums/routes';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from './LoadingOverlay';
import {composeDetailedMovie} from '../utilities/movies';
import {addToWatched, addToWatchlist} from '../store/actions/moviesActions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/reducers/rootReducer';

type RootScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.MOVIE
>;
interface MovieListItemProps {
  movie: Movie;
}

const MovieListItem: FC<MovieListItemProps> = ({movie}) => {
  const {
    colorTheme,
    surfaceVariantStyle,
    primaryColorForegroundStyle,
    foregroundStyle,
    accentVariantColorForegroundStyle,
  } = useColorTheme();

  const dispatch = useDispatch();

  const isInWatched = useSelector((state: RootState) =>
    state.movies.watched.some(e => e.id === movie.id),
  );
  const isInWatchist = useSelector((state: RootState) =>
    state.movies.watchlist.some(e => e.id === movie.id),
  );

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RootScreenProp>();

  const goToMovie = useCallback(async () => {
    setLoading(true);

    const detailedMovie = await composeDetailedMovie(movie.id);

    if (!detailedMovie) {
      setLoading(false);
      Alert.alert(
        'Network Error',
        'Failed to fetch movied details. Check your internet connection.',
      );
      return;
    }

    navigation.push(AppRoute.MOVIE, detailedMovie);
    setLoading(false);
  }, [movie]);

  const watchlistAlertButton: AlertButton = {
    text: isInWatchist ? 'Remove from watchlist' : 'Add to watchlist',
    onPress: () => dispatch(addToWatchlist(movie)),
  };

  const watchedAlertButton: AlertButton = {
    text: isInWatched ? 'Remove from watched' : 'Add to watched',
    onPress: () => dispatch(addToWatched(movie)),
  };

  const cancelAlertButton: AlertButton = {
    text: 'Cancel',
    style: 'destructive',
  };

  const showAlert = () => {
    Alert.alert(
      `${movie.title} (${moment(movie.release_date).year()})`,
      undefined,
      [watchlistAlertButton, watchedAlertButton, cancelAlertButton],
    );
  };

  return (
    <FadeInView
      onLongPress={showAlert}
      onPress={() => goToMovie()}
      activeOpacity={
        colorTheme.type === 'dark' ? ACTIVE_OPACITY_WEAK : ACTIVE_OPACITY_STRONG
      }
      duration={100 * randomIntFromInterval(5, 10)}
      offsetX={-200 * randomIntFromInterval(3, 6)}
      style={[styles.cardContainer, cardShadowStyle, surfaceVariantStyle]}>
      <Image
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: IMAGE_BASE_URL + movie.poster_path,
        }}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            style={[
              {fontSize: 15, flex: 1, marginRight: 5},
              primaryColorForegroundStyle,
            ]}>
            {movie.title}
          </Text>
          <Text numberOfLines={1} style={accentVariantColorForegroundStyle}>
            {moment(movie.release_date).year()}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={[{fontSize: 14}, foregroundStyle]} numberOfLines={3}>
            {movie.overview}
          </Text>
        </View>
      </View>
      {loading ? <LoadingOverlay /> : null}
    </FadeInView>
  );
};

export default memo(MovieListItem);

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,

    marginHorizontal: 20,
    marginTop: 10,
    height: 100,
    borderRadius: 5,
  },
  image: {
    width: 65,
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  detailsContainer: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',

    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: 4,
  },
});
