import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Category from "../../../models/Category";
import MobXContext from "../../../stores/MobXContext";
import './CategoriesPage.scss';

interface ICategoriesPageProps {
}


const CategoriesPage: React.FC<ICategoriesPageProps> = observer(function Categories(props: ICategoriesPageProps) {

    const { categoryStore } = useContext(MobXContext);
    const [categories, setCategories] = useState<Category[]>(null);

    useEffect(() => {
        const getCategoryModel = async () => {
            try {
                setCategories(await categoryStore.getCategories())
            }
            catch (err) {
                console.log(err);
            }
        }
        getCategoryModel();
    }, [categoryStore])

    if (categories) {
        return (

            <div className="container">
            {categories.map((index) => (
              <div className="col-20">
                <Card border="primary">
                  <Card.Body>
                    <img src={index.imageUrl} className='img-fluid shadow-4' alt='...'/>
                  </Card.Body>
                  <Card.Footer> {index.name.toString()}</Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        ) }

   /* if (categories) {
        return (
            <div>
                {categories.map((index) => (
                    <h2> {index.name.toString()}</h2>
                ))}
                <Button onClick={() => createCategory(category)}></Button>
            </div>
        );
    } */ 

    else {
        return (
            <h1>Loading...</h1>
        )
    }

});

export default CategoriesPage;