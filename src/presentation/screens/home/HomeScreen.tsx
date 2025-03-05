import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {getProductsByPage} from '../../../actions/products/get-products-by-page';

export const HomeScreen = () => {
  const {logout} = useAuthStore();

  getProductsByPage(0);
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
