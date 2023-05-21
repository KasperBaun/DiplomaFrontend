import { Navpath } from "@models/Navpath";
import { ListItemButton, ListItemIcon } from "@mui/material";
import ColorConfigs from "styling/ColorConfigs";

export interface ISidebarItemProps {
    item: Navpath;
    sidebarOpen: boolean;
}

const SidebarItem: React.FC<ISidebarItemProps> = function SidebarItem(props: ISidebarItemProps) {

    return (

        <ListItemButton
            onClick={props.item.navigationClick}
            sx={{
                "&: hover": {
                    backgroundColor: ColorConfigs.sidebar.hoverBg
                },
                backgroundColor: ColorConfigs.sidebar.bg,
                paddingY: "12px",
                paddingX: "24px",
                justifyContent: props.sidebarOpen ? "flex-start" : "center",
                width: '100%',
            }}
        >
            <ListItemIcon sx={{
                color: ColorConfigs.sidebar.color,
                justifyContent: props.sidebarOpen ? "flex-start" : "center",
            }}>
                {props.item.icon && props.item.icon}
            </ListItemIcon>
            {props.item.title}
        </ListItemButton>

    );
};

export default SidebarItem;