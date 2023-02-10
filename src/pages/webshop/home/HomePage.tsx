import { observer } from "mobx-react-lite"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

interface IHomePageProps {

}

const HomePage: React.FC<IHomePageProps> = observer(function HomePage(props: IHomePageProps) {

    return (
        <h1>HomePage</h1>
    )

});

export default HomePage;