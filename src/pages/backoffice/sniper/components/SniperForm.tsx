import { Container } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { SniperResult } from "@models/SniperResult";

interface IProps {
  onSnipeComplete: (result: SniperResult) => void;
  isSniping: boolean;
  setIsSniping: Dispatch<SetStateAction<boolean>>;
}

const SniperForm = ({ onSnipeComplete, isSniping, setIsSniping }: IProps) => {
  const placeholders: string[] = [
    "Royal Copenhagen Musselmalet Stel",
    "Bing og Grøndal Frokosttallerken",
    "Rosenborg Sterling Sølv",
    "Isbjørn Figur",
    "Kâhler Vase",
    "Aluminia Tenera Spejl",
    "Georg Jensen Julepynt",
    "O.V. Mogensen sølv",
    "Holmegaard Viol"];
  const [currentPlaceholder, setCurrentPlaceholder] = useState<number>(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const { languageStore, sniperStore } = useContext(MobXContext);

  const placeholder = `${typedPlaceholder}`

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setCurrentPlaceholder((currentPlaceholder + 1) % placeholders.length);
      setTypedPlaceholder("");
    }, 6000);
    return () => clearTimeout(timeoutId);
  }, [currentPlaceholder, placeholders.length]);

  useEffect(() => {
    let typingTimerId: NodeJS.Timeout;
    let currentIndex: number = currentPlaceholder;
    const typeNextChar = () => {
      const currentPlaceholderText = placeholders[currentIndex];
      if (typedPlaceholder === currentPlaceholderText) {
        typingTimerId = setTimeout(() => {
          setCurrentPlaceholder((currentIndex + 1) % placeholders.length);
          setTypedPlaceholder("");
        }, 1000);
      } else if (typedPlaceholder.length < currentPlaceholderText.length) {
        setTypedPlaceholder((prev: string) => prev + currentPlaceholderText[prev.length]);
        typingTimerId = setTimeout(typeNextChar, 100);
      }
    };
    typingTimerId = setTimeout(typeNextChar, 100);
    return () => clearTimeout(typingTimerId);
  }, [currentPlaceholder, typedPlaceholder, placeholders.length]);

  const handleOnSubmitClicked = async () => {
    setIsSniping(true);
    const snipedResults: SniperResult = {
      product: {
        name: searchValue,
        id: 0,
        manufacturer: "",
        material: 1,
        modelNumber: "",
        subcategories: [],
        design: "",
        dimension: "",
      },
      sniperResult: await sniperStore.GetSniping(searchValue)
    }
    onSnipeComplete(snipedResults);
  }



  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>{languageStore.currentLanguage.SniperFormTitleText}</h2>
      <Form>
        <Form.Label>{languageStore.currentLanguage.SniperFormLabelText}</Form.Label>
        <InputGroup className="mb-3">
          {isSniping ? (
            <Form.Control
              type="text"
              disabled
              placeholder={placeholder}
              onChange={(event) => {
                let temp = event.currentTarget.value;
                setSearchValue(temp);
              }}
            />
          ) : (
            <Form.Control
              type="text"
              placeholder={placeholder}
              onChange={(event) => {
                let temp = event.currentTarget.value;
                setSearchValue(temp);
              }}
            />
          )
          }

          {isSniping ? (
            <Button variant="outline-primary" disabled
              onClick={() => { handleOnSubmitClicked() }}
            >{languageStore.currentLanguage.SniperFormButtonText}</Button>) : (
            <Button variant="outline-primary"
              onClick={() => { handleOnSubmitClicked() }}
            >{languageStore.currentLanguage.SniperFormButtonText}</Button>)
          }
        </InputGroup>
        <Form.Text className="text-muted">
          {languageStore.currentLanguage.SniperFormMutedText}
        </Form.Text>
      </Form>
    </Container>
  )
}

export default observer(SniperForm);