import '../gesture-handler';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';

import { NavigationContainer } from "@react-navigation/native"
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { useColorScheme } from 'react-native';

export const ProdcutsApp = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? eva.dark : eva.light;

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={theme}>
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </ApplicationProvider>
        </>
        
    )
}
