import React, { useContext, useState } from 'react';
import {
  Container,
  FormControl,
  TextField,
} from '@mui/material';
import MobXContext from '@stores/MobXContext';

export const PaymentCreditCardForm = () => {
  const { languageStore } = useContext(MobXContext);
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardHolderNameValid, setCardHolderNameValid] = useState(false);
  const [cvc, setCvc] = useState('');
  const [cardNumberValid, setCardNumberValid] = useState(false);
  const [expirationValid, setExpirationValid] = useState(false);
  const [cvcValid, setCvcValid] = useState(false);

  const handleCardHolderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setCardHolderName(input);
    setCardHolderNameValid(true);
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = event.target.value.replace(/\s+/g, '').match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formattedNumber);
    setCardNumberValid(formattedNumber.length === 19); // Validate that the card number is 16 digits long
  };

  const handleExpirationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\s+/g, '');
    setExpiration(input);
    setExpirationValid(true);
  };

  const handleCvcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCvc = event.target.value.replace(/\s+/g, '').slice(0, 3) || '';
    setCvc(formattedCvc);
    setCvcValid(/^\d{3}$/.test(formattedCvc)); // Validate that the CVC is exactly 3 digits long
  };

  return (
    <Container style={{ marginTop: '1rem' }}>
      <form>
        <FormControl fullWidth style={{ marginTop: '1rem' }}>
          <TextField
            type="text"
            placeholder="Enter Card Holder Name"
            value={cardHolderName}
            onChange={handleCardHolderNameChange}
            label={languageStore.currentLanguage.CheckoutPaymentWidgetPayFormCardHolderLabel}
            className={cardHolderNameValid ? 'is-valid' : 'is-invalid'}
          />
        </FormControl>
        <FormControl fullWidth style={{ marginTop: '1rem' }}>
          <TextField
            type="text"
            placeholder="1234 5678 9123 4567"
            value={cardNumber}
            label={languageStore.currentLanguage.cardNumber}
            onChange={handleCardNumberChange}
            className={cardNumberValid ? 'is-valid' : 'is-invalid'}
          />
        </FormControl>
        <FormControl fullWidth style={{ marginTop: '1rem' }}>
          <TextField
            type="text"
            placeholder="MM/YY"
            value={expiration}
            onChange={handleExpirationChange}
            label={languageStore.currentLanguage.CheckoutPaymentWidgetPayFormMMYYLabel}
            className={expirationValid ? 'is-valid' : 'is-invalid'}
          />
        </FormControl>
        <FormControl fullWidth style={{ marginTop: '1rem' }}>
          <TextField
            type="text"
            placeholder="Enter CVC"
            value={cvc}
            onChange={handleCvcChange}
            label={languageStore.currentLanguage.CheckoutPaymentWidgetPayFormSecureLabel}
            className={cvcValid ? 'is-valid' : 'is-invalid'}
          />
        </FormControl>
      </form>
    </Container >
  )
};



