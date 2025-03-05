import {Layout, Spinner, Text} from '@ui-kitten/components';

export const LoadingScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner status="primary" size="large" />
    </Layout>
  );
};
