import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

const rotas = ['/usuarios', '/meuperfil', '/dashboard', '/listaferias', '/tarefas', '/pasta/:id', '/colaboradores']

export const UserContext = React.createContext()

export const GlobalStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [erro, setErro] = React.useState(false);
  const [vToken, setVtoken] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {

    VerfifyToken()
  }, [])

  async function FormEnv(username, senha) {
    setLoad(true);
    try {
      const response = await fetch('http://localhost:33331/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          senha
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.log(data.error);
        setErro(data.error);
      } else {
        setLocalStorageData(data);
        setData(data);
        setLoad(false);
        setLogin(true);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }



  function setLocalStorageData(data) {
    window.localStorage.setItem('$TOKEN', data.token);
    window.localStorage.setItem('$NOME', data.nome);
    window.localStorage.setItem('$USERNAME', data.username);
    window.localStorage.setItem('$PASTAS', data.pastas)
    window.localStorage.setItem('$PERMISSOES', data.roles[0].permissoes)
  }

  async function VerfifyToken() {
    setLoad(true);
    let token = window.localStorage.getItem('$TOKEN')
    if (token) {
      let response = await fetch('http://localhost:33331/auth', {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

      let data = await response.json()

      if (data.nome) {
        setData(data)
        setLogin(true)
        setLoad(false);
        if (rotas.includes(location.pathname)) {
          navigate(location.pathname)
        } else navigate('/dashboard')
      } else {

        window.localStorage.clear()
        setLogin(false)
        navigate('/login');
      }

    } else {
      navigate('/login');
    }
  }

  async function Logout() {
    window.localStorage.clear()
    setLoad(true);
    navigate('/login');
  }

  return (
    <UserContext.Provider value={{ FormEnv, erro, data, login, setLogin, VerfifyToken, Logout, load, vToken, setVtoken }}>
      {children}
    </UserContext.Provider>
  )
};

