import { useState } from "react"

const AdminCoworkingCreate = () =>{

// le state sert a l'affichage du message avec deux états pour la russite ou l'erreur
 const [message, setMessage ] = useState(null);
// je veux pouvoir prendre les valeurs dans le formulaire pour créer un coworking, la fonction est asyncrone car je veux faire un fetch.
 const handleCreateCoworking = async (event) => {
//je ne veux pas que la page se recharge
        event.preventDefault();

        //je récupère les valeurs du formulaire
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
        //je crée un objet sur le modèle d'un coworking dans l'api
        const coworkingToCreate = {
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
            // je veux que l'objet soit converti au format json
          const coworkingToCreateJson = JSON.stringify(coworkingToCreate);
          // je récupère la jwt pour avoir le token
          const token = localStorage.getItem("jwt");
          //je fait un fetch sur l'url coworkings 
          const createCoworkingResponse = await fetch("http://localhost:3000/api/coworkings", {
          //avec la methode post je crée un coworking  
            method: "POST",
          
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            //les donnée pour le coworking constituent le body
            body: coworkingToCreateJson,
    });
        //si la réponse est un statu 201
        if (createCoworkingResponse.status === 201) {
            //on dit que c'est bon
            setMessage("Coworking créé !");
        } else {
            //sinon on fait état d'une erreur
            setMessage("Erreur !");
        }
    };


    return (
        <>
        {message && <p>{message}</p>}

        <form onSubmit={handleCreateCoworking}>
        <div>
          <label>
            Nom
            <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Prix par mois
            <input type="number" name="priceByMonth" />
          </label>
        </div>
        <div>
          <label>
            Prix par jour
            <input type="number" name="priceByDay" />
          </label>
        </div>
        <div>
          <label>
            Prix par heure
            <input type="number" name="priceByHour" />
          </label>
        </div>
        <div>
          <label>
            Adresse : Numéro
            <input type="text" name="addressNumber" />
          </label>
        </div>
        <div>
          <label>
            Adresse : Rue
            <input type="text" name="addressStreet" />
          </label>
        </div>
        <div>
          <label>
            Adresse : Ville
            <input type="text" name="addressCity" />
          </label>
        </div>
        <div>
          <label>
            Adresse : Postcode
            <input type="text" name="addressPostcode" />
          </label>
        </div>
        <div>
          <label>
            Superficie
            <input type="number" name="superficy" />
          </label>
        </div>
        <div>
          <label>
            Capacité
            <input type="number" name="capacity" />
          </label>
        </div>

        <input type="submit" />
      </form>
        </>

    )
}

export default AdminCoworkingCreate