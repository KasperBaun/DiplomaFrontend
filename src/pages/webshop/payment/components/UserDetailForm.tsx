import { Button, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import '../css/payment.scss';
import { LanguageStore } from "@stores/LanguageStore";
import Basket from "@models/Basket";

interface IpInfo {
    ip: string;
    countryName: string;
    countryCode: string;
    postal: string;
    city: string;
    timezone: string;
}

interface IUserDetailFormProps {
    ls : LanguageStore;
}

const UserDetailForm = ( props: IUserDetailFormProps ) => {


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

    /**
     * Email
     * Fornavn
     * Efternavn
     * Vej/Gade & Husnummer
     * Postnummer | By
     * Land (Auto?)
     * Tlf Landekode | Mobil nr. 
     * Btn: Forsæt / Fortsæt til Levering
     */
    return (
        <Grid className="checkoutForm" container spacing={1} columns={12}>

            <Grid item className="GridItem" xs={12} style={{ textAlign: "center"}}>
                <h3>{props.ls.currentLanguage.CheckoutFormTitle}</h3>
            </Grid>

            <Grid item className="GridItem" xs={12}>
                {/* Email */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="Email">{props.ls.currentLanguage.CheckoutFormEmailLabel}</InputLabel>
                    <Input id="Email" type="text"/>
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={12} md={12}>
                {/* Fornavn */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="FirstName">{props.ls.currentLanguage.CheckoutFormFirstNameLabel}</InputLabel>
                    <Input id="FirstName" type="text"/>
                </FormControl>
            </Grid>
            
            <Grid item className="GridItem" xs={12} md={12}>
                {/* Efternavn */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="LastName">{props.ls.currentLanguage.CheckoutFormLastNameLabel}</InputLabel>
                    <Input id="LastName" type="text"/>
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={12} md={12}>
                {/* Vej/Gade & Husnummer */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="Street">{props.ls.currentLanguage.CheckoutFormAddressLabel}</InputLabel>
                    <Input id="Street" type="text"/>
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={6} md={6}>
                {/* Postnummer */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="Postal">{props.ls.currentLanguage.CheckoutFormZipCodeLabel}</InputLabel>
                    <Input id="Postal" type="number" value={ipInfo.postal}/>
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={6} md={6}>
                {/* By*/}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="City">{props.ls.currentLanguage.CheckoutFormCityLabel}</InputLabel>
                    <Input id="City" type="text" value={ipInfo.city.split(" ")[0]}/>
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={12} md={12}>
                {/* Land */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="Country">{props.ls.currentLanguage.CheckoutFormCountryLabel}</InputLabel>
                    <Input id="Country" type="text" value={ipInfo.countryName}/>
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={3} md={3}>
                {/* Landekode */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="CountryCode">{props.ls.currentLanguage.CheckoutFormCountryCodeLabel}</InputLabel>
                    <Input id="CountryCode" type="text" value={ipInfo.countryCode}/>
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={9} md={9}>
                {/* Tlf */}
                <FormControl className="GridFormControl" margin="normal">
                    <InputLabel htmlFor="PhoneNumber">{props.ls.currentLanguage.CheckoutFormPhoneLabel}</InputLabel>
                    <Input id="PhoneNumber" type="text"/>
                </FormControl>
            </Grid>

            <Grid item className="GridItem" xs={12} md={12}>
                {/* Fortsæt Knap */}
                <Button>{props.ls.currentLanguage.CheckoutFormSubmitButton}</Button>
            </Grid>
        </Grid>
    )
}

export default observer(UserDetailForm);