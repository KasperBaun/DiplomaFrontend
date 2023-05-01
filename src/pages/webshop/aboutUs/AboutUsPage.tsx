import { observer } from "mobx-react-lite";

interface IAboutUsPage {
}

const AboutUsPage: React.FC<IAboutUsPage> = observer(function AboutUsPage(props: IAboutUsPage) {

return (
<h1> About Us page</h1>
);
});
export default AboutUsPage;
