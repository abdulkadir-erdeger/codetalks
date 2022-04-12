import {View, Text} from 'react-native';
import React from 'react';
import styles from './RoomsCard.styles';

export default function RoomsCard({text}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
