import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.95,
    margin: 8,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    minHeight: 60,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {fontSize: 16, fontWeight: '400'},
  date: {fontStyle: 'italic', fontWeight: '700'},
  contentContainer: {
    flex: 1,
    marginTop: 5,
  },
  content: {
    fontWeight: '900',
    fontSize: 18,
  },
});
