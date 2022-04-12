import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6f00',
  },
  title: {
    fontSize: 30,
    color: '#e0e0e0',
    height: Dimensions.get('window').height * 0.25,
  },
});
