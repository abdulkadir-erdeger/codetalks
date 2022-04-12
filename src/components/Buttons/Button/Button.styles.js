import {StyleSheet} from 'react-native';

const baseStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ffa040',
  },
  text: {
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold',
  },
});

export default {
  primary: StyleSheet.create({
    container: {
      ...baseStyle.container,
      backgroundColor: '#ffa040',
    },
    text: {
      ...baseStyle.text,
      color: 'white',
    },
  }),
  secondary: StyleSheet.create({
    container: {
      ...baseStyle.container,
      backgroundColor: 'white',
    },
    text: {
      ...baseStyle.text,
      color: '#ffa040',
    },
  }),
};
