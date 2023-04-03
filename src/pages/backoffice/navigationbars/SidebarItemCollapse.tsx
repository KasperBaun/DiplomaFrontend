import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem, { ISidebarItemProps } from "./SidebarItem";
import { INavpath } from "./INavpath";
import ColorConfigs from "@styles/ColorConfigs";

export interface ISidebarItemCollapseProps {
    item: INavpath;
}

const SidebarItemCollapse: React.FC<ISidebarItemProps> = function SidebarItemCollapse(props: ISidebarItemProps) {
    const [open, setOpen] = useState(false);

    return (

        <>
            <ListItemButton
                onClick={() => setOpen(!open)}
                sx={{
                    "&: hover": {
                        backgroundColor: ColorConfigs.sidebar.hoverBg
                    },
                    paddingY: "12px",
                    paddingX: "24px"
                }}
            >
                <ListItemIcon sx={{
                    color: ColorConfigs.sidebar.color
                }}>
                    {props.item.icon && props.item.icon}
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography>
                            {props.item.title}
                        </Typography>
                    }
                />
                {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <List>
                    {props.item.child && props.item.child.map((navpath, index) => (
                        
                            navpath.child ? (
                                <SidebarItemCollapse item={navpath} key={index} />
                            ) : (
                                <SidebarItem item={navpath} key={index} />
                            )
                        
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default SidebarItemCollapse;