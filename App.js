import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QuestCategoriesScreen from './screens/QuestCategoriesScreen';
import QuestListFromCategoriesScreen from './screens/QuestListFromCategoriesScreen';
import QuestMapLocationScreen from './screens/QuestMapLocationScreen';

import { FilterProvider } from './store/FilterContext';
import TopBarFilter from './components/TopBarFilter';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <FilterProvider>
          <Stack.Navigator initialRouteName="QuestCategoriesScreen">
            <Stack.Screen name="QuestCategoriesScreen" component={QuestCategoriesScreen}
            options={{ 
              title: "PoGoLeiria", 
              animation: "none", 
              headerStyle: { backgroundColor: '#141414' },
              headerTintColor: '#c0c0c0',
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold',
                textShadowColor: 'black',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              },
              headerTitleAlign: 'center'
            }}/>
            <Stack.Screen name="QuestListFromCategoriesScreen" component={QuestListFromCategoriesScreen}
            options={{ 
              title: "PoGoLeiria", 
              animation: "none", 
              headerStyle: { backgroundColor: '#141414' },
              headerTintColor: '#c0c0c0',
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold',
                textShadowColor: 'black',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              },
              headerRight: () => (
                <TopBarFilter />
              ),
              headerTitleAlign: 'center',
            }}/>
            <Stack.Screen name="QuestMapLocationScreen" component={QuestMapLocationScreen}
            options={{ 
              title: "PoGoLeiria", 
              animation: "none", 
              headerStyle: { backgroundColor: '#141414' },
              headerTintColor: '#c0c0c0',
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold',
                textShadowColor: 'black',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              },
              headerTitleAlign: 'center' 
            }}/>
          </Stack.Navigator>
        </FilterProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#070707',
  }
});
