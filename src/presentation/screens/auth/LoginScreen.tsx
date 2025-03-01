import {Input, Layout, Text, Button} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/UI/MyIcon';

export const LoginScreen = () => {
  const {height} = useWindowDimensions();
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
            style={{marginBottom: 10}}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryRight={<MyIcon name="eye-outline" color="#494949" />}
            style={{marginBottom: 10}}
          />
        </Layout>
        <Layout style={{height: 20}} />
        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrowhead-right-outline" white />}
            onPress={() => {}}>
            Ingresar
          </Button>
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
          <Text status="primary" category="s1" onPress={() => {}}>
            Crea una aquí
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
