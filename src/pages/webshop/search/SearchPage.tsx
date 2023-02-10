import { observer } from "mobx-react-lite"

interface ISearchPageProps {

}

const SearchPage: React.FC<ISearchPageProps> = observer(function SearchPage(props: ISearchPageProps) {

    return (
        <h1>SearchPage</h1>
    )

});

export default SearchPage;