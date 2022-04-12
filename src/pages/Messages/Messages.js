import {View, Text, Alert, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './Messages.styles';
import Modal from '../../components/Modal';
import FloatButton from '../../components/Buttons/FloatButton';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import MessageCard from '../../components/Cards/MessageCard/MessageCard';
import Loading from '../../animation/Loading';

export default function Messages({route}) {
  const [loading, setLoading] = React.useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const [MessageList, setMessageList] = React.useState([]);
  const {roomName, key} = route.params;

  const parseContentData = data => {
    return Object.keys(data)
      .map(key => {
        return {
          id: key,
          ...data[key],
        };
      })
      .sort((a, b) => {
        return a.date > b.date ? -1 : a.date > b.date ? 1 : 0;
      });
  };

  useEffect(() => {
    setMessageList([]);
    setLoading(true);
    database()
      .ref(`Rooms/${key}/Messages/`)
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = parseContentData(contentData || {});

        setMessageList(parsedData);
        setLoading(false);
      });
    return () => {
      setMessageList({});
    };
  }, []);

  const handleModalToggle = () => {
    setModalVisible(!ModalVisible);
  };

  const createMessage = message => {
    setModalVisible(!ModalVisible);
    sendMessage(message);
  };

  const sendMessage = content => {
    const userName = auth().currentUser.email;

    const contentObject = {
      text: content,
      name: userName.split('@')[0],
      date: new Date().toISOString(),
    };

    if (!content) {
      Alert.alert('Uyarı', 'İçerik Boş Olamaz');
    } else {
      database().ref(`Rooms/${key}/Messages/`).push(contentObject);
    }
  };

  const handleMessageCard = ({item}) => {
    return <MessageCard item={item} />;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.innerContainerText}>
          {route.params.roomName} odası kuruldu!
        </Text>
      </View>
      <FlatList data={MessageList} renderItem={handleMessageCard} />
      <FloatButton onPress={handleModalToggle} />
      <Modal
        visible={ModalVisible}
        onClose={() => setModalVisible(!ModalVisible)}
        onSend={createMessage}
        buttonTitle="Gönder"
        placeHolder="Mesajın.."
      />
    </View>
  );
}
