import { observer } from "mobx-react-lite"
import GroendlundLogo from "@components/GroenlundLogo"
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";

interface IHomePageProps {

}

const HomePage: React.FC<IHomePageProps> = observer(function HomePage(props: IHomePageProps) {

    const { languageStore } = useContext(MobXContext);

    return (
        <div>
            <GroendlundLogo color={"rgba(19, 128, 134, 1)"} />
            <h1 style={{ textAlign: "center" }}>{languageStore.currentLanguage.aboutUs}</h1>
        </div>
    )

});

export default HomePage;