import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
    // Récupérer les données et les erreurs depuis le contexte DataContext
    const { data, error } = useData();

    // État pour stocker le type sélectionné (initialisé à `null` pour aucun filtre)
    const [type, setType] = useState(null);

    // État pour stocker la page actuelle (initialisé à 1)
    const [currentPage, setCurrentPage] = useState(1);

    // Filtrer les événements en fonction du type sélectionné et de la pagination
    // Utilisez `.toLowerCase()` pour normaliser les valeurs
    const filteredEvents = data && data.events
        ? data.events
              .filter((event) => !type || event.type.toLowerCase() === type.toLowerCase())
              .slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
        : [];

    // Fonction pour changer le type sélectionné et réinitialiser la page actuelle
    const changeType = (evtType) => {
        setCurrentPage(1);
        setType(evtType);
    };

    // Récupérer la liste des types d'événements et normaliser les valeurs
    const typeList = data && data.events
        ? Array.from(new Set(data.events.map((event) => event.type.toLowerCase())))
        : [];

    return (
        <>
            {/* Afficher les erreurs */}
            {error && <div>An error occurred</div>}

            {/* Afficher un message de chargement si les données ne sont pas disponibles */}
            {data === null ? "loading" : (
                <>
                    {/* Titre de la section de sélection de catégories */}
                    <h3 className="SelectTitle">Catégories</h3>

                    {/* Menu déroulant pour sélectionner un type d'événement */}
                    <Select
                        selection={typeList}
                        onChange={(value) => changeType(value)}
                    />

                    {/* Afficher les événements filtrés */}
                    <div id="events" className="ListContainer">
                        {filteredEvents.map((event) => (
                            <Modal key={event.id} Content={<ModalEvent event={event} />}>
                                {({ setIsOpened }) => (
                                    <EventCard
                                        onClick={() => setIsOpened(true)}
                                        imageSrc={event.cover}
                                        title={event.title}
                                        date={new Date(event.date)}
                                        label={event.type}
                                    />
                                )}
                            </Modal>
                        ))}
                    </div>


                </>
            )}
        </>
    );
};

export default EventList;
