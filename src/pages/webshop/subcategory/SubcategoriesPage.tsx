import { observer } from "mobx-react-lite"
import { useLocation, useParams } from 'react-router-dom';
import { useContext } from "react";
import MobXContext from "../../../stores/MobXContext";
import { Card, Container } from "react-bootstrap";

const SubCategoriesPage: React.FC = observer(function SubCategoriesPage(this: any) {
    const { subCategoryStore } = useContext(MobXContext);   
    const { languageStore } = useContext(MobXContext);

    let {id} = useParams();
    const location = useLocation(); 
    const {name} = location.state; 
    const subCategories = (subCategoryStore.subCategoriesByCategoryID(Number(id)))

    if (subCategories.length > 0)
        return (
            <Container>
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
            </Container>
        )
    else
        return(
            <Container>
                <h1>{name}</h1>
                <h3>{languageStore.currentLanguage.noSubCategoriesToShow} </h3>
            </Container>
        )
})

export default SubCategoriesPage;