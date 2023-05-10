import { Box, Card, CardContent, CardHeader, Container, Grid, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import { useContext } from "react";

export const FAQPage: React.FC = () => {

    const { languageStore } = useContext(MobXContext);
    const primaryColor = Constants.primaryColor;

    return (
        <Container sx={{ paddingTop: '20px' }}>
            <Typography variant="h1" color={primaryColor} align="center">FAQ</Typography>
            <Typography variant="body1" color={primaryColor} align="center">"Frequently asked questions"</Typography>
            <Box mt={4}>
                <Card>
                    <CardHeader title={languageStore.currentLanguage.faq_text} />
                    <CardContent>
                        <Typography variant="h6">{languageStore.currentLanguage.q1_text}</Typography>
                        <Typography variant="body1">{languageStore.currentLanguage.q1_answer}</Typography>
                        <Typography variant="h6">{languageStore.currentLanguage.q2_text}</Typography>
                        <Typography variant="body1">{languageStore.currentLanguage.q2_answer}</Typography>
                        <Typography variant="h6">{languageStore.currentLanguage.q3_text}</Typography>
                        <Typography variant="body1">{languageStore.currentLanguage.q3_answer}</Typography>
                    </CardContent>
                </Card>
            </Box>
            <Grid container display={'flex'}>
                <Grid item xs={12}>
                    Køb/Levering

                    Sådan køber du hos Grønlund Antik:



                    1:

                    Find den eller de varer du ønsker at købe og læg dem i kurven.



                    2:

                    Vælg mellem at få varerne tilsendt eller afhentning i vores butik på Gammel Kongevej 94a, 1850 Frederiksberg.

                    Afhentning kan ske fra tirsdag til lørdag i butikkens åbningstid. Afhentning af antik/porcelæn kan tidligst ske 48 timer efter bestillingen, da varerne kan være på vores fjernlager. Vi sender dig en mail, når vi har varen i butikken og den er klar til afhentning.



                    3:

                    Du kan betale med Visakort, Mobilepay eller bankoverførsel. Vælger du bankoverførsel så vælg venligst skraksoverførsel, hvis det er muligt så din vare kan komme hurtigere afsted.



                    4:

                    Betaling online kan ske med Bankoverførelse, Visakort eller Mobilepay.

                    Ved afhentning kan der også betales i butikken med dankort, Visakort, kontanter og Mobilepay.





                    Ved bankoverførsel - husk venligst at skrive dit ordrenummer i feltet.

                    Bank: Nykredit

                    Reg. Nr.: 5479

                    Konto nr.: 0006908281



                    Accountholder: Grønlund Antik APS

                    Account: 54796908281

                    IBAN kontonummer: DK5554790006908281

                    SWIFT-adresse/BIC: NYKBDKKK

                    Bank name: Nykredit Bank

                    Adress: Jægersborg Alle 36, 2920 Charlottenlund, Denmark



                    Levering:

                    Vi sender udelukkende med GLS i Danmark og til din nærmeste GLS pakkeshop.

                    Vi sender altid alle pakker hurtigst muligt. Og vi har ansvaret for at din vare kommer hel frem.



                    Returnering:

                    Ifølge gældende lovgivning så har man 14 dages fortrydelsesret ved onlinekøb.

                    Kontant os inden du leverer varen tilbage.

                    Varen skal leveres tilbage i samme stand som den er købt i.

                    Vælger man at sende varen retur med posten, hæfter man selv for omkostninger til dette. Du kan også returnere varen i butikken, men det vil ikke være muligt at få pengene tilbage før en af vores eksperter har kigget den igennem.

                    Returvaren skal sendes til vores butik Grønlund Antik på Gammel Kongevej 94a, 1850 Frederiksberg og ikke til en pakkeshop, da vi ikke har mulighed for at afhente pakker i pakkeshops.
                </Grid>
            </Grid>
        </Container>
    )
};