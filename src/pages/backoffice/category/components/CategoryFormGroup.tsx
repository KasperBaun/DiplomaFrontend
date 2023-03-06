import Category from "@models/Category";
import { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";

interface IProps {
    type : string;
    stateVal : string | number | Category;
    stateFunc ?: Dispatch<SetStateAction<string>>;
    stateFuncNumber ?: Dispatch<SetStateAction<number>>;
    stateFuncCategory ?: Dispatch<SetStateAction<Category>>;
    stateFuncVoid ?: Dispatch<SetStateAction<void>>;
    index : number;
    formName : string;
    descText ?: string;
    title : string;
}

const CategoryFormGroup = ( props : IProps ) => {

    switch (props.type) {
        case "TextForm_NoDesc":
            // Return Text Form Group no Form Text (TextForm_NoDesc)
            return (
                <Form.Group>
                <Form.Label id="ModalFormLabel" htmlFor={"FormGroup_" + props.formName + "_" + props.index}>{props.title}</Form.Label>
                <Form.Control id={"FormGroup_" + props.formName + "_" + props.index} value={props.stateVal.toString()} type="text" onChange={(event) => {
                    let temp = event.target.value;
                    props.stateFunc(temp);
                }} />
            </Form.Group>
            )

        case "TextForm_Desc": 
            // Return Text Form Group Form Text (TextForm_Desc)
            return (
                <Form.Group>
                    <Form.Label id="ModalFormLabel" htmlFor={"FormGroup_" + props.formName + "_" + props.index}>{props.title}</Form.Label>
                    <Form.Control id={"FormGroup_" + props.formName + "_" + props.index} value={props.stateVal.toString()} type="text" onChange={(event) => {
                        let temp = event.target.value;
                        if(props.stateFunc) {
                            props.stateFunc(temp);
                        }
                        if(props.stateFuncNumber) {
                            props.stateFuncNumber(parseInt(temp))
                        }
                    }} aria-describedby={"FormGroup_" + props.formName + "_" + props.index + "_Block"} />
                    <Form.Text id={"FormGroup_" + props.formName + "_" + props.index + "_Block"} muted>
                        { props.descText }
                    </Form.Text>
                </Form.Group>
            )
        
        case "TextForm_Area_NoDesc": 
            // Return TextArea Form without Form Text (TextForm_Desc)
            return (
                <Form.Group>
                    <Form.Label id="ModalFormLabel" htmlFor={"FormGroup_" + props.formName + "_" + props.index}>{props.title}</Form.Label>
                    <Form.Control id={"FormGroup_" + props.formName + "_" + props.index} value={props.stateVal.toString()} type="text" onChange={(event) => {
                        let temp = event.target.value;
                        props.stateFunc(temp);
                    }} as="textarea" rows={3} />
                </Form.Group>
            )
        
        case "TextForm_Area_Desc":
            // Return TextArea Form with Form Text (TextForm_Area_Desc)
            return (
                <Form.Group>
                    <Form.Label id="ModalFormLabel" htmlFor={"FormGroup_" + props.formName + "_" + props.index}>{props.title}</Form.Label>
                    <Form.Control id={"FormGroup_" + props.formName + "_" + props.index} value={props.stateVal.toString()} type="text" onChange={(event) => {
                        let temp = event.target.value;
                        props.stateFunc(temp);
                    }} as="textarea" rows={3} aria-describedby={"FormGroup_" + props.formName + "_" + props.index + "_Block"} />
                    <Form.Text id={"FormGroup_" + props.formName + "_" + props.index + "_Block"} muted>
                        { props.descText }
                    </Form.Text>
                </Form.Group>
            )
    }

}

export default CategoryFormGroup;