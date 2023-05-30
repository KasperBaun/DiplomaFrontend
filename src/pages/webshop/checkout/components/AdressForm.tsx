import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import validator from 'validator';
import { observer } from 'mobx-react-lite';

export const AddressForm = observer(() => {

    /* Not sure if this is needed so remove if not */
    // const [ipInfo, setIpInfo] = useState<IpInfo>({
    //     ip: "",
    //     countryName: "",
    //     countryCode: "",
    //     postal: "",
    //     city: "",
    //     timezone: ""
    // });
    // useEffect(() => {
    //     const getGeoInfo = async () => {
    //         try {
    //             const response = await fetch("https://ipapi.co/json/");
    //             if (!response.ok) {
    //                 throw new Error("Unable to retrieve geolocation data");
    //             }
    //             const data = await response.json();
    //             setIpInfo({
    //                 ...ipInfo,
    //                 ip: data.ip,
    //                 countryName: data.country_name,
    //                 countryCode: data.country_calling_code,
    //                 postal: data.postal,
    //                 city: data.city,
    //                 timezone: data.timezone
    //             });
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     getGeoInfo();
    // });

    // useEffect(() => {
    //     setZipCode(ipInfo.postal);
    //     setCity(ipInfo.city.split(" ")[0]);
    //     setCountry(ipInfo.countryName);
    //     setCountryCode(ipInfo.countryCode);
    // }, [ipInfo]);

    /* Not sure if this is needed so remove if not */

    const { basketStore, languageStore } = useContext<IMobXContext>(MobXContext);
    const [firstNameError, setFirstNameError] = useState<boolean>(false);
    const [lastNameError, setLastNameError] = useState<boolean>(false);
    const [address1Error, setAddress1Error] = useState<boolean>(false);
    const [postcodeError, setPostcodeError] = useState<boolean>(false);
    const [cityError, setCityError] = useState<boolean>(false);
    const [countryError, setCountryError] = useState<boolean>(false);
    const [phoneError, setPhoneError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const langCode = languageStore.getCurrentLanguageCode();

    const [firstName, setFirstName] = useState(basketStore.Customer?.firstName ? basketStore.Customer?.firstName : "");
    const [lastName, setLastName] = useState(basketStore.Customer?.lastName ? basketStore.Customer?.lastName : "");
    const [address, setAddress] = useState(basketStore.Customer?.address ? basketStore.Customer?.address : "");
    const [zip, setZip] = useState(basketStore.Customer?.zipCode ? basketStore.Customer.zipCode : "");
    const [city, setCity] = useState(basketStore.Customer?.city ? basketStore.Customer.city : "");
    const [country, setCountry] = useState(basketStore.Customer?.country ? basketStore.Customer.country : "");
    const [phone, setPhone] = useState(basketStore.Customer?.phone ? basketStore.Customer.phone : "");
    const [email, setEmail] = useState(basketStore.Customer?.email ? basketStore.Customer.email : "");

    const handleCustomerPropsChange = () => {
        let errors = firstNameError || lastNameError || address1Error || postcodeError || cityError || countryError || phoneError || emailError;
        basketStore.CustomerInputValidated = !errors;
    }

    useEffect(() => {
        handleCustomerPropsChange();
    }, [firstNameError, lastNameError, address1Error, postcodeError, cityError, countryError, phoneError, emailError]);

    const variant = "outlined";


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
                        variant={variant}
                        value={firstName}
                        error={firstNameError}
                        helperText={firstNameError ? languageStore.currentLanguage.firstNameShouldOnlyBeCharacters : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.firstName = event.target.value;
                            setFirstNameError(
                                basketStore.Customer.firstName === "" ? false :
                                    validator.isAlpha(basketStore.Customer.firstName, langCode) ? false : true
                            );
                            setFirstName(event.target.value)
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
                        variant={variant}
                        value={lastName}
                        error={lastNameError}
                        helperText={lastNameError ? languageStore.currentLanguage.lastNameShouldOnlyBeCharacters : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.lastName = event.target.value;
                            setLastNameError(
                                basketStore.Customer.lastName === "" ? false :
                                    validator.isAlpha(basketStore.Customer.lastName, langCode) ? false : true
                            );
                            setLastName(event.target.value);
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
                        variant={variant}
                        value={address}
                        error={address1Error}
                        helperText={address1Error ? languageStore.currentLanguage.addressCannotBeEmpty : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.address = event.target.value;
                            setAddress1Error(basketStore.Customer.address.trim().length > 0 ? false : true);
                            setAddress(event.target.value);
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
                        variant={variant}
                        value={zip}
                        error={postcodeError}
                        helperText={postcodeError ? languageStore.currentLanguage.postcodeErrorMessage : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.zipCode = event.target.value;
                            setPostcodeError(validator.isNumeric(basketStore.Customer.zipCode) ? false : true);
                            setZip(event.target.value);
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
                        variant={variant}
                        value={city}
                        error={cityError}
                        helperText={cityError ? languageStore.currentLanguage.cityCannotBeEmpty : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.city = event.target.value;
                            setCityError(validator.isAlpha(basketStore.Customer.city, langCode) ? false : true);
                            setCity(event.target.value);
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
                        variant={variant}
                        value={country}
                        error={countryError}
                        helperText={countryError ? languageStore.currentLanguage.countryErrorMessage : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.country = event.target.value;
                            setCountryError(validator.isAlpha(basketStore.Customer.country, langCode) ? false : true);
                            basketStore.Customer.countryCode = langCode;
                            setCountry(event.target.value);
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
                        variant={variant}
                        value={phone}
                        error={phoneError}
                        helperText={phoneError ? languageStore.currentLanguage.phoneNotCorrect : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const inputPhoneNumber = event.target.value;
                            const countryCodeRegex = /^(\+?\d{2}|\+\d{3})[\s-]?/;
                            const match = inputPhoneNumber.match(countryCodeRegex);

                            if (match && match[0]) {
                                const extractedCountryCode = match[0];/*.startsWith('+') ? match[0].substring(1) : match[0];*/
                                basketStore.Customer.countryCode = extractedCountryCode;
                            }

                            const phoneNumber = inputPhoneNumber.replace(countryCodeRegex, '').trim();
                            const phoneRegex = /^\d+$/; // Regex to match only digits
                            const isValidPhone = phoneRegex.test(phoneNumber);
                            basketStore.Customer.phone = isValidPhone ? parseInt(phoneNumber) : 0;
                            setPhone(event.target.value);
                            setPhoneError(!isValidPhone);
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
                        variant={variant}
                        value={email}
                        error={emailError}
                        helperText={emailError ? languageStore.currentLanguage.emailNotCorrect : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            basketStore.Customer.email = event.target.value;
                            let error = !validator.isEmail(basketStore.Customer.email);
                            setEmailError(error);
                            setEmail(event.target.value);
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
});