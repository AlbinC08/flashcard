import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

const Card = ({ card }: any) => {
  const [flip, setFlip] = useState(false);
  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal" key={card.id}>
      <IonCard onClick={() => setFlip(!flip)} className="card">
        <IonCardHeader>
          <IonCardTitle>{card.title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="card-content">
          <IonCardSubtitle>{card.category.name}</IonCardSubtitle>
        </IonCardContent>
      </IonCard>
      <IonCard onClick={() => setFlip(!flip)} className="back-card">
        <IonCardContent className="card-content">
          {card.definition}
        </IonCardContent>
      </IonCard>
    </ReactCardFlip>
  );
};

export default Card;
