import { useNavigate } from "react-router-dom"
import HeaderAdmin from "../../component/admin/Headeradmin"
import { useEffect } from "react";


const DashboardPage = () => {

    //je veux opérer une redirection de l'utilisateur
    const navigate = useNavigate();
//je veux effectuer une action au chargement du composant
    useEffect(() => {

        //je récupère le token dans localstorage
        const token = localstorage.getItem("jwt");
        // si je n'ai pas le token ...
        if (!token) {
            // on redirige l'utilisateur vers le login
            navigate("/login");
        }
        //autrement on continu
    });
    return (
        <>
            <HeaderAdmin/>
            <h2>vous êtes bien connecté en tant qu'admin</h2>
        </>
    )
}

export default DashboardPage