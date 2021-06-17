import React from 'react';
import { Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import search from "./screens/search";
import transaction from "./screens/transaction";
const Tab = createBottomTabNavigator();



export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ }) => {
              if (route.name === 'Search') {
                return <Image source={require('./assets/searchingbook.png')} style={{ height: 20, width: 20 }} />;
              } else if (route.name === 'Transaction') {
                return <Image source={require('./assets/book.png')} style={{ height: 20, width: 20 }} />
              }
            },
          })}>
          <Tab.Screen name="Search" component={search} options={option.tabs} />
          <Tab.Screen name="Transaction" component={transaction} />
        </Tab.Navigator>
      </NavigationContainer >
    );
  }
}

const option = {
  tabs: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    // tabBarBadge: 3
  },
};
