import React, { useState } from 'react';
import Modal from '../../Helpers/Modal';
import DropZone from '../DropZone'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faArrowLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
const ListaFerias = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [openModalEditar, setOpenModalEditar] = useState(false);
    const [openModalVisualizar, setOpenModalVisualizar] = useState(false);
    const [novaAnalise, setNovaAnalise] = useState(false)
    const [imgs, setimgs] = useState('');
    const [user, setUser] = useState('');
    const [planilhas, setPlanilhas] = useState({
        planilha01: "",
        planilha02: ""
    })
    const navigate = useNavigate();
    const [arrUsuarios, setArrUsuarios] = useState([])
    let token = window.localStorage.getItem('$TOKEN');
    const visualizar = (img) => {
        setimgs(img)
        setOpenModal(!openModal);
    };

    const confirmeExcluir = (usuario) => {
        setUser(usuario)
        setOpenModalExcluir(!openModalExcluir);
    };

    const editarUsuario = (usuario) => {
        setUser(usuario)
        setOpenModalEditar(!openModalEditar);
    }

    const visualizarUsuario = (usuario) => {

        setUser(usuario)
        setOpenModalVisualizar(!openModalVisualizar);
    }

    const GerarAnalise = async () => {
        try {
            const response = await fetch(`http://localhost:33331/planilha`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify(planilhas)
            });

            const data = await response.json();
            if (data.error) {
                console.log('Erro ao enviar dados:', data.error);
            } else {
                setArrUsuarios(data)
                setNovaAnalise(!novaAnalise)
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        }

    }


    const Baixar = async () => {

        const endpoint = 'http://localhost:33331/planilha/baixar';

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(planilhas)
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Criar uma URL para o blob
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'planilha_analise.xlsx'; // O nome do arquivo
                document.body.appendChild(a); // Anexa o link ao DOM
                a.click(); // Força o download
                a.remove(); // Limpa o link do DOM
                window.URL.revokeObjectURL(url); // Limpa a URL do blob
            })
            .catch((error) => {
                console.error('Erro ao baixar a planilha:', error);
            });
    };



    return <>

        <section class=" px-4 mx-auto overflow-y-aut w-full scroll overflow-x-hidden">
            <div className=" space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 dark:bg-transparent">
                <div className="flex items-center justify-between">
                    <div className='flex gap-1'>
                        <div className='rounded  shadow-sm  pl-5 pr-5 gap-1 transition-all text-gray-600 font-medium hover:text-white hover:bg-azul border-gray-200 border-inherit border flex items-center cursor-pointer' onClick={() => { navigate('/colaboradores') }}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                            <p className='' > Voltar</p>
                        </div>
                        <h2 className="font-semibold text-slate-900 dark:text-white"> <span class="px-3 py-1 text-xs text-azul bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{arrUsuarios.length} Colaboradores</span></h2>
                    </div>

                    <div className=' flex gap-1'>
                        <a onClick={() => { Baixar() }} className="rounded-xl  hover:bg-blue-400 group flex items-center transition-all bg-azul text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                            <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                            </svg>
                            Baixar Analise
                        </a>
                        <a onClick={() => { setNovaAnalise(!novaAnalise) }} className="rounded-xl  hover:bg-blue-400 group flex items-center transition-all bg-azul text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                            <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                            </svg>
                            Criar
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
            <div class="flex flex-col mt-6 ">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-800">

                                    <tr>
                                        <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div class="flex items-center gap-x-3">

                                                <span>Nome</span>
                                            </div>
                                        </th>


                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div class="flex items-center gap-x-2">
                                                <span>DP/Centro de Custo/Cargo</span>

                                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                </svg> */}
                                            </div>
                                        </th>



                                        <th scope="col" class="relative py-3.5 px-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                                            Dados
                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">limite/qtd vencidas/avos</th>
                                        {/* <th scope="col" class="relative py-3.5 px-4">
                                            <span class="sr-only">Edit</span>
                                        </th> */}
                                    </tr>


                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">


                                    {arrUsuarios.length > 0 &&
                                        arrUsuarios.map((usuario) => (
                                            <tr key={usuario.id_usuario} >
                                                <td class="px-4 py-4 text-xs font-medium text-gray-700 whitespace-nowrap">
                                                    <div class="inline-flex items-center gap-x-3">


                                                        <div class="flex items-center gap-x-2">
                                                            <div>
                                                                <h2 class="text-gray-800 dark:text-whit w-[300px] whitespace-nowrap text-ellipsis overflow-hidden / dark:text-white font-bold text-md">{usuario.nome}</h2>
                                                                <p class="w-32 px-2 py-1 rounded-md font-bold text-xs text-gray-600 / dark:text-gray-300 dark:bg-gray-800">RE: {usuario.codigo}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td class="px-4 py-1 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div class="flex flex-col justify-center items-center gap-y-1 max-w-xs" >
                                                        <div className='px-3 py-1 text-xs rounded-md w-full text-center text-gray-900 font-bold bg-gray-100/75 dark:bg-gray-800 dark:text-white overflow-ellipsis overflow-hidden whitespace-nowrap'>{usuario.departamento}</div>
                                                        <div className='px-3 py-1 text-xs rounded-md w-full text-center text-gray-900 font-bold bg-gray-100/75 dark:bg-gray-800 dark:text-white overflow-ellipsis overflow-hidden whitespace-nowrap'>{usuario.centro_de_custo}</div>
                                                        <div className='px-3 py-1 text-xs rounded-md w-full text-center text-gray-900 font-bold bg-gray-100/75 dark:bg-gray-800 dark:text-white overflow-ellipsis overflow-hidden whitespace-nowrap'>{usuario.cargo}</div>
                                                    </div>
                                                </td>

                                                <td class="px-4 py-2 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div class="flex flex-col items-center gap-y-1">

                                                        <p class="px-3 py-1 text-xs rounded-md w-full text-center text-gray-900  bg-gray-100/75 font-bold">Admissão: {moment(usuario.data_admissao, 'DD-MM-YYYY').format('DD/MM/YYYY')}</p>
                                                        <p class="px-3 py-1 text-xs rounded-md w-full text-center text-gray-900  bg-gray-100/75 font-bold">Ultimas férias: {usuario.ultimas_ferias == '0000-00-00' || ' ' ? 'Em Branco' : moment(usuario.ultimas_ferias, 'DD-MM-YYYY').format('DD/MM/YYYY')}</p>

                                                    </div>
                                                </td>

                                                <td class="px-4 py-2 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap ">
                                                    <div className='flex flex-col justify-center items-center gap-y-1'>
                                                        {usuario.ferias_vencidas > 0 ? <div className='px-3 py-1 text-xs rounded-md w-full text-center bg-red-600 text-white'>Vencidas: {usuario.ferias_vencidas}</div> : <div className='px-3 py-1 text-xs rounded-md w-full text-center bg-green-600 text-white'>Vencidas: {usuario.ferias_vencidas}</div>}


                                                    </div>
                                                </td>


                                            </tr>

                                        ))
                                    }




                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div class="flex items-center justify-between mt-6">
  <a href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>

    <span>
      Anterior
    </span>
  </a>

  <div class="items-center hidden lg:flex gap-x-3">
    <a href="#" class="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
  </div>

  <a href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
    <span>
      Próximo
    </span>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
  </a>
