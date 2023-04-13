import { LanguageStore } from "@stores/LanguageStore";
import { Dispatch, SetStateAction } from "react";
import { AnalyticsOutlined, CreateNewFolderOutlined, DashboardOutlined, InventoryOutlined, PaymentsOutlined, PlaylistAdd, ReceiptLongOutlined, TravelExploreOutlined } from "@mui/icons-material";
import { Navpath } from "@models/Navpath";

export function createNavPaths(languageStore: LanguageStore, setNavKey: Dispatch<SetStateAction<number>>, sidebarOpen?: boolean, iconStyling?: React.CSSProperties): Navpath[] {
    const paths: Navpath[] =
        [
            {
                navigationClick: () => setNavKey(0),
                title: sidebarOpen ? languageStore.currentLanguage.BackOfficeTabText : '',
                icon: <DashboardOutlined style={iconStyling ? iconStyling : {}} />,
            },
            {
                navigationClick: () => setNavKey(0),
                title: sidebarOpen ? languageStore.currentLanguage.AnalyticsTabText : '',
                icon: <AnalyticsOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(6),
                title: sidebarOpen ? languageStore.currentLanguage.SalesTabText : '',
                icon: <PaymentsOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(5),
                title: sidebarOpen ? languageStore.currentLanguage.InventoryTabText : '',
                icon: <InventoryOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(7),
                title: sidebarOpen ? languageStore.currentLanguage.OrdersTabText : '',
                icon: <ReceiptLongOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(4),
                title: sidebarOpen ? languageStore.currentLanguage.ProductSniperTabText : '',
                icon: <TravelExploreOutlined style={iconStyling ? iconStyling : {}} />
            },
            {
                navigationClick: () => setNavKey(1),
                title: sidebarOpen ? languageStore.currentLanguage.CatalogTabText : '',
                icon: <CreateNewFolderOutlined style={iconStyling ? iconStyling : {}} />,
                child: [
                    {
                        navigationClick: () => setNavKey(1),
                        title: sidebarOpen ? languageStore.currentLanguage.CategoriesTabText : '',
                        icon: <PlaylistAdd style={iconStyling ? iconStyling : {}} />,
                    },
                    {
                        navigationClick: () => setNavKey(2),
                        title: sidebarOpen ? languageStore.currentLanguage.SubCategoriesTabText : '',
                        icon: <PlaylistAdd style={iconStyling ? iconStyling : {}} />
                    },
                    {
                        navigationClick: () => setNavKey(3),
                        title: sidebarOpen ? languageStore.currentLanguage.ProductTabText : '',
                        icon: <PlaylistAdd style={iconStyling ? iconStyling : {}} />
                    }
                ]
            },

        ];

    return paths;
}