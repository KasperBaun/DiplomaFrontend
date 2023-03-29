import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Constants } from '@utils/Constants';
import Copyright from './Copyright';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import { useContext } from 'react';
import LockOutlined from '@mui/icons-material/LockOutlined';
import UserRegistrationDTO from '@models/DTO/UserRegistrationDTO';

export interface ISignUpProps {
    onAuthNavClicked: (key: number) => void;
}

const theme = createTheme();

const SignUpPage: React.FC<ISignUpProps> = function SignUpPage(props: ISignUpProps) {

    const { languageStore, authStore } = useContext<IMobXContext>(MobXContext);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userRegDTO: UserRegistrationDTO = {
            email: data.get('email').toString(),
            firstName: data.get('firstName').toString(),
            lastName: data.get('lastName').toString(),
            password: data.get('password').toString()
        };
        try {
            await authStore.registerUser(userRegDTO);
            console.log("User successfully registered");
            // TODO - Create snack here or similar to inform user of success
            props.onAuthNavClicked(0);

        } catch (exception) {
            console.log(exception);
            console.log("Unable to register user");
            // TODO - Create snack here or similar to inform user of failure

        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: Constants.primaryColor }}>
                        <LockOutlined style={{ backgroundColor: Constants.primaryColor }} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {languageStore.currentLanguage.signUpText}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label={languageStore.currentLanguage.firstName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label={languageStore.currentLanguage.lastName}
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label={languageStore.currentLanguage.emailAdress}
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label={languageStore.currentLanguage.password}
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: Constants.primaryColor }}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {languageStore.currentLanguage.signUpText}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => props.onAuthNavClicked(0)} variant="body2">
                                    {languageStore.currentLanguage.alreadyHaveAccountText}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}

export default SignUpPage;