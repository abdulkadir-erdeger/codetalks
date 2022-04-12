import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import styles from './Login.styles';
import Button from '../../components/Buttons/Button';
import Input from '../../components/Input';
import {Formik} from 'formik';
import Loading from '../../animation/Loading';

import auth from '@react-native-firebase/auth';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function Login({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSignupPage = () => {
    navigation.navigate('SignUpPage');
  };

  const handleSignIn = async ({email, password}) => {
    if (!email && !password) {
      console.log('Bilgiler boş bırakılamaz!');
    } else {
      setLoading(true);
      try {
        await auth().signInWithEmailAndPassword(email, password);
        console.log('Giriş Başarılı!');
        navigation.navigate('RoomsPage');
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff6f00" barStyle="dark-content" />
      <Text style={styles.title}>codetalks</Text>
      <Formik initialValues={initialValues} onSubmit={handleSignIn}>
        {({handleChange, handleSubmit, values}) => (
          <View>
            <Input
              placeHolder="e-postanızı giriniz.."
              value={values.email}
              onChange={handleChange('email')}
            />
            <Input
              placeHolder="şifrenizi giriniz.."
              value={values.password}
              onChange={handleChange('password')}
              isSecure={true}
            />
            <Button title="Giriş Yap" onPress={handleSubmit} />
            <Button
              title="Kayıt Ol"
              theme="secondary"
              onPress={handleSignupPage}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
