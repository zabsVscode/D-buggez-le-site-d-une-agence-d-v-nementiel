import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";
import Modal from "../Modal";

const mockContactApi = () => new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
});

const Form = ({ onSuccess, onError }) => {
    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        personnel: '',
        entreprise: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [selection, setSelection] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (value) => {
        setSelection(value);
        setFormData({ ...formData, personnel: '', entreprise: '' });
        if (value === 'Personnel') {
            setFormData({ ...formData, personnel: value });
        } else if (value === 'Entreprise') {
            setFormData({ ...formData, entreprise: value });
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};
        

        if (!formData.nom) {
            newErrors.nom = 'Nom est obligatoire';
        }

        if (!formData.prenom) {
            newErrors.prenom = 'Prénom est obligatoire';
        }

        if (!formData.personnel && !formData.entreprise) {
            newErrors.personnel = 'Sélectionnez une option';
        }

        if (!formData.email) {
            newErrors.email = 'Email est obligatoire';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Email invalide';
        }

        if (!formData.message) {
            newErrors.message = 'Message est obligatoire';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendContact = useCallback(
        async (evt) => {
            evt.preventDefault();
            if (!validateForm()) {
                return;
            }

            setSending(true);
            try {
                const response = await mockContactApi();
                setSending(false);
                if (response.success) {
                    onSuccess();
                    // Affiche une modal pour indiquer le succès
                    setModalContent("Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.");
                    setIsModalOpen(true);
                    // Réinitialiser les valeurs du formulaire
                    setFormData({
                        nom: '',
                        prenom: '',
                        personnel: '',
                        entreprise: '',
                        email: '',
                        message: ''
                    });
                } else {
                    onError(new Error('Erreur lors de l\'envoi du formulaire.'));
                }
            } catch (err) {
                setSending(false);
                // Affiche une modal pour indiquer l'erreur
                setModalContent("Erreur lors de l'envoi du formulaire.");
                setIsModalOpen(true);
                onError(err);
            }
        },
        [formData, validateForm, onSuccess, onError]
    );

    return (
        <form onSubmit={sendContact}>
            <div className="row">
                <div className="col">
                    <Field
                        label="Nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        error={errors.nom}
                    />
                    <Field
                        label="Prénom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        error={errors.prenom}
                    />
                    <Select
                        selection={["Personnel", "Entreprise"]}
                        onChange={handleSelectChange}
                        label="Personnel / Entreprise"
                        name="personnel"
                        type="large"
                        value={selection}
                    />
                    <Field
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <Button
                        type={BUTTON_TYPES.SUBMIT}
                        disabled={sending}
                    >
                        {sending ? "En cours" : "Envoyer"}
                    </Button>
                </div>
                <div className="col">
                    <Field
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                        type={FIELD_TYPES.TEXTAREA}
                    />
                </div>
            </div>
            {/* Ajout de Modal */}
            <Modal opened={isModalOpen} Content={<div>{modalContent}</div>} onClose={() => setIsModalOpen(false)} />
        </form>
    );
};

Form.propTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
};

Form.defaultProps = {
    onError: () => null,
    onSuccess: () => null,
};

export default Form;
