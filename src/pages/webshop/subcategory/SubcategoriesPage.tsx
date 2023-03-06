import { observer } from "mobx-react-lite"
import { useNavigate, useLocation, Routes, Route, useParams } from 'react-router-dom';
import { useContext } from "react";
import MobXContext from "../../../stores/MobXContext";
import { Card } from "react-bootstrap";

interface ISubcategoriesPageProps {
}

const SubcategoriesPage: React.FC<ISubcategoriesPageProps> = observer(function SubcategoriesPage(props: ISubcategoriesPageProps) {
    const { subCategoryStore } = useContext(MobXContext);   
    // const navigate = useNavigate();
        
    let {id} = useParams();
    const location = useLocation(); 
    const {name} = location.state; 

    if (subCategoryStore.SubCategories) {
        return (
            <div>
                <h1>{id} + {name}</h1>

            <div className="container">
                {subCategoryStore.SubCategories.map((subCategory) => (
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
});

export default SubcategoriesPage;