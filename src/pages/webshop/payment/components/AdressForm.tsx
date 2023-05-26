import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import validator from 'validator';
import { observer } from 'mobx-react-lite';

export const AddressForm = observer(() => {

    const { basketStore, languageStore } = useContext<IMobXContext>(MobXContext);
    const [firstNameError, setFirstNameError] = useState<boolean>(false);
    const [lastNameError, setLastNameError] = useState<boolean>(false);
    const [address1Error, setAddress1Error] = useState<boolean>(false);
    const [postcodeError, setPostcodeError] = useState<boolean>(false);
    const [cityError, setCityError] = useState<boolean>(false);
    const [countryError, setCountryError] = useState<boolean>(false);
    const [phoneError, setPhoneError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);


    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label={languageStore.currentLanguage.firstName}
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        error={firstNameError}
                        helperText={firstNameError ? languageStore.currentLanguage.firstNameShouldOnlyBeCharacters : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.firstName = event.target.value;
                            setFirstNameError(basketStore.Customer.firstName === "" ? false : validator.isAlpha(basketStore.Customer.firstName, languageStore.getCurrentLanguageCode()) ? false : true)
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label={languageStore.currentLanguage.lastName}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        error={lastNameError}
                        helperText={lastNameError ? languageStore.currentLanguage.lastNameShouldOnlyBeCharacters : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.lastName = event.target.value;
                            setLastNameError(validator.isAlpha(basketStore.Customer.lastName, languageStore.getCurrentLanguageCode()) ? false : true)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label={languageStore.currentLanguage.address_text}
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        error={address1Error}
                        helperText={address1Error ? languageStore.currentLanguage.addressCannotBeEmpty : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.address = event.target.value;
                            setAddress1Error((basketStore.Customer.address.trim().length > 0, languageStore.getCurrentLanguageCode()) ? false : true)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label={languageStore.currentLanguage.address_text + 2}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const oldAdress = basketStore.Customer.address;
                            basketStore.Customer.address = oldAdress + ", " + event.target.value;
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label={languageStore.currentLanguage.post_code}
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        error={postcodeError}
                        helperText={postcodeError ? languageStore.currentLanguage.postcodeErrorMessage : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.zipCode = event.target.value;
                            setPostcodeError(validator.isNumeric(basketStore.Customer.zipCode) ? false : true)
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label={languageStore.currentLanguage.city}
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        error={cityError}
                        helperText={cityError ? languageStore.currentLanguage.cityCannotBeEmpty : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.city = event.target.value;
                            setCityError((validator.isAlpha(basketStore.Customer.city), languageStore.getCurrentLanguageCode()) ? false : true)
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label={languageStore.currentLanguage.country}
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        error={countryError}
                        helperText={countryError ? languageStore.currentLanguage.countryErrorMessage : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.country = event.target.value;
                            setCountryError((validator.isAlpha(basketStore.Customer.country), languageStore.getCurrentLanguageCode()) ? false : true)
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label={languageStore.currentLanguage.phone_text}
                        fullWidth
                        variant="standard"
                        error={phoneError}
                        helperText={phoneError ? languageStore.currentLanguage.phoneNotCorrect : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.phone = event.target.value;
                            setPhoneError(basketStore.Customer.phone === "" ? false : (validator.isNumeric(basketStore.Customer.phone), languageStore.getCurrentLanguageCode()) ? false : true)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label={languageStore.currentLanguage.emailAdress}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        error={emailError}
                        helperText={emailError ? languageStore.currentLanguage.emailNotCorrect : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.email = event.target.value;
                            setEmailError((validator.isEmail(basketStore.Customer.email), languageStore.getCurrentLanguageCode()) ? false : true)
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
});