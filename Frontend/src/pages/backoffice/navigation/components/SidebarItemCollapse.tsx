import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { SidebarItem } from "./SidebarItem";
import ColorConfigs from "styling/ColorConfigs";
import { Navpath } from "@models/Navpath";
import { observer } from "mobx-react-lite";

type Props = {
    item: Navpath;
    sidebarOpen: boolean;
}

export const SidebarItemCollapse: React.FC<Props> = observer((props: Props) => {
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
                    paddingX: "24px",
                    justifyContent: props.sidebarOpen ? "flex-start" : "center"
                }}
            >
                <ListItemIcon sx={{
                    color: ColorConfigs.sidebar.color,
                    justifyContent: props.sidebarOpen ? "flex-start" : "center",
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
                            <SidebarItemCollapse item={navpath} sidebarOpen={props.sidebarOpen} key={index} />
                        ) : (
                            <SidebarItem item={navpath} sidebarOpen={props.sidebarOpen} key={index} />
                        )

                    ))}
                </List>
            </Collapse>
        </>
    );
});
