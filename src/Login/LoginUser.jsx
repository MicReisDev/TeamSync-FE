import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginUser = () => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const context = React.useContext(UserContext);
  const navigate = useNavigate();

  async function FormLogin(event) {
    try {
      event.preventDefault();
      let data = await context.FormEnv(username, senha);

      if (data.nome) {
        navigate('/dashboard');
      }
    } catch (error) {

    }
  }

  return (
    <section className='animacaoEsquerda'>
      <form onSubmit={FormLogin} className='flex flex-col gap-10 w-96'>
        <div className='flex flex-col gap-2'>
          <input
            className='p-3 rounded-full border-azul border focus:outline-3 focus:outline-azul w-auto'
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            className='p-3 rounded-full border-azul border focus:outline-3 focus:outline-azul w-auto'
            type="password"
            name="senha"
            placeholder="Senha"
            id="senha"
            value={senha}
            onChange={({ target }) => setSenha(target.value)}
          />
        </div>
        <button className='button-submit-login button-prymary' type='submit'>Conectar</button>
      </form>
    </section>
  );
};

export default LoginUser;
