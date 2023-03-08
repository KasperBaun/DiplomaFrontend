import { observer } from "mobx-react-lite"
import { useNavigate, useLocation, Routes, Route, useParams } from 'react-router-dom';
import { useContext } from "react";
import MobXContext from "../../../stores/MobXContext";
import { Card } from "react-bootstrap";

interface ISubcategoriesPageProps {
}

const SubcategoriesPage: React.FC<ISubcategoriesPageProps> = observer(function SubcategoriesPage(this: any, props: ISubcategoriesPageProps) {
    const { subCategoryStore } = useContext(MobXContext);   
    // const navigate = useNavigate();
    const { languageStore } = useContext(MobXContext);

    let {id} = useParams();
    const location = useLocation(); 
    const {name} = location.state; 
    const subCategories = (subCategoryStore.subCategoriesByCategoryID(Number(id)))

    if (subCategories.length > 0){
        return (
            <div>
                <h1>{name}</h1>

            <div className="container">
                {subCategories.map((subCategory) => (
                    <div className="col-20">
                        <Card border="primary">
                            <Card.Body>
                                <img src={subCategory.imageUrl} className='img-fluid shadow-4' alt='...' />
                            </Card.Body>
                            <Card.Footer> {subCategory.name.toString()}</Card.Footer>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
        )
    }
    else {
        return(
            <div>
                <h1>{name}</h1>
                <h3>{languageStore.currentLanguage.noSubCategoriesToShow} </h3>
            </div>
        )
    }
});

export default SubcategoriesPage;