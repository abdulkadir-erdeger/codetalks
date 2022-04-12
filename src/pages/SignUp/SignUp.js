import {View, Text} from 'react-native';
import React from 'react';
import Button from '../../components/Buttons/Button';
import Input from '../../components/Input';
import {Formik} from 'formik';
import styles from './SignUp.styles';
import Loading from '../../animation/Loading';

import auth from '@react-native-firebase/auth';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function SignUp({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const initialValues = {
    email: '',
    password: '',
    repassword: '',
  };
  const handleLoginPage = () => {
    navigation.goBack();
  };

  const handleSignUp = async ({email, password, repassword}) => {
    if (password !== repassword) {
      console.log('Şifreler uyuşmuyor');
    } else {
      if (!email && !repassword) {
        console.log('Bilgiler boş bırakılamaz!');
      } else {
        setLoading(true);
        try {
          await auth().createUserWithEmailAndPassword(email, repassword);
          navigation.navigate('LoginPage');
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>codetalks</Text>
      <Formik initialValues={initialValues} onSubmit={handleSignUp}>
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
            <Input
              placeHolder="şifrenizi tekrar giriniz.."
              value={values.repassword}
              onChange={handleChange('repassword')}
              isSecure={true}
            />
            <Button title="Kayıt Ol" onPress={handleSubmit} />
            <Button title="Geri" theme="secondary" onPress={handleLoginPage} />
          </View>
        )}
      </Formik>
    </View>
  );
}
