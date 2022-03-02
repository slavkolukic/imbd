import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
import {Button, ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../components/MainHeader';
import SettingsGroup from '../components/SettingsGroup';
import SettingsGroupItem from '../components/SettingsGroupItem';
import VerticalSpacing from '../components/VerticalSpacing';
import colors from '../constants/colors';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {SettingsItem} from '../models/SettingsItem';
import {SettingsStackNavigatorParams} from '../navigation/SettingsNavigator';
import {changeColorTheme} from '../store/actions/settingsActions';
import {RootState} from '../store/storeConfig';

type SettingsScreenProps = StackScreenProps<
  SettingsStackNavigatorParams,
  AppRoute.SETTINGS_HOME
>;

const SettingsScreen: FC<SettingsScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.settings.colorTheme);

  const generalSettingsItems: SettingsItem[] = [
    {settingName: 'Select theme', icon: 'color-palette'},
    {settingName: 'Configure beer', icon: 'beer'},
    {settingName: 'Saturn options', icon: 'planet'},
    {settingName: 'Pizza setup', icon: 'pizza'},
  ];

  const someOtherSettingsItems: SettingsItem[] = [
    {settingName: 'Upgrade car', icon: 'car-sport'},
    {settingName: 'Water setup', icon: 'water'},
    {settingName: 'Firebase setup', icon: 'logo-firebase'},
    {settingName: 'Play basketball', icon: 'basketball'},
    {settingName: 'Fly', icon: 'airplane'},
    {settingName: 'Phone settings', icon: 'phone-portrait'},
    {settingName: 'Megaphone settings', icon: 'megaphone'},
  ];

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  /**
   *
   * setting names are used as key in list so they should be unique
   */
  const mapSettingsListToUI = (settingsList: SettingsItem[]) => {
    return settingsList.map((settingsItem: SettingsItem, index: number) => (
      <SettingsGroupItem
        key={settingsItem.settingName}
        settingName={settingsItem.settingName}
        icon={settingsItem.icon}
        index={index}
      />
    ));
  };

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="arrow-back-sharp"
      color={colors.WHITE}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );
  return (
    <SafeAreaView
      edges={['top']}
      style={{backgroundColor: colors.BACKGROUND, flex: 1, height: '100%'}}>
      <MainHeader leftButton={headerLeftButton} />
      <Button
        title={theme.currentTheme == 'dark' ? 'go light' : 'go dark'}
        onPress={() => {
          theme.currentTheme == 'dark'
            ? dispatch(changeColorTheme('light'))
            : dispatch(changeColorTheme('dark'));
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <SettingsGroup
          title="General Settings"
          items={mapSettingsListToUI(generalSettingsItems)}
        />
        <SettingsGroup
          title="Some Other Settings"
          items={mapSettingsListToUI(someOtherSettingsItems)}
        />
        <VerticalSpacing spacing={60} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