</div> */}
        </section>
        {/* 
        <Modal open={openModalExcluir} setOpenModal={setOpenModalExcluir} >
            <ConfirmarDelete usuario={user} openModalExcluir={openModalExcluir} setOpenModalExcluir={setOpenModalExcluir} setUpdateComponent={setUpdateComponent} updateComponent={updateComponent}></ConfirmarDelete>
        </Modal>
        <Modal open={openModalEditar} setOpenModal={setOpenModalEditar} >
            <EditarUsuario usuario={user} openModalEditar={openModalEditar} setOpenModalEditar={setOpenModalEditar} setUpdateComponent={setUpdateComponent} updateComponent={updateComponent}></EditarUsuario>
        </Modal>
        <Modal open={openModalVisualizar} setOpenModal={setOpenModalVisualizar}>
            <VisualizarUsuario usuario={user} openModalVisualizar={openModalVisualizar} setOpenModalVisualizar={setOpenModalVisualizar}> </VisualizarUsuario>
        </Modal> */}

        <Modal open={novaAnalise} setOpenModal={setNovaAnalise} >
            <div className='flex flex-col w-[60vw] items-center justify-center gap-5 p-5 bg-white rounded'>
                {(planilhas.planilha01 == '') || (planilhas.planilha02 == '') ? <div className='text-center p-5'>
                    Enviar arquivo planilha de
                    <div className='px-3 py-1  text-center text-green-700 bg-green-100 rounded-full dark:bg-verde1 dark:text-azulQuasePreto'> {planilhas.planilha01 == '' ? 'FÉRIAS' : 'Periodo Aquisitivo'} </div>
                </div> : null}


                <div className='flex flex-col gap-1 p-1'>
                    <p>Planilhas</p>
                    {planilhas && Object.values(planilhas).map((pla, index) => (
                        pla != '' ?
                            <div className='flex items-center justify-center gap-5'>
                                <div className='px-3 py-1  text-center text-sm text-white bg-azul rounded-full dark:bg-verde1 dark:text-azulQuasePreto'>{index + 1}</div>

                                < div  >
                                    {pla}
                                </div>
                            </div> : null

                    ))}
                </div>

                {(planilhas.planilha01 == '') || (planilhas.planilha02 == '') ? <DropZone planilhas={planilhas} setPlanilhas={setPlanilhas} /> : null}

                <div onClick={() => { GerarAnalise() }} className="cursor-pointer hover:bg-green-700 rounded-tl-xl rounded-br-xl text-center transition-all bg-green-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                    Gerar Analise
                </div>
            </div>

        </Modal >
    </>

}

export default ListaFerias;
