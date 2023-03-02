import { observer } from "mobx-react-lite"
import { useContext } from "react";
import { Card } from "react-bootstrap";

import MobXContext from "../../../stores/MobXContext";
import './CategoriesPage.scss';

interface ICategoriesPageProps {
}


const CategoriesPage: React.FC<ICategoriesPageProps> = observer(function Categories(props: ICategoriesPageProps) {

    const { categoryStore } = useContext(MobXContext);

    if (categoryStore.Categories) {
        return (

            <div className="container">
                {categoryStore.Categories.map((index) => (
                    <div className="col-20">
                        <Card border="primary">
                            <Card.Body>
                                <img src={index.imageUrl} className='img-fluid shadow-4' alt='...' />
                            </Card.Body>
                            <Card.Footer> {index.name.toString()}</Card.Footer>
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