import { StyleSheet } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QuestCategoriesScreen from './screens/QuestCategoriesScreen';
import QuestListFromCategoriesScreen from './screens/QuestListFromCategoriesScreen';
import QuestMapLocationScreen from './screens/QuestMapLocationScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="QuestCategoriesScreen">
          <Stack.Screen name="QuestCategoriesScreen" component={QuestCategoriesScreen} options={{ animation: "fade_from_bottom" }}/>
          <Stack.Screen name="QuestListFromCategoriesScreen" component={QuestListFromCategoriesScreen} options={{ animation: "fade_from_bottom" }}/>
          <Stack.Screen name="QuestMapLocationScreen" component={QuestMapLocationScreen} options={{ animation: "fade_from_bottom" }}/>
        </Stack.Navigator>
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
