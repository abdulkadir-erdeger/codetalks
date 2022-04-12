import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: height / 4,
  },
  inputContainer: {flex: 1},
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
});
