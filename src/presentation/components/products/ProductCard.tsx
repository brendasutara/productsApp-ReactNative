import {Image} from 'react-native';
import {Product} from '../../../domain/entities/product';
import {Card, Layout, Text} from '@ui-kitten/components';
import {FadeInImage} from '../ui/FadeInImage';
import {MyIcon} from '../ui/MyIcon';

interface Props {
  product: Product;
}

export const ProductCard = ({product}: Props) => {
  return (
    <Card
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 5,
        borderRadius: 20,
      }}>
      {product.images.length === 0 ? (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style={{width: '100%', height: 200}}
        />
      ) : (
        <FadeInImage
          uri={product.images[0]}
          style={{flex: 1, height: 200, width: '100%'}}
        />
      )}

      <Text category="p1" numberOfLines={2} style={{color: 'grey'}}>
        {product.title}
      </Text>
      <Layout
        style={{
          flex: 1,
          backgroundColor: '#F9F9F9',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text category="h6">$ {product.price}</Text>
        <MyIcon name="heart-outline" color="grey" size={25} />
      </Layout>
    </Card>
  );
};
