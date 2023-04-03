import { ListItemButton, ListItemIcon } from "@mui/material";
import { INavpath } from "./INavpath";
import ColorConfigs from "@styles/ColorConfigs";

export interface ISidebarItemProps {
    item: INavpath;
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
                paddingX: "24px"
            }}
        >
            <ListItemIcon sx={{
                color: ColorConfigs.sidebar.color
            }}>
                {props.item.icon && props.item.icon}
            </ListItemIcon>
            {props.item.title}
        </ListItemButton>

    );
};

export default SidebarItem;