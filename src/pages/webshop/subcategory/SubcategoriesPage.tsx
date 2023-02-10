import { observer } from "mobx-react-lite"

interface ISubcategoriesPageProps {

}

const SubcategoriesPage: React.FC<ISubcategoriesPageProps> = observer(function SubcategoriesPage(props: ISubcategoriesPageProps) {

    return (
        <h1>Subcategories</h1>
    )

});

export default SubcategoriesPage;