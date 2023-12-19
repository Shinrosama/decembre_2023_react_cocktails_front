import React, { useEffect, useState } from "react";

const AdminCoworkingsPage = () => {

  // on veu pouvour recharger la page
  const [coworkings, setCoworkings] = useState(null);
// on fait un fetch des coworkings pour avoir la liste des coworkings
  useEffect(() => {
    (async () => {
      const coworkingsResponse = await fetch("http://localhost:3000/api/coworkings");
      const coworkingsResponseData = await coworkingsResponse.json();
      setCoworkings(coworkingsResponseData);
    })();
  }, []);
  // on veux que l'api rest sache que l'on est autentifié en lui envoyant le token
  const handleDeleteCoworking = async (event, coworkingId) => {
    const token = localStorage.getItem("jwt");
// on demande de trouver le coworking qui a l'id correspondant et de la supprimer en utilisant la méthode delete
    await fetch("http://localhost:3000/api/coworkings/" + coworkingId, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    // on veut la réponse après suppression
    const coworkingsResponse = await fetch("http://localhost:3000/api/coworkings");
    const coworkingsResponseData = await coworkingsResponse.json();
    setCoworkings(coworkingsResponseData);

  };

  return (
    <>
      <h1>Liste des coworkings : </h1>
      {/* on veux que l'affichage de tout les coworking se fasse */}
      {coworkings ? (
        <>
          {coworkings.map((coworking) => {
            return (
              <article>
                <h2>{coworking.name}</h2>
                {/*  on veux un boutton qui permette la suppression */}
                <button onClick={(event) => handleDeleteCoworking(event, coworking.id)}>Supprimer</button>
              </article>
            );
          })}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}
    </>
  );
};

export default AdminCoworkingsPage;