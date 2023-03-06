import Category from "@models/Category";
import { observer } from "mobx-react-lite"
import { useContext } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

import MobXContext from "../../../stores/MobXContext";
import './CategoriesPage.scss';

interface ICategoriesPageProps {
}


const CategoriesPage: React.FC<ICategoriesPageProps> = observer(function Categories(props: ICategoriesPageProps) {

    const { categoryStore } = useContext(MobXContext);
    const navigate = useNavigate();

    function handleClick(category: Category, name : String) {
        navigate('/subcategories/' + category.id , { state: { name } })
    }

    if (categoryStore.Categories) {
        return (
            <div className="container">
                {categoryStore.Categories.map((category) => (
                    <div className="col-20">
                        <Card border="primary" onClick={() => handleClick(category, category.name)}>
                            <Card.Body>
                                <img src={category.imageUrl} className='img-fluid shadow-4' alt='...' />
                            </Card.Body>
                            <Card.Footer> {category.name.toString()}</Card.Footer>
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
       else {
        return (
            <h1>Loading...</h1>
        )
    }

});

export default CategoriesPage;