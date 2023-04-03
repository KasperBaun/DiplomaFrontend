import { AppBar, Toolbar, Typography } from "@mui/material";
import ColorConfigs from "@styles/ColorConfigs";
import SizeConfigs from "@styles/SizeConfigs";

const Topbar: React.FC = function Topbar() {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${SizeConfigs.sidebarOpen.width})`,
                ml: SizeConfigs.sidebarOpen.width,
                boxShadow: "unset",
                backgroundColor: ColorConfigs.topbar.bg,
                color: ColorConfigs.topbar.color
            }}
        >
            <Toolbar>
                <Typography variant="h6">
                    React sidebar with dropdown
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;