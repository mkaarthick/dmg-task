import {Appbar} from 'react-native-paper';
import React from 'react';
import {useTheme} from '../context/ThemeContext';
import {View} from 'react-native';

const Header = ({isGrid, toggleLayout}) => {
  const {darkTheme, toggleTheme} = useTheme();

  return (
    <Appbar.Header>
      <Appbar.Content title="News" />
      <Appbar.Action
        icon={isGrid ? 'format-list-bulleted' : 'view-grid-outline'}
        onPress={toggleLayout}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Appbar.Action
          icon={darkTheme ? 'weather-sunny' : 'weather-night'}
          color={'white'}
          onPress={toggleTheme}
        />
      </View>
    </Appbar.Header>
  );
};

export default Header;
