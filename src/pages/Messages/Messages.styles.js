import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {flex: 1, alignItems: 'center', backgroundColor: '#ffb74d'},
  innerContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    padding: 10,
    margin: 10,
    width: width * 0.9,
    alignItems: 'center',
  },
  innerContainerText: {color: 'white', fontSize: 16, fontWeight: '700'},
});
