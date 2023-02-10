import { observer } from "mobx-react-lite"

interface IProductPageProps {

}

const ProductPage: React.FC<IProductPageProps> = observer(function ProductPage(props: IProductPageProps) {

    return (
        <h1>ProductPage</h1>
    )

});

export default ProductPage;