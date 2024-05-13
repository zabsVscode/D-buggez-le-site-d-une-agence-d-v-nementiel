import PropTypes from 'prop-types';
import React from 'react';
import { getMonth } from '../../helpers/Date';
import './style.scss';

const EventCard = ({
  imageSrc = '/images/default.png',
  imageAlt = 'Image non disponible',
  date = new Date(),
  title = 'Titre non disponible',
  label = '',
  prestations = [],
  small = false,
  ...props
}) => {
  // Vérifiez l'absence d'erreurs d'image et remplacez les images manquantes
  const handleImageError = (e) => {
    console.error('Erreur de chargement de l\'image :', e);
    e.target.src = '/images/default.png';
  };

  return (
    <div
      className={`EventCard${small ? ' EventCard--small' : ''}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img
          src={imageSrc}
          alt={imageAlt}
          onError={handleImageError}
        />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
      <div className="EventCard__prestationsContainer">
        <h4>Prestations :</h4>
        <ul>
          {prestations.map((prestation) => (
            <li key={prestation.id || prestation.name}>{prestation.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string,
  label: PropTypes.string,
  small: PropTypes.bool,
  prestations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

EventCard.defaultProps = {
  imageSrc: '/images/default.png',
  imageAlt: 'Image non disponible',
  date: new Date(),
  title: 'Titre non disponible',
  label: '',
  small: false,
  prestations: [],
};

export default EventCard;
