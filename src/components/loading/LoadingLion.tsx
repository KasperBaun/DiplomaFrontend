import * as React from "react"
import { CircularProgress, Container } from "@mui/material";
import LionLogo from "@components/svgs/LionLogo";

type LoadingLionProps = {
    loadingText?: string;
    size?: number;
    color?: string;
}

export const LoadingLion: React.FC<LoadingLionProps> = (props: LoadingLionProps) => {
    const size: number = props.size ? props.size : 24;
    const color: string = props.color ? props.color : '#000000';

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }} >
            <LionLogo color={props.color} />
            {/* {props.loadingText &&
                <h3 style={{ color: Constants.primaryColor }} >{props.loadingText}</h3>
            } */}
            <CircularProgress
                size={size}
                sx={{
                    color: color,
                }}
            />
        </Container>
    )
}

export default LoadingLion;