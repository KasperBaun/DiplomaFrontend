import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom";

interface ICategoriesPageProps {

}

const CategoriesPage: React.FC<ICategoriesPageProps> = observer(function Categories(props: ICategoriesPageProps) {
    const { number } = useParams();
    return (
        <div>
            <h1>CategoriesPage</h1>
            {number && <p>
                The number is  {number}</p>
            }
        </div>
    )

});

export default CategoriesPage;