import React from 'react';
import LoginUser from './LoginUser';
import logosvg from '../../assets/logo-horizontal-light.svg'
import bglogin from '../../assets/hero-login-screen.png'
import { UserContext } from '../UserContext'



const Login = () => {
  const { erro, vToken, setVtoken } = React.useContext(UserContext)


  return (
    <section className='telalogin'>
      <div className='hero-bg'>
        <img src={bglogin} alt="" />
      </div>
      <div className='container teste login-container'>
        <img className='login-logo' src={logosvg} alt="" />
        <h1 className='LoginTituo'>LOGIN</h1>
        <LoginUser />
        <p className={erro ? 'alerterror animacaoDireita' : 'normal'}>{erro}</p>
      </div>
    </section>
  );
};

export default Login;