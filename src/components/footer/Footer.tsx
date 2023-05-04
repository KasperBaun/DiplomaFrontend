import React from "react";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { CssBaseline, Grid, Typography, Link, Stack } from "@mui/material";
import { Call, Email, Facebook, Instagram } from "@mui/icons-material";
import { Constants } from "@utils/Constants";

export const Footer: React.FC = observer(function Footer() {

  const { languageStore } = useContext(MobXContext);
  let year = new Date().getFullYear();

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
          <CustomLink url={"/"} value={languageStore.currentLanguage.HomeTabText} />
          <CustomLink url={"/aboutUs"} value={languageStore.currentLanguage.FAQTabText} />
          <CustomLink url={"/aboutUs"} value={languageStore.currentLanguage.AboutUsTabText} />
          <CustomLink url={"/aboutUs"} value={languageStore.currentLanguage.ContactTabText} />
          <CustomLink url={Constants.companyUrl} value={languageStore.currentLanguage.OldPageText} target="_blank" />
        </Stack >
      </Grid>

      {/* Icons */}
      <Grid item xs={12}>
        <Stack direction="row" spacing={1} justifyContent={'center'}>
          <CustomLink url={Constants.facebookUrl} value={<Facebook />} target="_blank" />
          <CustomLink url={Constants.instagramUrl} value={<Instagram />} target="_blank" />
          <CustomLink url={`tel: ${Constants.companyTelephoneNumber}`} value={<Call />} />
          <CustomLink url={`mailto:${Constants.companyEmail}`} value={<Email />} target="_blank" />
        </Stack >
      </Grid>

      {/* Copyright */}
      <Grid item xs={12} >
        <Typography variant="body1" color="white" align="center">© {year}</Typography>
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
    <Link href={url} target={target} rel="norefferer" color={Constants.primaryTextColor}>
      {value}
    </Link>
  )

}