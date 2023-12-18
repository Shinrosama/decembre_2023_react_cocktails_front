const LoginPage = () => {
//je veux pouvoir me log 
    const handleLogin = async (event) => {
// je fait en sorte que le rechargement par défaut de la page n'aie pas lieu
      event.preventDefault();
  // je cherche a récupérer les valeurs de username et passaword dans les champs du formulaire
      const username = event.target.username.value;
      const password = event.target.password.value;
  
      const logindata = {
        username,
        password,
      };
//je veux que loginData soit converti puis envoyé en json
      const logindataJson = JSON.stringify(logindata);
// j'effectue une requète sur l'api afin de me logger 
      const loginResponse = await fetch("http://localhost:3000/api/users/login", {
// l'api renvoi une réponse au format json
      method: "post",
      headers: {
        "content-type": "application/json",
      },

      body: logindataJson,
      });

      const loginResponseData = await loginResponse.json();
      const token = loginResponseData.data;
// on vérifie d'avoir bien reçu le token
      console.log(token)

      if (token)  {
         localStorage.setitem("jwt", token)
      }
  
      // je créé objet en json avec username et password
      // je fais un fetch de type POST sur mon API login, en incluant le json
      // si l'api valide => jwt dans la réponse
      // sinon => erreur dans la réponse
    };
  
    return (
      <section>
        <form onSubmit={handleLogin}>
          <label>
            username
            <input type="text" name="username" />
          </label>
          <label>
            password
            <input type="password" name="password" />
          </label>
          <input type="submit" />
        </form>
      </section>
    );
  };
  
  export default LoginPage;