import * as React from "react"
import { CircularProgress, Container } from "@mui/material";

export interface ILoadingProps {
    size?: number;
    color?: string;
}

export const Loading: React.FC<ILoadingProps> = (props: ILoadingProps) => {
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

            <CircularProgress
                size={size}
                sx={{
                    color: color,
                }}
            />
        </Container>
    )
}

export default Loading;