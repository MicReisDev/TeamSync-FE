import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../Helpers/Modal';
import Loading from '../Helpers/Loading';
import PastaSelect from './PastaSelect';
import ButtonDefault from '../Components/ButtonDefault';
import TarefaAberta from './TarefaAberta';
import PainelTarefa from './PainelTarefa';
import TarefaVisual01 from './TarefaLista/TarefaVisual01.jsx'
import TarefaVisual02 from './TarefaLista/TarefaVisual02.jsx'
import KanbanBoard from './TarefaLista/components/KanbanBoard.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faArrowLeft, faPenToSquare, faDisplay } from '@fortawesome/free-solid-svg-icons';
import Alerta from '../Helpers/Alerta.jsx';
const Tarefas = () => {
  const alertaRef = useRef(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate()
  const [criarLoad, setCriarLoad] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tarefas, setTarefas] = useState([]);
  const [erro, setErro] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [visualize, setvisualize] = useState(2);
  const [pesquisar, setPesquisar] = useState("");
  const [status, setStatus] = useState("");
  const [openVisualizar, setOpenVisualizar] = useState(false);
  const [tarefaEspecifica, setTarefaEspecifica] = useState([]);
  const [edit, setEdit] = useState(false);
  const [params, setParams] = useState({ ordem: 'desc', page: 1, perPage: 10 })

  const [pagination, setPagination] = useState()
  const [forceUpdate, setForceUpdate] = useState(1)
  const { id } = useParams();

  const past = isNaN(+id) ? "" : id

  const [dadosDoFormulario, setDadosDoFormulario] = useState({
    titulo: '',
    descricao: '',
    entrega: '',
    id_pasta: past
  });


  const enviarDadosDoFormulario = async (e) => {
    e.preventDefault();
    setCriarLoad(true)
    let token = window.localStorage.getItem('$TOKEN');

    try {
      const response = await fetch('http://localhost:33331/tarefa', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ ...dadosDoFormulario, id_pasta: dadosDoFormulario.id_pasta == "" ? past : dadosDoFormulario.id_pasta }),
      });

      const data = await response.json();

      if (data.error) {
        console.log('Erro ao enviar dados:', data.error);
      } else {
        setOpenModal(!openModal)
        setCriarLoad(false)
        setDadosDoFormulario({
          titulo: '',
          descricao: '',
          entrega: '',
          id_pasta: ''
        })
        setForceUpdate(forceUpdate + 1)
        if (past == '') {
          navigate('/tarefas')
        }
        else {
          navigate(`/pasta/${past}`)
        }
        mostrarAlerta()
      }
    } catch (error) {
      console.error(error);
      console.log('Ocorreu um erro ao enviar os dados do formulário.');
    }

  };


  // Função para buscar os usuários
  const fetchTarefas = async () => {
    setLoading(true)
    let token = window.localStorage.getItem('$TOKEN')
    try {
      const response = await fetch(`http://localhost:33331/tarefa?pasta=${past}&pesquisar=${pesquisar}&status=${status}&ordem=${params.ordem}&page=${params.page}&perPage=${params.perPage}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
      });
      const data = await response.json()
      if (data.error) {

        setErro(data.error);
      } else {

        setTarefas(data.data);
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error(error);
      setErro('Ocorreu um erro ao buscar os usuários.');
    } finally {
      setLoading(false)
    }
  };

  //Criar Tarefa
  function criarTarefa() {
    setOpenModal(!openModal)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosDoFormulario({
      ...dadosDoFormulario,
      [name]: value,
    });
  };

  useEffect(() => {
    setLoading(true)
    const timerId = setTimeout(() => {
      fetchTarefas()
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [pesquisar]);


  useEffect(() => {
    setTarefas([]);
    fetchTarefas()

  }, [status, past, forceUpdate, params])

  //Alerta
  useEffect(() => {
    if (alertVisible) {
      setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
    }
  }, [alertVisible]);

  function mostrarAlerta() {
    setAlertVisible(true);
  }

  return (
    <>
      <div
        ref={alertaRef}

        style={{
          opacity: alertVisible ? 1 : 0,
          visibility: alertVisible ? 'visible' : 'hidden',
          transition: 'opacity 0.5s linear, visibility 0.5s linear',
        }}
      >
        <Alerta msg='Tarefa criada com exito.' />
      </div>

      {loading && <Loading />
      }
      {erro && <div>{erro}</div>}
      <section className='h-full overflow-auto scroll navSideBarFolders w-full'>

        <div className=" space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 w-full">
          <div className="flex items-center justify-between ">
            <h2 className="font-semibold text-slate-900 dark:text-white">Tarefas <span class="px-3 py-1 text-xs text-azul bg-blue-100 rounded-full dark:bg-azulQuasePreto dark:text-white">{tarefas.length} de {pagination && pagination.total || 0} Tarefas</span></h2>
            <a onClick={(e) => { e.preventDefault(); criarTarefa(); }} className="rounded-xl  cursor-pointer hover:bg-blue-400 group flex items-center transition-all bg-azul text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
              <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
              </svg>
              Nova Tarefa
            </a>
          </div>
          <div className=" flex items-center justify-between">
            <div className='group relative flex items-center'>
              <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
              <input className="h-15 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-xl py-2 pl-10 ring-1 ring-slate-200 shadow-sm dark:bg-transparent dark:text-white" type="text" aria-label="Filter projects" placeholder="Procurar projetos..." onChange={(e) => { setPesquisar(e.target.value) }} />
              <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />

            </div>
            <div className='flex gap-5' >
              <div className='flex gap-1'>
                <label htmlFor="de">De</label>
                <input type="date" id='de' className='className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"' />
                <label htmlFor="ate">Ate</label>
                <input type="date" id='ate' className='className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"' />
              </div>


              <select onChange={(e) => { setParams({ ...params, perPage: e.target.value }) }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="10" >10</option>
                <option value="20">20</option>
                <option value="30" >30</option>
                <option value="100000" >todos</option>
              </select>

              <select onChange={(e) => { setvisualize(e.target.value) }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="02" >lista</option>
                <option value="01">Pin</option>
                <option value="03" >Kanban</option>
              </select>

              <select onChange={(e) => { setStatus(e.target.value) }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" select>status</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Pendente" >Pendente</option>
                <option value="Cancelada" >Cancelada</option>
                <option value="Interrompida" >Interrompida</option>
                <option value="Concluida" >Concluida</option>
                <option value="Finalizada" >Finalizada</option>
              </select>
            </div>
          </div>
        </div>

        {visualize == 1 ? <TarefaVisual01 tarefas={tarefas} tarefaEspecifica={tarefaEspecifica} setTarefaEspecifica={setTarefaEspecifica} setOpenVisualizar={setOpenVisualizar} openVisualizar={openVisualizar} criarTarefa={criarTarefa} /> : ""}
        {visualize == 2 ? <TarefaVisual02 tarefas={tarefas} tarefaEspecifica={tarefaEspecifica} setTarefaEspecifica={setTarefaEspecifica} setOpenVisualizar={setOpenVisualizar} openVisualizar={openVisualizar} criarTarefa={criarTarefa} params={params} setParams={setParams} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} edit={edit} setEdit={setEdit} /> : ""}
        {visualize == 3 ? <KanbanBoard tarefas={tarefas} tarefaEspecifica={tarefaEspecifica} setTarefaEspecifica={setTarefaEspecifica} setOpenVisualizar={setOpenVisualizar} openVisualizar={openVisualizar} criarTarefa={criarTarefa} /> : ""}
        {pagination && <div class="flex items-center justify-between mt-6">
          <a onClick={() => { params.page > 1 ? setParams({ ...params, page: (params.page - 1) }) : null }} class="cursor-pointer flex items-center px-5 py-2 text-xs text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span>
              Anterior
            </span>
          </a>

          <div class="items-center hidden lg:flex gap-x-3">
            {pagination && (pagination.currentPage == 1 || pagination.prevPage == 1) ? null : <div> <a href="#" class="px-2 py-1 text-xs text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60" onClick={() => setPage(1)}>1</a> <span className='px-2 py-1 text-xs text-blue-500'>...</span></div>}
            {pagination && pagination.currentPage > 1 ? <a href="#" class="px-2 py-1 text-xs text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60" onClick={() => setParams({ ...params, page: pagination.prevPage })}>{pagination && pagination.prevPage}</a> : null}
            <a href="#" class="px-2 py-1 text-xs text-white rounded-md dark:bg-gray-800 bg-azul" onClick={() => setPage(pagination.currentPage)} >{pagination && pagination.currentPage}</a>

            {pagination && (pagination.currentPage == pagination.lastPage ? pagination.lastPage : +pagination.currentPage + 1) == pagination.currentPage ?
              null :
              <a href="#" class="px-2 py-1 text-xs text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                onClick={() => setParams({ ...params, page: (pagination.currentPage == pagination.lastPage ? pagination.lastPage : +pagination.currentPage + 1) })} >
                {pagination && (pagination.currentPage == pagination.lastPage ? pagination.lastPage : +pagination.currentPage + 1)}</a>
            }



            {pagination && +pagination.lastPage == +pagination.currentPage || +pagination.lastPage == +pagination.currentPage + 1 ? null : <div> <span className='px-2 py-1 text-xs text-blue-500'>...</span> <a href="#" class="px-2 py-1 text-xs text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60" onClick={() => setPage(pagination.lastPage)} >{pagination && pagination.lastPage}</a> </div>}
          </div>

          <a onClick={() => { (params.page > 0 && +pagination.currentPage != +pagination.lastPage) ? setParams({ ...params, page: (params.page + 1) }) : null }} class="cursor-pointer flex items-center px-5 py-2 text-xs text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>
              Próximo
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>}

      </section >
      <Modal open={openModal} setOpenModal={setOpenModal}>
        <div className='bg-white p-3 rounded-xl min-w-[600px] min-h-[600px] flex flex-col items-center justify-center'>
          {criarLoad ? <div role="status" className='flex items-center justify-center '>
            <svg aria-hidden="true" class="w-20 h-20 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div> : <div className='w-full h-full'>
            <div className='flex'>
              <div className='my-5 rounded  shadow-sm  pl-5 pr-5 gap-1 transition-all text-gray-600 font-medium hover:text-white hover:bg-azul border-gray-400 border-inherit border flex items-center cursor-pointer' onClick={() => { setOpenModal(!openModal) }}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                <p className='' > Voltar</p>
              </div>
            </div>
            <form className='flex flex-col gap-5' onSubmit={enviarDadosDoFormulario}>

              <div className='flex flex-col'>
                <label className='self-start font-bold' htmlFor="titulo">Titulo:</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  className='border border-azul p-2 rounded-md w-full'
                  placeholder="Seu titulo"
                  required
                  value={dadosDoFormulario.titulo}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col'>
                <label className='self-start font-bold ' htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  placeholder="Insira uma descrição"
                  required
                  className='border  p-2 rounded-md w-full h-60'
                  value={dadosDoFormulario.descricao}
                  onChange={handleChange}
                />

              </div>
              <div className='flex flex-col'>
                <label className='self-start font-bold' htmlFor="entrega">Entrega</label>
                <input
                  type="date"
                  id="entrega"
                  name="entrega"
                  placeholder="entrega"
                  required
                  className='border border-azul p-2 rounded-md w-30'
                  value={dadosDoFormulario.entrega}
                  onChange={handleChange}
                />
              </div>
              {past == '' ? <PastaSelect setRole={setDadosDoFormulario} dados={dadosDoFormulario} ></PastaSelect> : null}
              <ButtonDefault nome={'Solicitar Tarefa'}></ButtonDefault>
            </form></div>}
        </div>
      </Modal >
      <Modal open={openVisualizar} setOpenModal={setOpenVisualizar}>

        {/* <TarefaAberta tarefaEspecifica={tarefaEspecifica} openVisualizar={openVisualizar} setOpenVisualizar={setOpenVisualizar} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} edit={edit}></TarefaAberta> */}
        <PainelTarefa tarefaEspecifica={tarefaEspecifica} openVisualizar={openVisualizar} setOpenVisualizar={setOpenVisualizar} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} edit={edit}></PainelTarefa>

      </Modal>
    </>

  );
};

export default Tarefas;


