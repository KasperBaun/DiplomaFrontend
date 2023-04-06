import { Box, Typography } from "@mui/material";
import ColorConfigs from "@styles/ColorConfigs";

export interface IHeaderProps {
    title: string;
    subtitle: string;
}

const BackofficeHeader: React.FC<IHeaderProps> = function BackofficeHeader(props: IHeaderProps) {

    return (
        <Box>
            <Typography
                variant="h2"
                color={ColorConfigs.colors.grey[100]}
                fontWeight="bold"
                sx={{ mb: "5px" }}
            >
                {props.title}
            </Typography>
            <Typography
                variant="h5"
                color={ColorConfigs.colors.green[500]}
            >{props.subtitle}</Typography>
        </Box>
    )
}

export default BackofficeHeader;