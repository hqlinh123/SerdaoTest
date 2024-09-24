import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import TransactionScreen from './TransactionScreen';
import {TransactionProvider} from './TransactionContext';
import CreateBeneficiary from './CreateBeneficiary';
import {CreateBeneficiaryProvider} from './CreateBeneficiaryContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CreateBeneficiaryProvider>
      <TransactionProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="CreateBeneficiary"
              component={CreateBeneficiary}
            />
            <Stack.Screen name="Transaction" component={TransactionScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TransactionProvider>
    </CreateBeneficiaryProvider>
  );
};

export default App;
