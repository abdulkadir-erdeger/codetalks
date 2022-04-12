import {View, FlatList, StatusBar, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import RoomsCard from '../../components/Cards/RoomsCard/RoomsCard';
import FloatButton from '../../components/Buttons/FloatButton/FloatButton';
import Modal from '../../components/Modal/Modal';
import database from '@react-native-firebase/database';
import Loading from '../../animation/Loading';

export default function Rooms({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    setLoading(true);
    database()
      .ref('Rooms/')
      .on('value', snapshot => {
        const rooms = [];
        snapshot.forEach(child => {
          rooms.push({
            key: child.key,
            roomName: child.val().roomName,
          });
        });
        setRoomList(rooms);
        setLoading(false);
      });
    return () => {
      setRoomList({});
    };
  }, []);

  const roomListRender = item => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MessagesPage', item)}>
        <RoomsCard text={item.roomName} />
      </TouchableOpacity>
    );
  };

  const handleModalToggle = () => {
    setModalVisible(!ModalVisible);
  };

  const createRoom = roomName => {
    setModalVisible(!ModalVisible);
    const roomObject = {
      roomName: roomName,
    };
    database().ref('Rooms/').push(roomObject);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <FlatList
        data={roomList}
        renderItem={({item}) => roomListRender(item)}
        numColumns={2}
      />
      <FloatButton onPress={handleModalToggle} />
      <Modal
        visible={ModalVisible}
        onClose={() => setModalVisible(!ModalVisible)}
        onSend={createRoom}
        buttonTitle="Ekle"
        placeHolder={'Oda adı..'}
      />
    </View>
  );
}
