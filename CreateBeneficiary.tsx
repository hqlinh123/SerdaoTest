// CreateBeneficiary.tsx

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {validateIBAN} from './helpers/validate';
import {useBeneficiaries} from './CreateBeneficiaryContext';

const CreateBeneficiary: React.FC = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const {addBeneficiaries} = useBeneficiaries();
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!iban) {
      newErrors.iban = 'IBAN is required';
    } else if (!validateIBAN(iban)) {
      newErrors.iban = 'Invalid IBAN format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      addBeneficiaries(firstName, lastName, iban);
      // Handle the submission (e.g., send data to the server)
      // Reset fields
      setFirstName('');
      setLastName('');
      setIban('');
      setErrors({});
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Beneficiary</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

      <TextInput
        style={styles.input}
        placeholder="IBAN"
        value={iban}
        onChangeText={setIban}
      />
      {errors.iban && <Text style={styles.error}>{errors.iban}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 46,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateBeneficiary;
