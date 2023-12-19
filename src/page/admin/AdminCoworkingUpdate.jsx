import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// je veux pouvoir modifier des coworkings
const AdminCoworkingUpdate = () => {
    //je veux pouvoir récupérer l'id du coworking a modifier, pour ça je me base sur le paramètre de l'url :id
  const { id } = useParams();
  //je fait un useState pour pourvoir récupérer les informations lors du rechargement de mon composant
  const [coworking, setCoworking] = useState(null);
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

  return (
    <div>
        {/* si on obtiens un coworking on veut que les champs du formulaire se remplissent des information comme dans le modèle */}
      {coworking && (
        <form>
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