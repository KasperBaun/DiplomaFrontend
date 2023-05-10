import React from "react";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { CssBaseline, Grid, Typography, Link, Stack } from "@mui/material";
import { Call, Email, Facebook, Instagram } from "@mui/icons-material";
import { Constants } from "@utils/Constants";
import { NavLink } from "react-router-dom";

export const Footer: React.FC = observer(function Footer() {

  const { languageStore } = useContext(MobXContext);
  let year = new Date().getFullYear();

  const iconStyling: React.CSSProperties = {
    height: '28px',
    width: '28px'
  };

  return (

    <Grid container spacing={1} marginTop={1} style={{ backgroundColor: Constants.groenlundGreenColor }}>
      <CssBaseline />

      {/* Company name and adress */}
      <Grid item xs={12} >
        <Typography variant="h5" color="white" align="center">{Constants.companyName}</Typography>
        <Typography variant="body1" color="white" align="center">{Constants.companyAdress}</Typography>
      </Grid>

      {/* Links */}
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} justifyContent={'center'}>
          <CustomNavLink url={"/"} value={languageStore.currentLanguage.HomeTabText} />
          <CustomNavLink url={"/faq"} value={languageStore.currentLanguage.FAQTabText} />
          <CustomNavLink url={"/aboutUs"} value={languageStore.currentLanguage.AboutUsTabText} />
          <CustomNavLink url={"/contact"} value={languageStore.currentLanguage.ContactTabText} />
          <CustomLink url={Constants.companyUrl} value={languageStore.currentLanguage.OldPageText} target="_blank" />
        </Stack >
      </Grid>

      {/* Icons */}
      <Grid item xs={12}>
        <Stack direction="row" spacing={1} justifyContent={'center'}>
          <CustomLink url={Constants.facebookUrl} value={<Facebook sx={iconStyling} />} target="_blank" />
          <CustomLink url={Constants.instagramUrl} value={<Instagram sx={iconStyling} />} target="_blank" />
          <CustomLink url={`tel: ${Constants.companyTelephoneNumber}`} value={<Call sx={iconStyling} />} />
          <CustomLink url={`mailto:${Constants.companyEmail}`} value={<Email sx={iconStyling} />} target="_blank" />
        </Stack >
      </Grid>

      {/* Copyright */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
        <CustomNavLink url={"/backoffice"} value={"© " + year} />
      </Grid>
    </Grid>
  )
})

type CustomLinkProps = {
  url: string;
  value: string | JSX.Element;
  target?: string;
}

const CustomLink: React.FC<CustomLinkProps> = (props: CustomLinkProps) => {

  const { url, value, target } = props;

  return (
    <Link
      href={url}
      target={target}
      rel="norefferer"
      sx={{
        color: Constants.primaryTextColor,
        textDecoration: 'none',
        '&:hover': {
          color: "#dc8665"
        },
      }}
    >
      {value}
    </Link>
  )
}

const CustomNavLink: React.FC<CustomLinkProps> = (props: CustomLinkProps) => {

  const { url, value, target } = props;

  return (
    <NavLink
      to={url}
      className={({ isActive, isPending }) => {
        return navLinkStyling(isActive, isPending)
      }}
      target={target}
      rel="norefferer"
      color={Constants.primaryTextColor}
    >
      {value}
    </NavLink>
  )
}

const navLinkStyling = (isActive: boolean, isPending: boolean): string => {
  let result = 'header-links';
  if (isActive) {
    result += ' active';

  } else {
    result += ' inactive';
  }
  return result;
}