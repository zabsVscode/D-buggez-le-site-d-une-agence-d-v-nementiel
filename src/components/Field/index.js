import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
    INPUT_TEXT: 1,
    TEXTAREA: 2,
};

const Field = ({
    type = FIELD_TYPES.INPUT_TEXT,
    label,
    name,
    placeholder,
    value,
    onChange,
    error,
    selection,
}) => {
    let component;
    let inputClass = error ? 'form-control is-invalid' : 'form-control';

    // Utilisation de selection pour déterminer le comportement ou le style
    if (selection === 'Personnel') {
        inputClass += ' personnel-class';
    } else if (selection === 'Entreprise') {
        inputClass += ' entreprise-class';
    }

    const handleBlur = (e) => {
        // Utilisez des noms de variables différents pour éviter le problème d'ombre
        const inputName = e.target.name;
        const inputValue = e.target.value;
    
        // Effectuez la validation du champ si nécessaire
        if (inputName === "prenom") {
            if (inputValue.trim() === "") {
                console.error('Prénom est obligatoire');
            }
        }
    
        // Appelez `onChange` s'il est défini
        if (onChange) {
            onChange(e);
        }
    };
    
    

    // Créer le composant d'entrée en fonction du type de champ
    switch (type) {
        case FIELD_TYPES.INPUT_TEXT:
            component = (
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={inputClass}
                    data-testid="field-testid"
                    onBlur={handleBlur}
                />
            );
            break;
        case FIELD_TYPES.TEXTAREA:
            component = (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={inputClass}
                    data-testid="field-testid"
                    onBlur={handleBlur}
                />
            );
            break;
        default:
            component = (
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={inputClass}
                    data-testid="field-testid"
                    onBlur={handleBlur}
                />
            );
    }

    return (
        <div className="inputField">
            <label htmlFor={name} className="ColorLabel">
            {label}
            </label>
            {component}
            {error && <div className="errorClass">{error}</div>}
        </div>
    );
};

Field.propTypes = {
    type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    selection: PropTypes.string,
};

Field.defaultProps = {
    label: "",
    placeholder: "",
    type: FIELD_TYPES.INPUT_TEXT,
    value: "",
    onChange: () => {},
    error: "",
    selection: "",
};

export default Field;
