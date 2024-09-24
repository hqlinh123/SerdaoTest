import React, {createContext, useContext, useEffect, useState} from 'react';
import {getObjectValue, storeObject} from './helpers/stores';

const CreateBeneficiaryContext = createContext();

export const useBeneficiaries = () => useContext(CreateBeneficiaryContext);

export const CreateBeneficiaryProvider = ({children}) => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const addBeneficiaries = (
    firstName: string,
    lastName: string,
    iban: string,
  ) => {
    const newBeneficiaries = {
      id: Date.now(),
      firstname: firstName,
      lastname: lastName,
      iban,
    };
    setBeneficiaries(prevBeneficiaries => [
      ...prevBeneficiaries,
      newBeneficiaries,
    ]);
  };

  // Load transactions from cache on component mount
  useEffect(() => {
    const loadBeneficiariesFromCache = async () => {
      try {
        const cachedBeneficiaries = await getObjectValue('beneficiaries');

        if (cachedBeneficiaries) {
          setBeneficiaries(cachedBeneficiaries); // Update state with cached data
        }
        setTimeout(() => setIsLoading(false), 500);
      } catch (e) {
        console.error('Failed to load transactions from cache:', e);
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    loadBeneficiariesFromCache();
  }, []);

  // Store transactions and balance whenever they change
  useEffect(() => {
    const storeBeneficiaries = async () => {
      try {
        await storeObject('beneficiaries', beneficiaries);
      } catch (e) {
        console.error('Failed to store transactions or balance:', e);
      }
    };

    storeBeneficiaries();
  }, [beneficiaries]);

  return (
    <CreateBeneficiaryContext.Provider
      value={{beneficiaries, addBeneficiaries, isLoading}}>
      {children}
    </CreateBeneficiaryContext.Provider>
  );
};
