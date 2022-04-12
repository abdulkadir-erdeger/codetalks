import React from 'react';
import {View, Text} from 'react-native';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';
import styles from './MessageCard.styles';

export default function MessageCard({item}) {
  const {name, date, text} = item;
  const formattedDate = formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
    locale: tr,
  });
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.user}>{name}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{text}</Text>
      </View>
    </View>
  );
}
