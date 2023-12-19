import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// je veux pouvoir modifier des coworkings
const AdminCoworkingUpdate = () => {
    //je veux pouvoir récupérer l'id du coworking a modifier, pour ça je me base sur le paramètre de l'url :id
  const { id } = useParams();
  //je fait un useState pour pourvoir récupérer les informations lors du rechargement de mon composant
  const [coworking, setCoworking] = useState(null);

  const [message, setMessage] = useState(null);


// je fait un fetch pour récupérer le coworking corespondant a l'id dans l'api
  useEffect(() => {
    //comme c'est asychrone (await) on encpasule le fetch dans une fonction async
    (async () => {
      const coworkingResponse = await fetch("http://localhost:3000/api/coworkings/" + id);
      //je veux que la réponse soit en json
      const coworkingResponseData = await coworkingResponse.json();

      setCoworking(coworkingResponseData.data);
    })();
  }, []);
  //je veux récupérer les valeurs d'un coworking coté api
  const handleUpdateCoworking = async (event) => {

    //je veux empêcher le rechargement automatique de la page
    event.preventDefault();

    const name = event.target.name.value;
    const priceByMonth = event.target.priceByMonth.value;
    const priceByDay = event.target.priceByDay.value;
    const priceByHour = event.target.priceByHour.value;
    const addressNumber = event.target.addressNumber.value;
    const addressStreet = event.target.addressStreet.value;
    const addressCity = event.target.addressCity.value;
    const addressPostcode = event.target.addressPostcode.value;
    const superficy = event.target.superficy.value;
    const capacity = event.target.capacity.value;
    //je veux un objet comme le model de l'api
    const coworkingUpdateData = {
      name: name,
      price: {
        month: priceByMonth,
        day: priceByDay,
        hour: priceByHour,
      },
      address: {
        number: addressNumber,
        street: addressStreet,
        city: addressCity,
        postCode: addressPostcode,
      },
      superficy: superficy,
      capacity: capacity,
    };
//je veux que l'objet soit convertis en json
    const coworkingUpdateDataJson = JSON.stringify(coworkingUpdateData);
 // je récupère la jwt pour avoir le token
    const token = localStorage.getItem("jwt");
//je fait un fetch sur l'url coworkings 
    const updateCoworkingResponse = await fetch("http://localhost:3000/api/coworkings/" + id, {
      method: "PUT",
       //avec la methode put je crée un coworking 
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      //les donnée pour le coworking constituent le body
      body: coworkingUpdateDataJson,
    });
        //si la réponse est un statu 201
    if (updateCoworkingResponse.status === 201) {
         //on dit que c'est bon
      setMessage("Mise à jour OK");
    } else {
        //sinon on fait état d'une erreur
      setMessage("Erreur");
    }
  };

  return (
    <div>
      <>{message && <p>{message}</p>}</>
      {coworking && (
        <form onSubmit={handleUpdateCoworking}>
          <div>
            <label>
              Nom
              <input type="text" name="name" defaultValue={coworking.name} />
            </label>
          </div>
          <div>
            <label>
              Prix par mois
              <input type="number" name="priceByMonth" defaultValue={coworking.price.month} />
            </label>
          </div>
          <div>
            <label>
              Prix par jour
              <input type="number" name="priceByDay" defaultValue={coworking.price.day} />
            </label>
          </div>
          <div>
            <label>
              Prix par heure
              <input type="number" name="priceByHour" defaultValue={coworking.price.hour} />
            </label>
          </div>
          <div>
            <label>
              Adresse : Numéro
              <input type="text" name="addressNumber" defaultValue={coworking.address.number} />
            </label>
          </div>
          <div>
            <label>
              Adresse : Rue
              <input type="text" name="addressStreet" defaultValue={coworking.address.street} />
            </label>
          </div>
          <div>
            <label>
              Adresse : Ville
              <input type="text" name="addressCity" defaultValue={coworking.address.city} />
            </label>
          </div>
          <div>
            <label>
              Adresse : Postcode
              <input type="text" name="addressPostcode" defaultValue={coworking.address.postCode} />
            </label>
          </div>
          <div>
            <label>
              Superficie
              <input type="number" name="superficy" defaultValue={coworking.superficy} />
            </label>
          </div>
          <div>
            <label>
              Capacité
              <input type="number" name="capacity" defaultValue={coworking.capacity} />
            </label>
          </div>

          <input type="submit" />
        </form>
      )}
    </div>
  );
};

export default AdminCoworkingUpdate;