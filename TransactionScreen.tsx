import React, {useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {useTransactions} from './TransactionContext';
import {validateIBAN, validateName} from './helpers/validate';

const TransactionScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const {addTransaction, balance} = useTransactions();

  const handleTransaction = () => {
    if (!validateIBAN(iban)) {
      return Alert.alert('Invalid IBAN');
    }
    if (!amount || Number(amount) <= 0) {
      return Alert.alert('Invalid amount!');
    }
    if (Number(amount) > balance) {
      return Alert.alert('Amount must be less than or equal to balance!');
    }
    if (!name || !validateName(name)) {
      return Alert.alert('Your name is invalid!');
    }

    const accountDetails = {name, iban};
    addTransaction(Number(amount), accountDetails); // Ensure amount is stored as a number
    navigation.goBack();
  };

  const handleChange = setter => value => {
    setter(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleChange(setAmount)}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChange(setName)}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChange(setIban)}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleTransaction}
        accessibilityLabel="Submit Transaction">
        <Text style={styles.buttonText}>Submit Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    height: 46,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TransactionScreen;
