import { observer } from "mobx-react-lite";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { LanguageStore } from "@stores/LanguageStore";
import React from "react";
import validator from 'validator';
import { CheckoutForm } from "@models/Checkout";
import { Col, Container, Form, Row } from "react-bootstrap";
import MobXContext from "@stores/MobXContext";


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

    
    const { webshopStore } = useContext(MobXContext);

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

    const createCustomer = async () => {
        await webshopStore.createCustomer({
            email: email,
            firstName: firstName,
            lastName: lastName,
            address: address,
            zipCode: zipCode,
            city: city,
            country: country,
            countryCode: countryCode,
            phone: phone
        });
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setEmail(input);
        setEmailValid(validator.isEmail(input));
    };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setFirstName(input);
        setFirstNameValid(validator.isAlpha(input, 'da-DK'));
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setLastName(input);
        setLastNameValid(validator.isAlpha(input, 'da-DK'));
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

    const handleOnInfoCorrectClick = () => {
        if(email !== "" && firstName !== "" && lastName !== "" && address !== "" && zipCode !== "" && city !== "" && country !== "" && countryCode !== "" && phone !== "") {
            createCustomer();
            props.setIsCheckoutReady(true);
        }
    }

    return (
        <Container className="checkoutForm" style={{ maxHeight: 650 }}>

            <Row className="GridItem" xs={12} style={{ textAlign: "center" }}>
                <h3>{props.ls.currentLanguage.CheckoutFormTitle}</h3>
            </Row>

                <Row>
                    <Col xs={12} md={6}>
                        {/* Fornavn */}
                        <Form.Group className="GridFormControl">
                            <Form.Label>{props.ls.currentLanguage.CheckoutFormFirstNameLabel}</Form.Label>
                            <Form.Control type="text"
                                className={firstNameValid ? 'is-valid' : 'is-invalid'}
                                onChange={handleFirstNameChange}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    
                    <Col xs={12} md={6}>
                        {/* Efternavn */}
                        <Form.Group className="GridFormControl">
                            <Form.Label>{props.ls.currentLanguage.CheckoutFormLastNameLabel}</Form.Label> 
                            <Form.Control type="text" className={lastNameValid ? 'is-valid' : 'is-invalid'} 
                            onChange={handleLastNameChange}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    {/* Email */}
                    <Form.Group className="GridFormControl">
                        <Form.Label>{props.ls.currentLanguage.CheckoutFormEmailLabel}</Form.Label>
                        <Form.Control type="text"
                            className={emailValid ? 'is-valid' : 'is-invalid'}
                            onChange={handleEmailChange}>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row>
                    <Col xs={12} md={8}>
                        {/* Vej/Gade & Husnummer */}
                        <Form.Group className="GridFormControl">
                            <Form.Label>{props.ls.currentLanguage.CheckoutFormAddressLabel}</Form.Label>
                            <Form.Control type="text"
                                className={addressValid ? 'is-valid' : 'is-invalid'}
                                onChange={handleAddressChange}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                        {/* Postnummer */}
                        <Form.Group className="GridFormControl">
                            <Form.Label>{props.ls.currentLanguage.CheckoutFormZipCodeLabel}</Form.Label>
                            <Form.Control type="text"
                                className={zipCode.length > 0 ? 'is-valid' : 'is-invalid'}
                                value={zipCode}
                                onChange={handleZipCodeChange}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        {/* By*/}
                        <Form.Group className="GridFormControl">
                            <Form.Label>{props.ls.currentLanguage.CheckoutFormCityLabel}</Form.Label>
                            <Form.Control type="text"
                                className={city.length > 0 ? 'is-valid' : 'is-invalid'}
                                value={city}
                                onChange={handleCityChange}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        {/* Land */}
                        <Form.Group className="GridFormControl">
                            <Form.Label>{props.ls.currentLanguage.CheckoutFormCountryLabel}</Form.Label>
                            <Form.Control type="text"
                                className={country.length > 0 ? 'is-valid' : 'is-invalid'}
                                value={country}
                                onChange={handleCountryChange}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                        {/* Landekode */}
                        <Form.Group className="GridFormControl">
                            <Form.Label>{props.ls.currentLanguage.CheckoutFormCountryCodeLabel}</Form.Label>
                            <Form.Control type="text"
                                className={countryCode.length > 0 ? 'is-valid' : 'is-invalid'}
                                value={countryCode}
                                onChange={handleCountryCodeChange}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        {/* Tlf */}
                        <Form.Group className="GridFormControl">
                            <Form.Label>{props.ls.currentLanguage.CheckoutFormPhoneLabel}</Form.Label>
                            <Form.Control type="number"
                                className={phoneValid ? 'is-valid' : 'is-invalid'}
                                onChange={handlePhoneChange}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        {/* Delivery Options */}
                        <Form.Group className="GridFormControl">
                            <Form.Label>{props.ls.currentLanguage.CheckoutFormDeliveryLabel}</Form.Label>
                            <Form.Check
                                type="radio"
                                name="deliveryOption"
                                id="Collect"
                                value="Collect"
                                checked={deliveryMethod === 'Collect'}
                                onChange={handleChange}
                                label={props.ls.currentLanguage.CheckoutFormDeliveryOptionCollectLabel}
                            />
                            <Form.Check
                                type="radio"
                                name="deliveryOption"
                                id="Ship"
                                value="Ship"
                                checked={deliveryMethod === 'Ship'}
                                onChange={handleChange}
                                label={props.ls.currentLanguage.CheckoutFormDeliveryOptionSendLabel}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                <Form.Check 
                    type="switch"
                    label={"Jeg accepterer at de data jeg har indtastet er korrekte"}
                    onClick={handleOnInfoCorrectClick}
                />
                </Row>
        </Container>
    )
}

export default observer(UserDetailForm);