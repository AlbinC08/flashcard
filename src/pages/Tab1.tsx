import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonInput,
  IonLabel,
} from "@ionic/react";
import axios from "axios";
import "./Tab1.css";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import Card from "../components/Card";

type TypeCard = {
  id: number;
  title: string;
  definition: string;
  category: {
    id: number;
    name: string;
  };
};
type TypeCards = Array<TypeCard>;

const Tab1: React.FC = () => {
  const [cardData, setCardData] = useState<TypeCards>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [searchCardData, setSearchCardData] = useState<TypeCards>([]);
  const [categoryFilter, setCategoryFilter] = useState<number>(NaN);
  const [flip, setFlip] = useState<boolean>(false);
  const url = `http://192.168.1.18:8000/api/cards?title=${inputSearch}`;
  const urlSearch = `http://192.168.1.18:8000/api/cards?title=${inputSearch}&category=${categoryFilter}`;

  const getData = async () => {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    setCardData(response.data);
    console.log(urlSearch);
  };

  useEffect(() => {
    getData();
  }, []);

  const getSearch = () => {
    setInputSearch(inputSearch);
    console.log(inputSearch);
    axios
      .get(urlSearch, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setSearchCardData(res.data);
        console.log(searchCardData);
        console.log(categoryFilter);
      })
      .catch((error) => console.log("error = ", error));
  };

  useEffect(() => {
    if (inputSearch != "") {
      getSearch();
    }
  }, [inputSearch]);
  // const handleClick = useCallback<MouseEventHandler>(
  //     (event) => {
  //       event.preventDefault()
  //       setFlip(!flip)
  //     },
  //     [flip]
  //   );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getSearch();
    setInputSearch("");
    console.log(inputSearch);
    console.log(urlSearch);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle id="title-page">Flash card</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList className="selectdiv">
          <IonItem>
            <IonSelect
              className="select"
              interface="popover"
              placeholder="Select category"
              onIonChange={(ev) => setCategoryFilter(parseInt(ev.detail.value))}
            >
              <IonSelectOption value={2}>
                Concept de programmation
              </IonSelectOption>
              <IonSelectOption value={1}>Définitions</IonSelectOption>
              <IonSelectOption value={null}>Toutes les categories</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <form className="search" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Entrez le titre d'une carte"
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
          />

          <IonButton type="submit" className="search-button">
            <img src="assets/icon/search.svg" alt="" />
          </IonButton>
        </form>

        <div className="card-container">
          {searchCardData.length > 0
            ? searchCardData.map((card) => <Card key={card.id} card={card} />)
            : cardData.length > 0 &&
              cardData.map((card) => <Card key={card.id} card={card} />)}
        </div>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle className="test" size="large">
              Tab 1
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
