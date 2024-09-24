import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTransactions} from './TransactionContext';
import {useBeneficiaries} from './CreateBeneficiaryContext';

const HomeScreen = ({navigation}) => {
  const {transactions, balance, isLoading} = useTransactions();
  const {beneficiaries} = useBeneficiaries();
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState();
  console.log('beneficiaries', beneficiaries);
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      <Text style={styles.itemText}>Amount: ${item?.amount?.toFixed(2)}</Text>
      {item.account && (
        <>
          <Text style={styles.itemText}>To: {item.account.name}</Text>
          <Text style={styles.itemText}>IBAN: {item.account.iban}</Text>
        </>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={'gray'} size={20} />
      </View>
    );
  }

  const onPressItemBeneficiaries = item => setSelectedBeneficiaries(item);

  const renderItemBeneficiaries = ({item}) => {
    const selectedItem = item?.id === selectedBeneficiaries?.id;
    return (
      <TouchableOpacity
        style={[styles.item, selectedItem && {borderColor: 'red'}]}
        onPress={() => onPressItemBeneficiaries(item)}>
        <Text style={styles.itemText}>First Name: {item.firstname}</Text>
        <Text style={styles.itemText}>Last Name: {item.lastname}</Text>
        <Text style={styles.itemText}>IBAN: {item?.iban}</Text>
      </TouchableOpacity>
    );
  };
  const renderBeneficiariesList = () => {
    return (
      <FlatList
        data={beneficiaries}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItemBeneficiaries}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  const renderTransactionList = () => {
    return (
      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.balanceText}>
          Current Balance: ${balance > 0 ? balance.toFixed(2) : 0}
        </Text>
        {beneficiaries?.length > 0 ? renderBeneficiariesList() : null}
        <Button
          title="Add Beneficiary"
          onPress={() => navigation.navigate('CreateBeneficiary')}
        />
        {transactions?.length > 0 ? renderTransactionList() : null}
        {selectedBeneficiaries && (
          <Button
            title="Add Transaction"
            onPress={() =>
              navigation.navigate('Transaction', {
                data: selectedBeneficiaries,
              })
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default HomeScreen;
