import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home.js'
import CreateItem from './screens/create.js';
import Login from './screens/login.js';
import Show from './screens/show.js';
import EditItem from './screens/edit.js';


// The stack allows us to do page navigation with the back arrow
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen 
        name="Login"
        component={Login}
        options={{ title: "Login to College Marketplace"}}
        /> */}
        <Stack.Screen 
        name="Home"
        component={Home}
        options={{ title: "College Marketplace"}}
        />
        <Stack.Screen 
        name="Create"
        component={CreateItem}
        options={{ title: "List Item to Sell"}}
        />
        <Stack.Screen 
        name="Show"
        component={Show}
        options={{ title: "Show Item Details"}}
        />
        <Stack.Screen 
        name="Edit"
        component={EditItem}
        options={{ title: "Edit Item Details"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;