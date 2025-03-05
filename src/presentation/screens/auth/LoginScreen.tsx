import {Input, Layout, Text, Button} from '@ui-kitten/components';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/UI/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useState} from 'react';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const {height} = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setIsPosting(true);
    const wasSuccessfull = await login(form.email, form.password);
    setIsPosting(false);

    if (wasSuccessfull) return;

    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Ingresar</Text>
          <Text>Por favor, ingrese sus credenciales para continuar</Text>
        </Layout>
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={email => setForm({...form, email})}
            style={{marginBottom: 10}}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={password => setForm({...form, password})}
            accessoryRight={<MyIcon name="eye-outline" color="#494949" />}
            style={{marginBottom: 10}}
          />
        </Layout>
        <Layout style={{height: 20}} />
        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrowhead-right-outline" white />}
            onPress={onLogin}>
            Ingresar
          </Button>
          <Text>{JSON.stringify(form, null, 2)}</Text>
        </Layout>
        <Layout style={{height: 50}} />
        <Layout
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
          }}>
          <Text>¿No tienes una cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}>
            Crea una aquí
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
