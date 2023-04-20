import "./footer.scss";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import FooterIcons from "./FooterIcons";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import { Box, CssBaseline, Typography, Container } from "@mui/material";

const Footer: React.FC = observer(function Footer() {

  let year = new Date().getFullYear();

  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const distanceFromBottom = documentHeight - (windowHeight + scrollTop);
      if (distanceFromBottom <= 0) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const body = document.getElementsByTagName("body")[0];
      body.style.minHeight = window.innerHeight + "px";
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (

          <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2rem',
      }}
    >
      <CssBaseline />

      <Box className="footer"
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}>
        <Container maxWidth="sm">
        <FooterContact />          
          <FooterLinks />
          <FooterIcons />
          <p style={{ color: "#FFF" }} className="footer-company-name">© {year}</p>
        </Container>
      </Box>
    </Box>
  )
})

export default Footer;