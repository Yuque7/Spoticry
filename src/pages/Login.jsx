import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getToken, isTokenValid, loginUser } from "../services/GetToken";
import { ContainerLogin, FormLogin } from "../styles/Login/LoginStyles";
import { GlobalStyled } from "../GlobalStyles";

function Login() {
  const [email, setEmail] = useState(""); 
  const [senha, setSenha] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token && isTokenValid(token)) {
      toast.info("Você já está logado!", { position: "top-right" });
      navigate("/homePage"); 
    }
  }, [navigate]);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(email, senha);
      if (response && response.token) {
        toast.success("Login realizado com sucesso!", { position: "top-right" });
        navigate("/homePage"); 
      }
    } catch (error) {
      toast.error(`Erro no login: ${error.message}`, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyled/>
      <ToastContainer />
      <ContainerLogin>
        <FormLogin onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <input
            name="email"
            type="text"
            value={email}
            onChange={onChangeEmail}
            placeholder="Digite o seu e-mail"
            required
          />
          <input
            name="password"
            type="password"
            value={senha}
            onChange={onChangePassword}
            placeholder="Digite a sua senha"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar!"}
          </button>
        </FormLogin>
      </ContainerLogin>
    </>
  );
}

export default Login;
