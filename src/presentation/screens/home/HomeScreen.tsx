import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const {logout} = useAuthStore();
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text category="h1">Home screen</Text>

      <Button onPress={logout} accessoryLeft={<Icon name="log-out-outline" />}>
        Cerrar sesión
      </Button>
    </Layout>
  );
};
