import Link from "@mui/material/Link/Link";
import Typography from "@mui/material/Typography/Typography";
import { Constants } from "@utils/Constants";


const Copyright: React.FC = function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
            {'Copyright © '}
            <Link color="inherit" href={Constants.companyUrl}>
                {Constants.companyName}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;