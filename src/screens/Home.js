import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {uniqBy} from 'lodash';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import NewsCard from '../components/NewsCard';
import {useTheme} from '../context/ThemeContext';
import useFetchNews from '../hooks/useFetchNews';
import {Colors} from '../utils/Colors';
import Header from '../components/Header';
import {useToggle} from '../hooks/useToggle';

const Home = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchNews();

  const {darkTheme} = useTheme();
  const [isGrid, setGrid] = useToggle();

  const progress = useDerivedValue(() => {
    return darkTheme ? withTiming(1) : withTiming(0);
  }, [darkTheme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background],
    );

    return {backgroundColor};
  });

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderSpinner = () => {
    return <ActivityIndicator style={{padding: 12}} />;
  };

  const renderComponents = () => {
    if (isLoading) {
      return <ActivityIndicator style={styles.loadingContainer} />;
    }
    if (isError) {
      return (
        <Text style={{alignSelf: 'center', flex: 1}}>
          An error occurred while fetching data
        </Text>
      );
    }
    if (data && data?.pages) {
      const flattenData = data.pages.flatMap(page => page?.data);
      const listData = uniqBy(flattenData, 'uri');
      return (
        <Animated.View style={[styles.container, rStyle]}>
          {listData ? (
            <FlashList
              keyExtractor={item => item._id}
              data={listData}
              renderItem={({item, index}) => (
                <NewsCard article={item} index={index} grid={isGrid} />
              )}
              onEndReached={loadNext}
              onEndReachedThreshold={0.3}
              estimatedItemSize={100}
              numColumns={isGrid ? 2 : 1}
              key={isGrid ? '2' : '1'}
              ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
            />
          ) : null}
        </Animated.View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <Header toggleLayout={setGrid} isGrid={isGrid} />
      {renderComponents()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    alignSelf: 'center',
    flex: 1,
  },
});

export default Home;
