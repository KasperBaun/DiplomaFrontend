import { Notifications } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import ColorConfigs from "@styles/ColorConfigs";

const Topbar: React.FC = function Topbar() {
    return (
        <Paper
            sx={{
                background: ColorConfigs.topbar.bg,
                color: ColorConfigs.topbar.color,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                padding: '5px',
                borderRadius: 0,
                // borderBottomLeftRadius: '4px',
                // borderBottomRightRadius: '4px',
            }}
        >
            <Typography variant="h6" sx={{ marginRight: '20px' }}>
                Appbar for notifications / Settings and other stuff
            </Typography>
            <Notifications sx={{ marginRight: '20px' }} />
        </Paper>
    );
};

export default Topbar;