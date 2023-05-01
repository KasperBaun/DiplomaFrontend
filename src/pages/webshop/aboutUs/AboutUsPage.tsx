import { observer } from "mobx-react-lite";
import './AboutUsPage.scss';
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
/*Auther: CHAT-GPT*/

interface IAboutUsPage {
}
  
const AboutUsPage: React.FC<IAboutUsPage> = observer(function AboutUsPage(props: IAboutUsPage) {
    const {languageStore } = useContext(MobXContext);

    return (
        <div className="about-us-page">
          <img
            src="https://static.wixstatic.com/media/c38ac4_26cf61b8381d4f38a1fd2838b6d564b0~mv2.jpeg/v1/fill/w_443,h_591,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_6367.jpeg"
            className="about-us-page__image"
            alt="Webshop storefront"
          />
          <p className="about-us-page__description">
            {languageStore.currentLanguage.copanyDescription}
          </p>
          <div className="about-us-page__info-wrapper">
            <div className="about-us-page__info-column">
              <h3 className="about-us-page__info-title">{languageStore.currentLanguage.openingDays}</h3>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.MondayText} : {languageStore.currentLanguage.ClosedText}</p>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.TuesdayText} : 12.00-17.00</p>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.WendsayText} : 13.00-18.00</p>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.ThursdayText} : 12.00-17.00</p>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.FridayText} : 12.00-17.00</p>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.SaturdayText} : {languageStore.currentLanguage.PerAgreemtText}</p>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.SundayText} : {languageStore.currentLanguage.ClosedText}</p>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.publicHollidayText} : {languageStore.currentLanguage.ClosedText}</p>

            </div>
            <div className="about-us-page__info-column">
              <h3 className="about-us-page__info-title">{languageStore.currentLanguage.contactInformation}</h3>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.phoneText}: 42433454</p>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.emailText}: gl-antik@mail.com</p>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.CVRNRText}: 39821044</p>
              <p className="about-us-page__info-item">{languageStore.currentLanguage.addressText}: Gl. Kongevej 94a</p>
              <p className="about-us-page__info-item">1850 Frederiksberg</p>
            </div>
          </div>
          <div className="about-us-page__faq-wrapper">
            <h3 className="about-us-page__faq-title">{languageStore.currentLanguage.FAQText}</h3>
            <h4 className="about-us-page__faq-question">{languageStore.currentLanguage.Q1Text}</h4>
            <p className="about-us-page__faq-answer">
                {languageStore.currentLanguage.Q1Awnser}
            </p>
            <h4 className="about-us-page__faq-question">{languageStore.currentLanguage.Q2Text}</h4>
            <p className="about-us-page__faq-answer">
            {languageStore.currentLanguage.Q2Awnser}
            </p>
            <h4 className="about-us-page__faq-question">{languageStore.currentLanguage.Q3Text}</h4>
            <p className="about-us-page__faq-answer">
            {languageStore.currentLanguage.Q3Awnser}
            </p>
          </div>
        </div>
      );
});
export default AboutUsPage;
