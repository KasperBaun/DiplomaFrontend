import { observer } from "mobx-react-lite"
import { Routes, Route, useParams } from 'react-router-dom';

interface ISubcategoriesPageProps {

}

const SubcategoriesPage: React.FC<ISubcategoriesPageProps> = observer(function SubcategoriesPage(props: ISubcategoriesPageProps) {
    let {id} = useParams();
    

    return (
        <h1>Subcategories + {id}</h1>
    )

});

export default SubcategoriesPage;