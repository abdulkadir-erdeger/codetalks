import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './pages/Login';
import SingUp from './pages/SignUp';
import Rooms from './pages/Rooms';
import Messages from './pages/Messages';

import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => setUserSession(!!user));
  }, []);

  return (
    <NavigationContainer>
      {userSession ? (
        <Stack.Navigator>
          <Stack.Screen
            name="RoomsPage"
            component={Rooms}
            options={{
              title: 'Odalar',
              headerLeft: () => <></>,
              headerTitleAlign: 'center',
              headerTintColor: '#ff6f00',
            }}
          />
          <Stack.Screen
            name="MessagesPage"
            component={Messages}
            options={({route}) => ({
              title: route.params.roomName,
              headerTitleAlign: 'center',
              headerTintColor: '#ff6f00',
              headerRight: () => (
                <Icon
                  name="logout"
                  color="#ff6f00"
                  size={28}
                  onPress={() => auth().signOut()}
                />
              ),
            })}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="LoginPage"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpPage"
            component={SingUp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
