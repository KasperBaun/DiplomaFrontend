import Link from "@mui/material/Link/Link";
import Typography from "@mui/material/Typography/Typography";

export interface ICopyrightProps {
    companyName: string;
    companyUrl: string;
}

const Copyright: React.FC<ICopyrightProps> = function Copyright(props: ICopyrightProps) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
            {'Copyright © '}
            <Link color="inherit" href={props.companyUrl}>
                {props.companyName}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;