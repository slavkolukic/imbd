import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../../components/MainHeader';
import SettingsGroup from '../../components/SettingsGroup';
import {HEADER_ICON_SIZE} from '../../constants/dimensions';
import {AppRoute} from '../../enums/routes';
import {useColorTheme} from '../../hooks/styles/useColorTheme';
import {SettingsStackNavigatorParams} from '../../navigation/SettingsNavigator';
import RadioButton from '../../components/RadioButton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/reducers/rootReducer';
import {changeViewType} from '../../store/actions/settingsActions';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import {MovieViewTypes} from '../../enums/movieViewTypes';
import {useTranslation} from 'react-i18next';

type ConfigureMoviesScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.CONFIGURE_MOVIES
>;

const ConfigureMoviesScreen: FC<ConfigureMoviesScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const currentViewType = useSelector(
    (state: RootState) => state.settings.movieViewType,
  );

  const viewTypes: Array<MovieViewTypes> = [
    MovieViewTypes.CARDS,
    MovieViewTypes.GRID,
    MovieViewTypes.LIST,
  ];

  const {colorTheme, backgroundStyle} = useColorTheme();

  const goBack = () => {
    navigation.pop();
  };

  const mappedViewTypes = viewTypes.map((viewType, index) => {
    return (
      <RadioButton
        key={viewType}
        text={t(viewType)}
        index={index}
        isCurrentlyActive={viewType === currentViewType}
        onPressHandler={() => dispatch(changeViewType(viewType))}
      />
    );
  });

  const viewTypesGroup = (
    <RadioButtonGroup key={'view-type'} title={t('selectViewType') + ':'}>
      {mappedViewTypes}
    </RadioButtonGroup>
  );

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="arrow-back-sharp"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );
  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.screenContainer, backgroundStyle]}>
      <MainHeader leftButton={headerLeftButton} />
      <SettingsGroup
        title={t('configureMovies')}
        items={[viewTypesGroup]}
        hasBottomBorder={false}
      />
    </SafeAreaView>
  );
};

export default ConfigureMoviesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: '100%',
  },
});
