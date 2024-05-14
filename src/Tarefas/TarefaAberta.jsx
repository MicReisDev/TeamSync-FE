import React, { useState } from 'react';
//import './CSS/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faArrowLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';
import ButtonDefault from '../Components/ButtonDefault';
import TimeAlocado from '../Usuarios/TimeAlocado'
import ComentariosTarefa from './ComentariosTarefa';
import { useNavigate } from 'react-router-dom';
import ArquivosTarefa from './ArquivosTarefa'
import StatusTask from './TarefaLista/StatusTask'
const TarefaAberta = ({ tarefaEspecifica, openVisualizar, setOpenVisualizar, forceUpdate, setForceUpdate, edit }) => {

  const [tarefa, setTarefas] = React.useState({})
  const [aba, setAba] = React.useState(1)
  const [isOpen, setIsOpen] = useState(false);
  const [editar, setEditar] = useState(edit)
  const [tarefaLoading, setTarefaLoading] = useState(false);
  const [arquivos, setArquivos] = useState([])
  const [newArquivo, setNewArquivo] = useState({
    id_tarefa: "",
    url: "",
    arquivo: "",
    tamanho: "",
    tipo: ""
  })


  const handleImagemChange = (event) => {
    const imagemSelecionada = event.target.files[0];

    enviarImagem(imagemSelecionada)
  };

  const status = ['Pendente', 'Em Andamento', 'Cancelada', 'Interrompida', 'Concluida', 'Finalizada']
  const navigate = useNavigate()

  React.useEffect(() => {

    setTarefas(tarefaEspecifica[0])

  }, [tarefaEspecifica, forceUpdate])

  async function updateStatus(e) {

    e.preventDefault();
    let token = window.localStorage.getItem('$TOKEN');
    setTarefas({ ...tarefa, status: e.target.outerText })
    // try {
    //   const response = await fetch(`http://localhost:33331/tarefa/${tarefa.id_tarefa}`, {
    //     method: 'put',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + token,
    //     },
    //     body: JSON.stringify({ status: e.target.outerText }),
    //   });

    //   const data = await response.json();
    //   if (data.error) {
    //     console.log('Erro ao enviar dados:', data.error);
    //   } else {
    //     setOpenVisualizar(!openVisualizar)
    //     setForceUpdate(prevForceUpdate => prevForceUpdate + 1);
    //     navigate('/tarefas')
    //   }
    // } catch (error) {
    //   console.error(error);
    //   console.log('Ocorreu um erro ao enviar os dados do formulário.');
    // }

  }

  React.useEffect(() => {
    setEditar(edit)
  }, [edit])

  const enviarImagem = async (imagemSelecionada) => {
    const formData = new FormData();
    formData.append('arquivo', imagemSelecionada);
    formData.append('pasta', 'tarefa');
    setTarefaLoading(true)
    try {
      const response = await fetch('http://localhost:33331/arquivo/uploadCloud', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();


        if (data) insertArquivos({ ...newArquivo, id_tarefa: tarefa.id_tarefa, url: data.url, arquivo: data.originalname, tamanho: data.size, tipo: data.mimetype })
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Erro ao enviar a imagem', error);
    }
  };

  async function getArquivos() {

    let token = window.localStorage.getItem('$TOKEN');

    try {
      const response = await fetch(`http://localhost:33331/tarefa/arquivo/${tarefa.id_tarefa}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const data = await response.json();
      if (data.error) {
        console.log('Erro ao enviar dados:', data.error);
      } else {
        setArquivos(data)
      }
    } catch (error) {
      console.error(error);
      console.log('Ocorreu um erro ao enviar os dados do formulário.');
    }

  }

  async function insertArquivos(obj) {

    let token = window.localStorage.getItem('$TOKEN');

    try {
      const response = await fetch(`http://localhost:33331/tarefa/arquivo`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(obj),
      });

      const data = await response.json();
      if (data.error) {
        console.log('Erro ao enviar dados:', data.error);
      } else {
        setTarefaLoading(false)
        setNewArquivo({
          id_tarefa: "",
          url: "",
          arquivo: "",
          tamanho: "",
          tipo: ""
        })
      }
    } catch (error) {
      console.error(error);
      console.log('Ocorreu um erro ao enviar os dados do formulário.');
    } finally {
      getArquivos()
    }

  }


  function handleChange(e) {
    setTarefas({
      ...tarefa,
      [e.target.name]: e.target.value
    });
  }
  async function updateDesc() {
    let token = window.localStorage.getItem('$TOKEN');

    try {
      const response = await fetch(`http://localhost:33331/tarefa/${tarefa.id_tarefa}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          entrega: tarefa.entrega,
          status: tarefa.status,
        }),
      });

      const data = await response.json();
      if (data.error) {
        console.log('Erro ao enviar dados:', data.error);
      } else {
        setForceUpdate(prevForceUpdate => prevForceUpdate + 1);
        setOpenVisualizar(!openVisualizar)
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  }

  React.useEffect((

  ) => { getArquivos() }, [tarefa])



  return <>

    <div className='inline overflow-auto   scroll p-5 bg-white rounded  shadow-sm w-[800px] h-[600px] '>
      {tarefa && (
        <div key={tarefa.id_tarefa}>
          <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
              <div className='rounded  shadow-sm  pl-5 pr-5 gap-1 transition-all text-gray-600 font-medium hover:text-white hover:bg-azul border-gray-200 border-inherit border flex items-center cursor-pointer' onClick={() => { setOpenVisualizar(!openVisualizar) }}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                <p className='' > Voltar</p>
              </div>
              <div onClick={() => setEditar(!editar)} className='rounded  shadow-sm pl-5 pr-5 gap-3 transition-all hover:text-white hover:bg-azul border-gray-200 border flex items-center cursor-pointer text-gray-600 font-medium'>
                <p>Editar</p>
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
            </div>

            <div className='rounded border gap-1 border-gray-200 flex items-center justify-around text-gray-600 font-medium'>
              {tarefa.status === 'Concluida' || tarefa.status === 'Finalizada' ? <StatusTask tarefa={tarefa} /> :
                <>
                  <div className='font-medium pl-1'>Deadline:
                    {editar ?
                      <input type="date" value={moment(tarefa.entrega).format('YYYY-MM-DD')} name='entrega' onChange={handleChange} /> :
                      <span className='font-bold'>{moment(tarefa.entrega).format('DD-MMM-YYYY').replace(/-/g, '/')} </span>
                    }
                  </div>
                  {Number(tarefa.dias_restantes) > 0 && (<div className='rounded border gap-1 border-azul text-white bg-azul p-1 font-bold'>Dias Restantes: {tarefa.dias_restantes}</div>)}
                  {Number(tarefa.dias_restantes) < 0 && (<div className='rounded border gap-1 border-red-500 text-white bg-red-500 p-1 font-bold'>Dias Restantes: {tarefa.dias_restantes}</div>)}
                </>
              }
            </div>
          </div>
          <div className='pt-5 pb-5 flex w-full items-center justify-center'>
            <span className='p-1 bg-blue-200 text-azul rounded-md'> {tarefa.id_tarefa}</span>
            {editar ? <input type="text" value={tarefa.titulo} className='block w-full overflow-hidden ... text-ellipsis truncate  text-center text-3xl p-1 rounded text-gray-600  shadow-sm font-light border-gray-200 border' name='titulo' onChange={handleChange} /> :
              <h1 className=' block w-full overflow-hidden ... text-ellipsis truncate max-w-full text-center text-3xl p-1 rounded text-gray-600  shadow-sm font-light border-gray-200 border'>

                {tarefa.titulo}
              </h1>
            }
          </div>

          <div className='flex justify-between ' >
            <div className="inline-flex shadow-sm" role="group">
              <button type="button" className="px-4 transition-all py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-tl hover:text-white hover:bg-azul focus:z-10   focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white " onClick={() => setAba(1)}>
                Detalhes
              </button>
              <button type="button" className="px-4 py-2 transition-all text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:text-white hover:bg-azul focus:z-10   focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setAba(2)} >
                Comentários
              </button>
              <button type="button" className="px-4 py-2 transition-all text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-tr hover:text-white hover:bg-azul focus:z-10   focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setAba(3)}>
                Arquivos
              </button>
            </div>
            {/* <div class="flex ">
                <button class="inline-flex items-center  px-4 py-2 text-sm text-center text-gray-700 border border-b-0 border-gray-300 sm:text-base dark:border-gray-500 rounded-t-md dark:text-white whitespace-nowrap focus:outline-none">
                  Profile
                </button>

                <button class="inline-flex items-center  px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base dark:border-gray-500 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 dark:hover:border-gray-300">
                  Account
                </button>

                <button class="inline-flex items-center  px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base dark:border-gray-500 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 dark:hover:border-gray-300">
                  Notification
                </button>
              </div> */}
            <div className='flex justify-center items-center'>
              <div className="relative inline-block">
                {editar ?
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
                  >
                    <svg
                      className="w-5 h-5 text-gray-800 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button> : null}

                {/* Dropdown menu */}
                {isOpen && (
                  <div
                    onClick={() => setIsOpen(false)}
                    className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                  >
                    {status && status.map((stat) => (
                      <div key={stat}
                        onClick={updateStatus}
                        value={stat}
                        className=" px-4 py-3 text-sm text-gray-600 capitalize flex transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        {tarefaEspecifica[0].status == stat ? `${stat}   ✔` : stat}
                      </div>
                    ))}



                  </div>
                )}



              </div>
              <div>
                <div className='flex items-center gap-1 border-gray-200 border rounded pl-1 justify-around m-3'>
                  <div className='font-medium text-gray-600'>status</div>
                  {tarefa.status === 'Pendente' && (
                    <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-orange-300 rounded text-white font-bold   p-1' >{tarefa.status}</p>
                  )}
                  {tarefa.status === 'Em Andamento' && (
                    <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-azul rounded text-white font-bold   p-1'>{tarefa.status}</p>
                  )}
                  {tarefa.status === 'Concluida' && (
                    <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-green-400 rounded text-white font-bold   p-1'>{tarefa.status}</p>
                  )}
                  {tarefa.status === 'Cancelada' && (
                    <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-red-700 rounded text-white font-bold   p-1'>{tarefa.status}</p>
                  )}
                  {tarefa.status === 'Interrompida' && (
                    <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-red-500 rounded text-white font-bold   p-1'>{tarefa.status}</p>
                  )}
                  {tarefa.status === 'Atrasada' && (
                    <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-yellow-500 rounded text-azul font-bold   p-1'>{tarefa.status}</p>
                  )}
                  {tarefa.status === 'Finalizada' && (
                    <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-green-700 rounded text-white font-bold  p-1'>{tarefa.status}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='h-full scroll overflow-auto w-full'>
            {aba && aba == 1 ?
              <div className=' p-1 border-gray-200 bg-gray-50 border flex flex-col gap-1 justify-between'>

                {editar ? <div className='flex flex-col items-center gap-3'>
                  <textarea name='descricao' onChange={handleChange} className='border-slate-200 border  bg-white rounded overflow-auto h-56 w-full scroll p-1'>
                    {tarefa.descricao}
                  </textarea>
                  <div className='px-1 py-2 bg-azul cursor-pointer rounded w-full text-center text-white font-semibold' onClick={updateDesc}>Salvar</div>
                </div> :
                  <textarea readOnly className='border-slate-200 border  bg-white rounded overflow-auto h-full scroll p-1 min-h-[30vh]'>
                    {tarefa.descricao}
                  </textarea>}

                {/* <div className=' flex flex-col border border-tb-3 '>
                  <p className='text-gray-600 font-medium border border-tb-3 p-1  '>Equipe</p>
                  <div className='flex p-5 bg-white'>
                    <TimeAlocado></TimeAlocado>
                  </div>
                </div> */}
              </div>

              : null



            }
            {aba && aba == 2 ?
              <ComentariosTarefa tarefa={tarefaEspecifica} setForceUpdate={setForceUpdate} forceUpdate={forceUpdate}></ComentariosTarefa > : null
            }
            {aba && aba == 3 ?

              <div className="scroll overflow-scroll  p-1 border border-gray-200 bg-gray-50 h-96">
                <div className="flex flex-col gap-1 items-center w-full">

                  {
                    tarefaLoading ?
                      <div role="status">
                        <svg aria-hidden="true" class="w-20 h-20 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div> :
                      <ArquivosTarefa arquivos={arquivos ? arquivos : []} />
                  }





                  <div className=' w-full border border-gray-200 bg-white shadow'>
                    <label htmlFor="imagem" className=''></label>
                    <input
                      type="file"
                      id="imagem"
                      name="imagem"
                      accept="*"
                      onChange={handleImagemChange} />
                  </div>
                </div>


              </div> : null}


          </div>
        </div >
      )}
    </div >

  </>;
};

export default TarefaAberta;