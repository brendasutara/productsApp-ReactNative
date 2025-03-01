import {Button, Icon, Layout, Text} from '@ui-kitten/components';

export const HomeScreen = () => {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text category="h1">Home screen</Text>

      <Button accessoryRight={<Icon name="arrowhead-right-outline" />}>
        Cerrar sesión
      </Button>
    </Layout>
  );
};
