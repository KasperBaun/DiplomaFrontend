import { observer } from "mobx-react-lite"
import GroendlundLogo from "@components/GroenlundLogoTextAndLion"

interface IHomePageProps {

}

const HomePage: React.FC<IHomePageProps> = observer(function HomePage(props: IHomePageProps) {

    return (
        <div>
            <GroendlundLogo color={"rgba(19, 128, 134, 1)"} />
            <h1 style={{textAlign:"center"}}>HomePage</h1>
        </div>
    )

});

export default HomePage;