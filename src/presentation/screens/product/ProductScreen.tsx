import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {MainLayout} from '../../layouts/MainLayout';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getProductById} from '../../../actions/products/get-product-by-id';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useRef} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {Gender, Product, Size} from '../../../domain/entities/product';
import {MyIcon} from '../../components/ui/MyIcon';
import {Formik} from 'formik';
import {updateCreateProduct} from '../../../actions/products/update-create-product';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route}: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();

  const {data: product} = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess(data: Product) {
      productIdRef.current = data.id; // creación

      queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['product', data.id]});
      // queryClient.setQueryData(['product',  data.id ], data);
    },
  });

  if (!product) {
    return <MainLayout title="Cargando..." />;
  }
  return (
    <Formik
      initialValues={product}
      onSubmit={values => mutation.mutate(values)}>
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
        <MainLayout title={values.title} subTitle={`Precio: ${values.price}`}>
          <ScrollView style={{flex: 1}}>
            <Layout>
              <FlatList
                data={values.images}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <FadeInImage
                    uri={item}
                    style={{
                      width: 300,
                      height: 300,
                      marginHorizontal: 7,
                      marginVertical: 10,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#E5E5E5',
                    }}
                  />
                )}
              />
            </Layout>
            <Layout style={{marginHorizontal: 10}}>
              <Input
                label="Título"
                value={values.title}
                style={{marginVertical: 5}}
                onChangeText={handleChange('title')}
              />
              <Input
                label="Slug"
                value={values.slug}
                style={{marginVertical: 5}}
                onChangeText={handleChange('slug')}
              />
              <Input
                label="Descripción"
                value={values.description}
                multiline
                numberOfLines={5}
                style={{marginVertical: 5}}
                onChangeText={handleChange('description')}
              />
            </Layout>
            <Layout
              style={{
                marginHorizontal: 15,
                marginVertical: 5,
                flexDirection: 'row',
                gap: 10,
              }}>
              <Input
                label="Precio"
                value={values.price.toString()}
                keyboardType="numeric"
                style={{flex: 1}}
                onChangeText={handleChange('price')}
              />
              <Input
                label="Inventario"
                value={values.stock.toString()}
                keyboardType="numeric"
                style={{flex: 1}}
                onChangeText={handleChange('stock')}
              />
            </Layout>
            <ButtonGroup
              size="small"
              appearance="outline"
              style={{margin: 2, marginTop: 20, marginHorizontal: 15}}>
              {sizes.map(size => (
                <Button
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                  key={size}>
                  {size}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup
              size="small"
              appearance="outline"
              style={{margin: 2, marginTop: 20, marginHorizontal: 15}}>
              {genders.map(gender => (
                <Button
                  onPress={() => setFieldValue('gender', gender)}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                  key={gender}>
                  {gender.toUpperCase()}
                </Button>
              ))}
            </ButtonGroup>
            <Button
              accessoryLeft={<MyIcon name="save-outline" white size={30} />}
              onPress={() => handleSubmit()}
              disabled={mutation.isPending}
              style={{margin: 15}}>
              Guardar
            </Button>
            <Text style={{margin: 15}}>{JSON.stringify(values, null, 2)}</Text>
            <Layout style={{height: 200}} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
