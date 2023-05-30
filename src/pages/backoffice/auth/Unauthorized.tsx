import { Container, Typography } from "@mui/material";

export const Unauthorized: React.FC = () => {
    return (
        <Container style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', marginTop: '30px', flexDirection: 'column' }}>
            <Typography variant="h1" component="h2" gutterBottom style={{ display: 'flex', justifyContent: 'center' }}> You shall not pass! </Typography>
            <img style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }} alt="Background for login page" src="https://i.kym-cdn.com/entries/icons/original/000/002/144/You_Shall_Not_Pass!_0-1_screenshot.jpg" />
        </Container>
    )
}