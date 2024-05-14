import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Helpers/Modal';
import Loading from '../Helpers/Loading';
import ListaUsuarios from './UsuariosLista/ListaUsuarios';
import CriarUsuario from './UsuariosLista/CriarUsuario';
import PermissoesLista from './Permissoes/PermissoesLista'
import PermissaoEspecifica from './Permissoes/PermissaoEspecifica'

const Usuarios = () => {
  const [arrUsuarios, setArrUsuarios] = useState([]);
  const [Componente, setComponente] = useState('CriarUsuario')
  const [erro, setErro] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [pesquisar, setPesquisar] = useState('')
  const [updateComponent, setUpdateComponent] = useState(0)
  const [permissaoEscolhida, setPermissaoEscolhida] = useState({})

  const [loading, setLoading] = useState(true);

  let RenderComponente;
  switch (Componente) {
    case 'CriarUsuario':
      RenderComponente = CriarUsuario
      break
    case 'Permissao':
      RenderComponente = PermissoesLista
      break
    case 'PermissaoE':
      RenderComponente = PermissaoEspecifica
      break
    default:
      RenderComponente = 'CriarUsuario'
  }

  const fetchUsuarios = async () => {
    let token = window.localStorage.getItem('$TOKEN');
    try {
      const response = await fetch(`http://localhost:33331/todos-usuarios?pesquisar=${pesquisar}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const data = await response.json();

      if (data.error) {
        setErro(data.error);
      } else {
        setArrUsuarios(data);
      }
    } catch (error) {
      console.error(error);
      setErro('Ocorreu um erro ao buscar os usuários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true)
    const timerId = setTimeout(() => {
      fetchUsuarios()
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [pesquisar]);

  useEffect(() => {
    fetchUsuarios();
  }, [openModal, updateComponent]);


  return (
    <>
      {loading && <Loading />}



      <div className='h-full w-full overflow-x-hidden dark:bg-transparent'>

        <div className=" space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 dark:bg-transparent">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-white">Usuários <span class="px-3 py-1 text-xs text-azul bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{arrUsuarios.length} Usuários</span></h2>

            <div className='flex gap-1'>
              <a onClick={(e) => { e.preventDefault(); setOpenModal(!openModal); setComponente('Permissao') }} className="cursor-pointer rounded-xl  hover:bg-blue-400 group flex items-center transition-all bg-azul text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 13C4 11.1144 4 10.1716 4.58579 9.58579C5.17157 9 6.11438 9 8 9H16C17.8856 9 18.8284 9 19.4142 9.58579C20 10.1716 20 11.1144 20 13V15C20 17.8284 20 19.2426 19.1213 20.1213C18.2426 21 16.8284 21 14 21H10C7.17157 21 5.75736 21 4.87868 20.1213C4 19.2426 4 17.8284 4 15V13Z" stroke="currentColor" stroke-width="2" />
                  <path d="M16 8V7C16 4.79086 14.2091 3 12 3V3C9.79086 3 8 4.79086 8 7V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  <circle cx="12" cy="15" r="2" fill="currentColor" />
                </svg>
                Gerenciar Permissões
              </a>
              <a onClick={(e) => { e.preventDefault(); setOpenModal(!openModal); setComponente('CriarUsuario') }} className="cursor-pointer rounded-xl  hover:bg-blue-400 group flex items-center transition-all bg-azul text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                <svg className="mr-2" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                </svg>
                Novo Usuário
              </a>
            </div>
          </div>

          <div className="group relative inline-block">
            <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
            </svg>
            <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 bg-white placeholder-slate-400 rounded-xl py-2 pl-10 ring-2 ring-slate-200 shadow-sm dark:bg-transparent text-slate-400" type="text" aria-label="Filter projects" placeholder="Pesquisar..." onChange={(e) => { setPesquisar(e.target.value) }} />

          </div>
        </div>
        {erro && <div>{erro}</div>}
        <ListaUsuarios arrUsuarios={arrUsuarios} setUpdateComponent={setUpdateComponent} updateComponent={updateComponent} />

        <Modal open={openModal} setOpenModal={setOpenModal}>

          <RenderComponente openModal={openModal} setOpenModal={setOpenModal} Componente={Componente} setComponente={setComponente} setPermissaoEscolhida={setPermissaoEscolhida} permissaoEscolhida={permissaoEscolhida} />

        </Modal>
      </div >
    </>
  );
};

export default Usuarios;
