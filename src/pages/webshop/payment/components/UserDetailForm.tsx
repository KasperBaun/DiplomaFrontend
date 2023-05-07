import { Button, FormControl, FormControlLabel, FormLabel, Grid, Input, InputLabel, Radio, RadioGroup } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import '../css/payment.scss';
import { LanguageStore } from "@stores/LanguageStore";
import React from "react";
import validator from 'validator';
import { CheckoutForm } from "@models/Checkout";


interface IpInfo {
    ip: string;
    countryName: string;
    countryCode: string;
    postal: string;
    city: string;
    timezone: string;
}

interface IUserDetailFormProps {
    ls: LanguageStore;
    setCheckoutForm: Dispatch<SetStateAction<CheckoutForm>>;
    setIsCheckoutReady: Dispatch<SetStateAction<boolean>>;
}

const UserDetailForm = (props: IUserDetailFormProps) => {

    const [ipInfo, setIpInfo] = useState<IpInfo>({
        ip: "",
        countryName: "",
        countryCode: "",
        postal: "",
        city: "",
        timezone: ""
    });

    useEffect(() => {
        const getGeoInfo = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                if (!response.ok) {
                    throw new Error("Unable to retrieve geolocation data");
                }
                const data = await response.json();
                setIpInfo({
                    ...ipInfo,
                    ip: data.ip,
                    countryName: data.country_name,
                    countryCode: data.country_calling_code,
                    postal: data.postal,
                    city: data.city,
                    timezone: data.timezone
                });
            } catch (error) {
                console.error(error);
            }
        };
        getGeoInfo();
    }, []);

    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [countryCode, setCountryCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [deliveryMethod, setDeliveryMethod] = useState<string>("Collect");

    useEffect(() => {
        setZipCode(ipInfo.postal);
        setCity(ipInfo.city.split(" ")[0]);
        setCountry(ipInfo.countryName);
        setCountryCode(ipInfo.countryCode);
    }, [ipInfo]);

    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [firstNameValid, setFirstNameValid] = useState<boolean>(false);
    const [lastNameValid, setLastNameValid] = useState<boolean>(false);
    const [addressValid, setAddressValid] = useState<boolean>(false);
    const [zipCodeValid, setZipCodeValid] = useState<boolean>(false);
    const [cityValid, setCityValid] = useState<boolean>(false);
    const [countryValid, setCountryValid] = useState<boolean>(false);
    const [countryCodeValid, setCountryCodeValid] = useState<boolean>(false);
    const [phoneValid, setPhoneValid] = useState<boolean>(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setEmail(input);
        setEmailValid(validator.isEmail(input));
    };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setFirstName(input);
        setFirstNameValid(validator.isAlpha(input));
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setLastName(input);
        setLastNameValid(validator.isAlpha(input));
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setAddress(input);
        setAddressValid(input.trim().length > 0);
    };

    const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setZipCode(input);
        setZipCodeValid(validator.isPostalCode(input, "any"));
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setCity(input);
        setCityValid(input.trim().length > 0);
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setCountry(input);
        setCountryValid(input.trim().length > 0);
    };

    const handleCountryCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setCountryCode(input);
        setCountryCodeValid(input.trim().length > 0);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setPhone(input);
        setPhoneValid(validator.isMobilePhone(input, "any"));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setDeliveryMethod(input);
    };

    if(emailValid && firstNameValid && lastNameValid && addressValid && zipCodeValid && cityValid && countryValid && countryCodeValid && phoneValid) {
        props.setIsCheckoutReady(true);
    }

    return (
        <Grid className="checkoutForm" style={{ maxHeight: 750 }} container spacing={1} columns={12}>

            <Grid item className="GridItem" xs={12} style={{ textAlign: "center" }}>
                <h3>{props.ls.currentLanguage.CheckoutFormTitle}</h3>
            </Grid>

            <Grid item className="GridItem" xs={12}>
                {/* Email */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="Email">{props.ls.currentLanguage.CheckoutFormEmailLabel}</InputLabel>
                    <Input id="Email" type="text" onChange={handleEmailChange} />
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={6} md={6}>
                {/* Fornavn */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="FirstName">{props.ls.currentLanguage.CheckoutFormFirstNameLabel}</InputLabel>
                    <Input id="FirstName" type="text" onChange={handleFirstNameChange} />
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={6} md={6}>
                {/* Efternavn */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="LastName">{props.ls.currentLanguage.CheckoutFormLastNameLabel}</InputLabel>
                    <Input id="LastName" type="text" onChange={handleLastNameChange} />
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={12} md={12}>
                {/* Vej/Gade & Husnummer */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="Street">{props.ls.currentLanguage.CheckoutFormAddressLabel}</InputLabel>
                    <Input id="Street" type="text" onChange={handleAddressChange} />
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={6} md={6}>
                {/* Postnummer */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="Postal">{props.ls.currentLanguage.CheckoutFormZipCodeLabel}</InputLabel>
                    <Input id="Postal" type="number" value={zipCode} onChange={handleZipCodeChange} />
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={6} md={6}>
                {/* By*/}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="City">{props.ls.currentLanguage.CheckoutFormCityLabel}</InputLabel>
                    <Input id="City" type="text" value={city} onChange={handleCityChange} />
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={12} md={12}>
                {/* Land */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="Country">{props.ls.currentLanguage.CheckoutFormCountryLabel}</InputLabel>
                    <Input id="Country" type="text" value={country} onChange={handleCountryChange} />
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={3} md={3}>
                {/* Landekode */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="CountryCode">{props.ls.currentLanguage.CheckoutFormCountryCodeLabel}</InputLabel>
                    <Input id="CountryCode" type="text" value={countryCode} onChange={handleCountryCodeChange} />
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={9} md={9}>
                {/* Tlf */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="PhoneNumber">{props.ls.currentLanguage.CheckoutFormPhoneLabel}</InputLabel>
                    <Input id="PhoneNumber" type="number" onChange={handlePhoneChange} />
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={9} md={9}>
                {/* Delivery Options */}
                <FormControl className="GridFormControl" margin="normal">
                    <FormLabel htmlFor="DeliverMethod">{props.ls.currentLanguage.CheckoutFormDeliveryLabel}</FormLabel>
                    <RadioGroup
                        id="DeliverMethod"
                        onChange={handleChange}>
                        <FormControlLabel value="Collect" control={<Radio />} label={props.ls.currentLanguage.CheckoutFormDeliveryOptionCollectLabel} />
                        <FormControlLabel value="Ship" control={<Radio />} label={props.ls.currentLanguage.CheckoutFormDeliveryOptionSendLabel} />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default observer(UserDetailForm);