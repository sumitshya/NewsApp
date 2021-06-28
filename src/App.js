/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import React from 'react';
 import { StyleSheet } from "react-native";
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from "@react-navigation/stack";
 import { Provider as PaperProvider } from 'react-native-paper';

 import { NewsContext, useNews, NewsDataProvider } from "./Context";
 
 import HomeScreen from './Screens/HomeScreen';
 import NewsDetailScreen from './Screens/NewsDetailScreen';
 
 const Stack = createStackNavigator();

 const App = () => {
   return (
     <PaperProvider>
      <NewsDataProvider>
        <NavigationContainer>
            <Stack.Navigator headerMode={"none"}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="News" component={NewsDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </NewsDataProvider>
      </PaperProvider>
   );
 };
 
 const styles = StyleSheet.create({
 });
 
 export default App;
 