import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright';
import { Constants } from '@utils/Constants';
import GroendlundLogo from '@components/GroenlundLogo';
import { ILoginData } from '@backoffice/BackOffice';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Avatar } from '@mui/material';

/* This component is taken from https://mui.com/material-ui/getting-started/templates/sign-in-side/ and edited to fit customer */

export interface ILoginPageProps {
    signInText: string;
    forgotPasswordText: string;
    defaultEmailText?: string;
    defaultPasswordText?: string;
    companyName: string;
    companyUrl: string;
    dontHaveAccountText: string;
    onLoginClicked: (data: ILoginData) => void;
}

const theme = createTheme();

const LoginPage: React.FC<ILoginPageProps> = function LoginPage(props: ILoginPageProps) {

    const [email, setEmail] = useState<string>(props.defaultEmailText ? props.defaultEmailText : '');
    const [password, setPassword] = useState<string>(props.defaultPasswordText ? props.defaultPasswordText : '');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: ILoginData = {
            email: email,
            password: password,
        }
        props.onLoginClicked(data);

    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://firmagave-shop.dk/wp-content/uploads/2020/09/Royal-copenhagen-mix-og-match-termokopper-6-stk.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <GroendlundLogo width={400} color={Constants.royalCopenhagenBlueColor} />
                        <Avatar sx={{ m: 1, bgcolor: Constants.royalCopenhagenBlueColor }}>
                            <LockOutlined style={{ backgroundColor: Constants.royalCopenhagenBlueColor }} />
                        </Avatar>
                        <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Address"
                                defaultValue={props.defaultEmailText ? props.defaultEmailText : ''}
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                            <FormControl sx={{}}
                                margin="normal"
                                required
                                fullWidth
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    name="password"
                                    label="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: Constants.royalCopenhagenBlueColor }}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {props.signInText}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        {props.forgotPasswordText}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {props.dontHaveAccountText}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright companyName={props.companyName} companyUrl={props.companyUrl} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default LoginPage;