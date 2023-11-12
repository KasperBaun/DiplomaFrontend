import { IconButton, Menu, MenuItem, Paper } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Constants } from "@utils/Constants";
import { useNavigate } from "react-router-dom";
import { NavPath } from "@models/Navpath";

type MobileNavProps = {
    navPaths: NavPath[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ navPaths }: MobileNavProps) => {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleClick}
                id="toggle-navigation"
                aria-controls={open ? 'navigation-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >

                <MenuIcon sx={{ color: 'white' }} />
            </IconButton>
            <Paper sx={{ width: '100%', backgroundColor: Constants.primaryColor }}>
                <Menu
                    id="navigation-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'toggle-navigation',
                    }}
                    sx={{ width: '100%' }}
                >
                    {navPaths.map((navItem, index) => (
                        <MenuItem key={navItem.text + index} onClick={() => {
                            handleClose();
                            navigate(navItem.path);
                        }}
                            sx={{ width: '100%' }}>
                            {navItem.text}

                        </MenuItem>
                    ))}
                </Menu>
            </Paper>
        </div>
    )
}