import { ProductItem } from "@models/ProductItem";
import { ProductItemWeb } from "@models/ProductItemWeb";
import { TextField } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export type ProductSearchBarProps = {
    searchText: string;
    setSearchText: (searchText: string) => void;
    onSearchTextChanged: (searchText: string) => void;
    showSearchBar?: boolean;
    style?: React.CSSProperties;
}

export const ProductSearchBar: React.FC<ProductSearchBarProps> = observer(function ProductSearchBar(props: ProductSearchBarProps) {

    const { languageStore, searchStore } = useContext(MobXContext);
    const { showSearchBar, onSearchTextChanged } = props;

    /* Define state for the searchbar component */
    const { searchText, setSearchText } = props;

    /* Define handlers for actions */
    function handleSearchTextChange(event: any): React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> {
        if (event.target.value === "") {
            onSearchTextChanged(event.target.value);
            setSearchText(event.target.value);
            searchStore.reset();
        }
        onSearchTextChanged(event.target.value);
        setSearchText(event.target.value);
        return;
    }

    function handleEnterKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter") {
            // Enter key was pressed
            onSearchTextChanged(searchText);
        }
    }

    if (!showSearchBar) return null;
    else {
        return (
            <TextField
                label={languageStore.currentLanguage.search}
                type="search"
                variant="outlined"
                placeholder={languageStore.currentLanguage.search.toLowerCase() + "..."}
                value={searchText}
                onChange={handleSearchTextChange}
                sx={props.style ? props.style : {}}
                onKeyDownCapture={handleEnterKeyDown}
            />
        )
    }
});