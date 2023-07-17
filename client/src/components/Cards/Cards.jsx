import Card from '../Card/Card';
import './Cards.modules.css'

const Cards = ({ countries }) => {

  return (
    <div className="cards">
      {countries.map((card) => (
        <Card
        key={card.id}
        id={card.id} // Agregar esta línea para pasar el prop id
        flagImage={card.flagImage}
        name={card.name}
        continent={card.continent}
        />
      ))}
    </div>
  );
};

export default Cards;
