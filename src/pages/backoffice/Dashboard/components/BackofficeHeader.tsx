import { Box, Typography } from "@mui/material";

export interface IHeaderProps {
    title: string;
    subtitle: string;
}

const BackofficeHeader: React.FC<IHeaderProps> = function BackofficeHeader(props: IHeaderProps) {

    return (
        <Box>
            <Typography
                variant="h2"
                fontWeight="bold"
                sx={{ mb: "5px" }}
            >
                {props.title}
            </Typography>
            <Typography
                variant="h5"
            >{props.subtitle}</Typography>
        </Box>
    )
}

export default BackofficeHeader;