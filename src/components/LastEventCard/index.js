import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getMonth } from '../../helpers/Date';

const EventCard = ({
  imageSrc = '/images/default.png',
  imageAlt = 'Image non disponible',
  date = new Date(),
  title = 'Titre non disponible',
  small = false,
  ...props
}) => {
  const [eventData, setEventData] = useState({
    imageSrc,
    imageAlt,
    date,
    title,
  });

  useEffect(() => {
    console.log('Début de useEffect');
    fetch('/events.json')
    .then((response) => {
        console.log('Réponse de fetch:', response);
        
        // Ajout d'une journalisation du corps de la réponse
        return response.text().then((text) => {
            console.log('Corps de la réponse:', text);
            
            // Vérifiez le type de contenu
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Le type de contenu de la réponse n\'est pas du JSON');
            }

            // Convertir le texte en JSON
            return JSON.parse(text);
        });
    })
    .then((data) => {
        console.log('Données de l\'événement chargées:', data);
        // Vérifiez si les données contiennent la propriété 'events' et s'il y a au moins un élément
        if (data.events && data.events.length > 0) {
            const lastEvent = data.events[data.events.length - 1];
            console.log('Dernier événement:', lastEvent);
            // Mettez à jour l'état avec les données du dernier événement
            setEventData({
                imageSrc: lastEvent.cover,
                imageAlt: lastEvent.title,
                date: new Date(lastEvent.date),
                title: lastEvent.title,
            });
        } else {
            console.error('Les données de l\'événement ne contiennent pas de propriétés "events" ou la liste est vide');
        }
    })
    .catch((error) => {
        console.error('Erreur lors du chargement des données de l\'événement:', error);
    });

}, []);


  const { imageSrc: src, imageAlt: alt, date: eventDate, title: eventTitle } = eventData;

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? ' EventCard--small' : ''}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img
          data-testid="card-image-testid"
          src={src}
          alt={alt}
          onError={(e) => {
            
            e.target.src = '/images/default.png';
          }}
        />
        
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{eventTitle}</div>
        <div className="EventCard__month">{getMonth(eventDate)}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string,
  small: PropTypes.bool,
};

// Définition des valeurs par défaut pour les props
EventCard.defaultProps = {
  imageSrc: '/images/default.png',
  imageAlt: 'Image non disponible',
  date: new Date(),
  title: 'Titre non disponible',
  small: false,
};

export default EventCard;
