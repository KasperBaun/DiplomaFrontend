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
import { ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright';
import GroendlundLogo from '@components/svgs/GroenlundLogo';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { Avatar, Backdrop } from '@mui/material';
import LoadingLion from '@components/loading/LoadingLion';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import UserLoginDTO from '@models/DTO/UserLoginDTO';
import { NavLink } from 'react-router-dom';
import { useBackofficeMode } from 'styling/mui-theme/backoffice/BackofficeTheme';

export interface ILoginPageProps {
    onLoginClicked: (data: UserLoginDTO) => void;
    onAuthNavClicked: (key: number) => void;
    onForgotPasswordClicked: () => void;
    showBackdrop: boolean;
    setShowBackdrop: (show: boolean) => void;
    backgroundImageUrl: string;
}

const LoginPage: React.FC<ILoginPageProps> = function LoginPage(props: ILoginPageProps) {

    const { languageStore } = useContext<IMobXContext>(MobXContext);
    const { theme } = useBackofficeMode();
    const [email, setEmail] = useState<string>("test@example.com");
    const [password, setPassword] = useState<string>("testPassword1");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setShowBackdrop(true);
        const data: UserLoginDTO = {
            email: email,
            password: password,
        }
        props.onLoginClicked(data);

    };
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
                        backgroundImage: `url(${props.backgroundImageUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: theme.palette.background.default,
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
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={props.showBackdrop}
                            onClick={() => props.setShowBackdrop(false)}
                        >
                            <LoadingLion
                                size={100}
                                color={theme.palette.primary.main}
                            />
                        </Backdrop>

                        <NavLink to={"/"}><GroendlundLogo width={400} color={theme.palette.primary.main} /></NavLink>
                        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
                            <LockOutlined style={{ backgroundColor: theme.palette.primary.main }} />
                        </Avatar>
                        <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label={languageStore.currentLanguage.emailAdress}
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
                                <InputLabel htmlFor="outlined-adornment-password">{languageStore.currentLanguage.password}</InputLabel>
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
                                style={{ backgroundColor: theme.palette.primary.main }}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {languageStore.currentLanguage.signIn}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={() => props.onForgotPasswordClicked} variant="body2">
                                        {languageStore.currentLanguage.forgotPassword}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link onClick={() => props.onAuthNavClicked(1)} variant="body2">
                                        {languageStore.currentLanguage.dontHaveAccount}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default LoginPage;