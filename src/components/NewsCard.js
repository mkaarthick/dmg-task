import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Caption, Card, Paragraph, Title} from 'react-native-paper';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';

import {Colors} from '../utils/Colors';
import {useTheme} from '../context/ThemeContext';

const NewsCard = ({article, grid}) => {
  const {darkTheme} = useTheme();
  const date = dayjs(article?.pub_date).format('DD MMM');
  const url = article.multimedia?.[0]?.url
    ? `https://nytimes.com/${article.multimedia[0].url}`
    : 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg';

  if (grid) {
    return (
      <Card
        style={[
          styles.gridViewContainer,
          {backgroundColor: darkTheme ? Colors.dark.card : Colors.light.card},
        ]}>
        <Image
          source={{uri: url}}
          style={styles.imageGrid}
          resizeMode="cover"
        />
        <View style={{paddingHorizontal: 6}}>
          <Caption
            style={{
              color: darkTheme
                ? Colors.dark.secondaryText
                : Colors.light.secondaryText,
            }}>
            {date}
          </Caption>
          <Title
            style={[
              styles.titleStyle,
              {color: darkTheme ? Colors.dark.text : Colors.light.text},
            ]}>
            {article.headline.main}
          </Title>
          <Caption
            style={[
              styles.snippetStyle,
              {color: darkTheme ? Colors.dark.text : Colors.light.text},
            ]}>
            {article?.abstract}
          </Caption>
        </View>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <Title
        style={[
          styles.titleStyle,
          {color: darkTheme ? Colors.dark.text : Colors.light.text},
        ]}>
        {article.headline.main}
      </Title>
      <View style={styles.row}>
        <View style={styles.nameContainer}>
          <Caption
            style={{
              color: darkTheme
                ? Colors.dark.secondaryText
                : Colors.light.secondaryText,
            }}>
            {date}
          </Caption>
          <Paragraph
            style={{
              color: darkTheme
                ? Colors.dark.secondaryText
                : Colors.light.secondaryText,
            }}>
            {article?.abstract}
          </Paragraph>
        </View>
        <FastImage
          source={{uri: url}}
          style={styles.pic}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pic: {
    borderRadius: 10,
    width: 120,
    height: 120,
  },
  nameContainer: {
    flex: 1,
    paddingRight: 4,
  },
  nameTxt: {
    fontSize: 18,
  },
  titleStyle: {
    fontSize: 16,
  },
  snippetStyle: {
    fontSize: 14,
  },
  gridViewContainer: {
    flex: 1,
    margin: 4,
    elevation: 4,
  },
  imageGrid: {
    width: '100%',
    height: 150,
  },
});

export default NewsCard;
