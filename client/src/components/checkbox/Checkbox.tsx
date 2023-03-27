import "./Checkbox.scss"

interface CheckboxProps {
    checked: boolean;
    setchecked: (checked: boolean) => void;
    id: string;
}

export default function Checkbox(props: CheckboxProps) {
    const handleCheckBoxChange = () => {
        props.setchecked(!props.checked)
    }
    return (
        <div className="custom-checkbox-container">
            <input type="checkbox" id={props.id} checked={props.checked} onChange={handleCheckBoxChange} />
            <div onClick={() => { props.setchecked(!props.checked) }} className={"custom-checkbox " + (props.checked ? "custom-checkbox-checked" : "")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
        </div>
    )
}