import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {getProductsByPage} from '../../../actions/products/get-products-by-page';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {MainLayout} from '../../layouts/MainLayout';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {ProductList} from '../../components/products/ProductList';

export const HomeScreen = () => {
  const {logout} = useAuthStore();

  // const {isLoading, data: products = []} = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60,
  //   queryFn: () => getProductsByPage(0),
  // });

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,

    queryFn: async params => {
      console.log({params});
      return await getProductsByPage(params.pageParam);
    },

    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <MainLayout
      title="TesloShop - Product"
      subTitle="Aplicación administrativa"
      rightAction={() => {}}
      rightActionIcon="plus-outline">
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ProductList
          fetchNextPage={fetchNextPage}
          products={data?.pages.flat() ?? []}
        />
      )}
    </MainLayout>
  );
};
