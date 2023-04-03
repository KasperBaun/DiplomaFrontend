import SniperModel from "@models/SniperModel";
import { Container } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";

interface IProps {
    setSearchValue : Dispatch<SetStateAction<string>>;
    setIsSniping : Dispatch<SetStateAction<boolean>>;
    snipedResults : SniperModel[];
    isSniping : boolean;
}

const SniperForm = ({ setSearchValue, isSniping, setIsSniping }: IProps) => {
    const placeholders: string[] = ["Royal Copenhagen Musselmalet Stel", "Bing og Grøndal Frokosttallerken", "Rosenborg Sterling Sølv"];
    const [currentPlaceholder, setCurrentPlaceholder] = useState<number>(0);
    const [typedPlaceholder, setTypedPlaceholder] = useState<string>("");
    const { languageStore } = useContext(MobXContext);
    
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

    const placeholder = `${typedPlaceholder}`

    const handleOnSniperSearchSubmit = async () => {
        setIsSniping(true);
    }

    return (
        <Container>
            <h2 style={{ textAlign: "center" }}>{ languageStore.currentLanguage.SniperFormTitleText }</h2>
            <Form>
                <Form.Label>{ languageStore.currentLanguage.SniperFormLabelText }</Form.Label>
                <InputGroup className="mb-3">
                  { isSniping ? (
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
                    
                    { isSniping ? (
                    <Button variant="outline-primary" disabled
                        onClick={() => {handleOnSniperSearchSubmit()}}
                    >{ languageStore.currentLanguage.SniperFormButtonText }</Button>) : (
                    <Button variant="outline-primary"
                        onClick={() => {handleOnSniperSearchSubmit()}}
                    >{ languageStore.currentLanguage.SniperFormButtonText }</Button>)
                  }
                </InputGroup>
                <Form.Text className="text-muted">
                    { languageStore.currentLanguage.SniperFormMutedText }
                </Form.Text>
            </Form>
        </Container>
    )
}

export default observer(SniperForm);