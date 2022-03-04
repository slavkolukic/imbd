import React, {FC, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SETTINGS_ITEM_ICON_SIZE} from '../constants/dimensions';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {ColorThemes} from '../enums/colorThemes';
import {useColorTheme} from '../hooks/useColorTheme';

interface SelectThemeRadioButtonProps {
  colorThemeName: ColorThemes;
  index?: number;
}

const SelectThemeRadioButton: FC<SelectThemeRadioButtonProps> = ({
  colorThemeName,
  index = 1,
}) => {
  const {
    colorTheme,
    setColorTheme,
    foregroundStyle,
    primaryColorForegroundStyle,
  } = useColorTheme();

  const opacity = useSharedValue(0);
  const positionY = useSharedValue(-50);

  const isCurrentlyActive = colorTheme.themeName === colorThemeName;
  const onPressHandler = () => {
    setColorTheme(colorThemeName);
  };

  useEffect(() => {
    opacity.value = withDelay(index * 80, withTiming(1, {duration: 600}));
    positionY.value = withDelay(index * 80, withTiming(0, {duration: 600}));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {opacity: opacity.value, transform: [{translateY: positionY.value}]};
  }, []);

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <TouchableOpacity
        style={styles.touchablePart}
        activeOpacity={
          colorTheme.type === 'dark'
            ? ACTIVE_OPACITY_WEAK
            : ACTIVE_OPACITY_STRONG
        }
        onPress={onPressHandler}>
        <Ionicons
          color={isCurrentlyActive ? colorTheme.primary : colorTheme.foreground}
          size={SETTINGS_ITEM_ICON_SIZE}
          name={isCurrentlyActive ? 'radio-button-on' : 'radio-button-off'}
        />
        <Text
          style={[
            {fontSize: 16, marginHorizontal: 10},
            isCurrentlyActive ? primaryColorForegroundStyle : foregroundStyle,
          ]}>
          {colorThemeName}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SelectThemeRadioButton;

const styles = StyleSheet.create({
  container: {
    height: 40,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingHorizontal: 20,
  },
  touchablePart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
