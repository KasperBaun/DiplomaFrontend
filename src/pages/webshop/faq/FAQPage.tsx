import { Box, Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import { useContext } from "react";

export const FAQPage: React.FC = () => {

    const { languageStore } = useContext(MobXContext);
    const primaryColor = Constants.primaryColor;

    return (
        <Container sx={{ minHeight: '75vh' }}>
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
        </Container>
    )
};