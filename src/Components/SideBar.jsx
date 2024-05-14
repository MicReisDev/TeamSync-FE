import React from 'react';
import dot from '../../assets/creative-circle-dot.svg'
import logoimg from '../../assets/logo-horizontal-light.svg'
import userIMG from '../../assets/user-icon.png'

import { UserContext } from '../UserContext';
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faUsersViewfinder, faListCheck, faChartPie, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ children }) => {
  const [options, setOptions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  let token = window.localStorage.getItem('$TOKEN');
  const [loading, setLoading] = useState(true);
  const estilo = 'w-full p-4 rounded-xl bg-gray-100 font-bold text-gray-500 / transition-all hover:bg-gray-200 // dark:bg-gray-800/75 dark:hover:bg-gray-800'

  const fetchData = async () => {
    try {

      const response = await fetch('http://localhost:33331/pastas', {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      if (!response.ok) {
        throw new Error('Não foi possível obter os dados');
      }

      const data = await response.json();

      let pastas = window.localStorage.getItem('$PASTAS')

      pastas = pastas.split(',')

      const newPastas = data.filter((i) => pastas.includes(i.pasta))
      console.log(newPastas)
      setOptions(newPastas);
    } catch (error) {
      window.localStorage.clear()
      console.error('Erro ao buscar dados do endpoint:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let permissoes = window.localStorage.getItem('$PERMISSOES');
    permissoes = permissoes.split(',')
    console.log(permissoes)
    setPermissions(permissoes)
    fetchData();
  }, [])


  const { Logout, data } = React.useContext(UserContext);

  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const [toggleOpen, setToggleOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setToggleOpen(!toggleOpen);

  };

  const sidebarClass = sidebarOpen ? 'sidebar dark:drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)] drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)] dark:bg-azulQuasePreto animacaoEsquerda' : 'sidebar dark:shadow-gray dark:bg-gray-azulQuasePreto animacaoEsquerda fechada';


  return <>
    <div className='principalContent  dark:bg-azulMaisClaro'>
      <div className={sidebarClass}>
        <div className='container'>
          <img src={logoimg} alt="" />
        </div>
        <div>
          <div className=' flex items-center gap-3 shadow border border-gray-100 rounded-xl w-full / dark:border-gray-900 dark:bg-gray-800'>
            <NavLink to='/meuperfil' className='flex gap-1 p-1 rounded-s-xl items-center' exact>
              <img className='h-10 w-10 rounded-full ' src={data.avatar ? data.avatar : userIMG} alt="" />

              <p className='dark:text-white font-bold'>{data.nome.split(" ")[0]}</p>
            </NavLink>
            <div className='absolute right-10 hover:cursor-pointer text-red-500' onClick={Logout}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12L1.21913 11.3753L0.719375 12L1.21913 12.6247L2 12ZM11 13C11.5523 13 12 12.5523 12 12C12 11.4477 11.5523 11 11 11V13ZM5.21913 6.3753L1.21913 11.3753L2.78087 12.6247L6.78087 7.6247L5.21913 6.3753ZM1.21913 12.6247L5.21913 17.6247L6.78087 16.3753L2.78087 11.3753L1.21913 12.6247ZM2 13H11V11H2V13Z" fill="currentColor" />
              <path d="M10 8.13193V7.38851C10 5.77017 10 4.961 10.474 4.4015C10.9479 3.84201 11.7461 3.70899 13.3424 3.44293L15.0136 3.1644C18.2567 2.62388 19.8782 2.35363 20.9391 3.25232C22 4.15102 22 5.79493 22 9.08276V14.9172C22 18.2051 22 19.849 20.9391 20.7477C19.8782 21.6464 18.2567 21.3761 15.0136 20.8356L13.3424 20.5571C11.7461 20.291 10.9479 20.158 10.474 19.5985C10 19.039 10 18.2298 10 16.6115V16.066" stroke="currentColor" stroke-width="2" />
            </svg>
            </div>
          </div>
        </div>
        <h2 className='dark:text-white font-bold'>Navegação</h2>
        <div className='navSideBar'>
          {permissions.includes('dashboard') ? < NavLink className={estilo} to='/dashboard' exact><FontAwesomeIcon icon={faChartPie} /> Dashboard</NavLink> : null}
          {permissions.includes('dashboardclientes') ? <NavLink className={estilo} to='/dashboardclientes' exact><FontAwesomeIcon icon={faChartBar} /> Clientes</NavLink> : null}
          {permissions.includes('usuarios') ? <NavLink className={estilo} to='/usuarios' exact><FontAwesomeIcon icon={faUsers} /> Usuários</NavLink> : null}
          {permissions.includes('tarefas') ? <NavLink className={estilo} to='/tarefas' exact><FontAwesomeIcon icon={faListCheck} /> Tarefas</NavLink> : null}
          {/* <NavLink className={estilo} to='/listaferias' exact><FontAwesomeIcon icon={faCalendarDays} /> Ferias</NavLink> */}
          {permissions.includes('colaboradores') ? <NavLink className={estilo} to='/colaboradores' exact><FontAwesomeIcon icon={faUsersViewfinder} /> Colaboradores</NavLink> : null}
        </div>

        <h2 className='dark:text-white font-bold'>Pastas</h2>
        <div className='navSideBar navSideBarFolders'>
          {loading ? <svg aria-hidden="true" class="w-20 h-20 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg> : null}
          {options.map((option) => (
            option.id_pasta != '0' ? <NavLink className='w-full p-4 rounded-xl bg-gray-100 font-bold text-gray-500 / transition-all hover:bg-gray-200 // dark:bg-gray-800/75 dark:hover:bg-gray-800' to={{ pathname: `/pasta/${option.id_pasta}`, state: { pasta: option.id_pasta } }} >{option.pasta}</NavLink> : null
          ))}

        </div>

      </div>
      <div className={toggleOpen ? 'toggleSideBar' : 'toggleSideBar fechar'} onClick={toggleSidebar}>
        <img src={dot} alt="" />
      </div>
      <div className='rigth-bar'>
        {children}
      </div>
    </div >
  </>

};

export default SideBar;