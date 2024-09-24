import React, {createContext, useState, useContext, useEffect} from 'react';
import {
  getObjectValue,
  getValue,
  storeObject,
  storeValue,
} from './helpers/stores';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({children}) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);
  const addTransaction = (amount, account) => {
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    setBalance(prevBalance => prevBalance - parseFloat(amount));
  };

  // Load transactions from cache on component mount
  useEffect(() => {
    const loadTransactionsFromCache = async () => {
      try {
        const cachedTransactions = await getObjectValue('transactions');
        const cachedBalance = await getValue('balances');

        if (cachedTransactions) {
          setTransactions(cachedTransactions); // Update state with cached data
        }
        if (cachedBalance) {
          setBalance(Number(cachedBalance ?? 0));
        }
        setTimeout(() => setIsLoading(false), 500);
      } catch (e) {
        console.error('Failed to load transactions from cache:', e);
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    loadTransactionsFromCache();
  }, []);

  // Store transactions and balance whenever they change
  useEffect(() => {
    const storeTransactions = async () => {
      try {
        await storeObject('transactions', transactions);
        await storeValue('balances', JSON.stringify(balance));
      } catch (e) {
        console.error('Failed to store transactions or balance:', e);
      }
    };

    storeTransactions();
  }, [balance, transactions]);

  return (
    <TransactionContext.Provider
      value={{transactions, addTransaction, balance, isLoading}}>
      {children}
    </TransactionContext.Provider>
  );
};
