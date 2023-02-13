import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom";
import categories from "../../../models/categories";

interface ICategoriesPageProps {
    categoryList?: categories[]
}

const CategoriesPage: React.FC<ICategoriesPageProps> = observer(function Categories(props: ICategoriesPageProps) {
    const { number } = useParams();
    return (
        <div>
            <div>

            </div>

            <div>
                <h1>CategoriesPage</h1>
                {number && <p>
                    The number is  {number}</p>
                }
            </div>
        </div>
    )

});

export default CategoriesPage;