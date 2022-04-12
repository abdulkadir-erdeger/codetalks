import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../Buttons/Button';
import styles from './Modal.styles';

export default function ModalCard({
  visible,
  onClose,
  onSend,
  buttonTitle,
  placeHolder,
}) {
  const [text, setText] = useState();

  useEffect(() => {
    setText(null);
  }, [onSend]);
  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeHolder}
            multiline
            onChangeText={setText}
            autoCorrect={false}
          />
        </View>
        <Button title={buttonTitle} onPress={() => onSend(text)} />
      </View>
    </Modal>
  );
}
