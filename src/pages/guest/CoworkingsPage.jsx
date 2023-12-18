import { useEffect, useState } from "react"

function CoworkingsPage () {

    const [coworkings, setCoworkings] = useState(null)

    useEffect (() => {
        (async() =>{

            const coworkingsResponse = await fetch ("http://localhost:3000/api/coworkings")

            const coworkingsInJs = await coworkingsResponse.json();

            setCoworkings(coworkingsInJs);
        })();
    }, []);

    return (
        <>
            <main>
                {coworkings ? (
                    <>
                        {coworkings.map((coworking) =>{
                            return (
                                <h2>{coworking.name} </h2>
                            );
                        })}
                    </>
                ) : (

                    <p>coworking en cours de chargement</p>
                )}
            </main>
        </>
    )
}

export default CoworkingsPage