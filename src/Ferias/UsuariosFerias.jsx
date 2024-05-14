import React, { useState, useContext, useEffect, useRef } from 'react';
import Modal from '../Helpers/Modal';
import Loading from '../Helpers/Loading';
import { useNavigate } from 'react-router-dom';
import UsuarioDetalhes from './UsuarioDetalhes';
import moment from 'moment';
import NovoColaborador from './ComponenteFerias/NovoColaborador';
import Alerta from '../Helpers/Alerta';
const ListaFerias = () => {
    let token = window.localStorage.getItem('$TOKEN');
    const [openModal, setOpenModal] = useState(false);
    const [debouncedPesquisar, setDebouncedPesquisar] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [openModalEditar, setOpenModalEditar] = useState(false);
    const [openModalVisualizar, setOpenModalVisualizar] = useState(false);
    const alertaRef = useRef(null);
    const [empresas, setEmpresas] = useState([]);
    const [openModalNovoColaborador, setOpenModalNovoColaborador] = useState(false);
    const [trabalhista, setTrabalhista] = useState("");
    const [update, setUpdate] = useState(0);
    const [pesquisar, setPesquisar] = useState("")

    const [user, setUser] = useState('');
    const [empresa, setEmpresa] = useState('')

    const navigator = useNavigate();
    const [pagination, setPagination] = useState()

    const [qtdvencidas, setQtdvencidas] = useState('');

    const [arrUsuarios, setArrUsuarios] = useState([])
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1);

    const [perPage, setPerPage] = useState(10);


    const [status, setStatus] = useState('');


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

    const attPerpage = (e) => {
        setPage(1)
        setPerPage(e.target.value)
    }

    const getEmpresas = async () => {

        try {
            const response = await fetch('http://localhost:33331/colaborador-empresas', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + window.localStorage.getItem('$TOKEN'),
                },
            });

            if (response.ok) {
                const dados = await response.json();

                setEmpresas(dados)
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('Erro', error);
        }

    };



    const Baixar = async () => {

        const endpoint = `http://localhost:33331/colaborador-download?pesquisar=${pesquisar}&empresa=${empresa}&vencidas=${qtdvencidas}&page=${page}&perPage=${perPage}&status=${status}&trabalhista=${trabalhista}`;

        fetch(endpoint, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => response.blob())
            .then((blob) => {

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'PlanilhaMesclada.xlsx';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Erro ao baixar a planilha:', error);
            });
    };

    const fetchUsuarios = async () => {


        try {
            const response = await fetch(`http://localhost:33331/colaborador-ferias?pesquisar=${pesquisar}&empresa=${empresa}&vencidas=${qtdvencidas}&page=${page}&perPage=${perPage}&status=${status}&trabalhista=${trabalhista}`, {
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
                setLoading(false)
                setArrUsuarios(data.data);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error(error);
            setErro('Ocorreu um erro ao buscar os usuários.');
        } finally {

        }
    };
    function mostrarAlerta() {
        setAlertVisible(true);
    }

    function getBgClass(empresa) {
        switch (empresa) {
            case 2:
                return 'bg-orange-400';
            case 3:
                return 'bg-orange-700';
            case 4:
                return 'bg-red-500';
            case 5:
                return 'bg-blue-500';
            case 8:
                return 'bg-green-500';
            case 6:
                return 'bg-gray-500';
            case 7:
                return 'bg-purple-500';
            case 1:
                return 'bg-blue-700';
            case 9:
                return 'bg-blue-700/2';
            default:
                return 'bg-blue-400';
        }
    }

    function getStatusClasses(status) {
        switch (status) {
            case 'Contratado':
                return 'text-green-600 bg-green-200 / dark:bg-green-500/50 dark:text-white font-bold';
            case 'Demitido':
                return 'text-red-600 bg-red-200 / dark:bg-red-500/50 dark:text-white font-bold';
            case 'Ferias':
                return 'text-yellow-600 bg-yellow-200 dark:bg-yellow-100 / dark:bg-yellow-500/50 dark:text-white dark:text-white font-bold';
            case 'Ausente':
                return 'text-orange-600 bg-orange-200 dark:bg-orange-100 dark:text-white';
            default:
                return 'text-gray-600 bg-gray-200 dark:bg-gray-100 dark:text-white';
        }
    }
    useEffect(() => {
        if (alertVisible) {
            setTimeout(() => {
                setAlertVisible(false);
            }, 5000);
        }
    }, [alertVisible]);


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
        setLoading(true)
        setArrUsuarios([]);
        fetchUsuarios();
        getEmpresas()
    }, [openModal, empresa, qtdvencidas, update, page, perPage, status, trabalhista]);

    return <>
        <div
            ref={alertaRef}

            style={{
                opacity: alertVisible ? 1 : 0,
                visibility: alertVisible ? 'visible' : 'hidden',
                transition: 'opacity 0.5s linear, visibility 0.5s linear',
            }}
        >
            <Alerta msg='Novo Colaborador Criado.' />
        </div>
        {loading ? <Loading /> : ""}
        <section class=" px-4 mx-auto overflow-y-aut w-full scroll overflow-x-hidden">
            <div className=" space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 dark:bg-transparent">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-slate-900 dark:text-white">Colaboradores <span class="px-3 py-1 text-xs text-azul bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{pagination && pagination.to || 0} de {pagination && pagination.total || 0}</span></h2>
                    <div className=' flex gap-1'>
                        <a onClick={() => { navigator('/listaferias') }} className="rounded-xl gap-1 hover:bg-blue-400 group flex items-center transition-all bg-azul text-white text-xs font-medium pl-2 pr-3 py-2 shadow-sm">

                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 13L15 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M9 9L13 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M9 17L13 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M19 13V15C19 17.8284 19 19.2426 18.1213 20.1213C17.2426 21 15.8284 21 13 21H11C8.17157 21 6.75736 21 5.87868 20.1213C5 19.2426 5 17.8284 5 15V9C5 6.17157 5 4.75736 5.87868 3.87868C6.75736 3 8.17157 3 11 3V3" stroke="currentColor" stroke-width="2" />
                                <path d="M18 3L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M21 6L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>


                            Criar uma analise
                        </a>

                        <a onClick={() => { Baixar() }} className="rounded-xl gap-1 hover:bg-blue-400 group flex items-center transition-all bg-azul text-white text-xs font-medium pl-2 pr-3 py-2 shadow-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 14L11.2929 14.7071L12 15.4142L12.7071 14.7071L12 14ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44771 11 5L13 5ZM6.29289 9.70711L11.2929 14.7071L12.7071 13.2929L7.70711 8.29289L6.29289 9.70711ZM12.7071 14.7071L17.7071 9.70711L16.2929 8.29289L11.2929 13.2929L12.7071 14.7071ZM13 14L13 5L11 5L11 14L13 14Z" fill="currentColor" />
                                <path d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16" stroke="currentColor" stroke-width="2" />
                            </svg>

                            Baixar Analise atual
                        </a>
                        <a onClick={() => { setOpenModalNovoColaborador(true) }} className="rounded-xl  hover:bg-blue-400 group flex gap-1 items-center transition-all bg-azul text-white text-xs font-medium pl-2 pr-3 py-2 shadow-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3267 15.0759C12.8886 15.0255 12.4452 15 12 15C10.0805 15 8.19383 15.4738 6.63113 16.3732C5.06902 17.2721 3.88124 18.5702 3.33091 20.1106C3.1451 20.6307 3.41608 21.203 3.93617 21.3888C4.45626 21.5746 5.02851 21.3036 5.21432 20.7835C5.57558 19.7723 6.39653 18.8157 7.62872 18.1066C8.64272 17.523 9.86375 17.1503 11.158 17.0368C11.4889 16.0601 12.3091 15.3092 13.3267 15.0759Z" fill="currentColor" />
                                <path d="M18 14L18 22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                                <path d="M22 18L14 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                            </svg>

                            Novo colaborador
                        </a>

                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="group relative inline-block ">
                        <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                        <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-xs leading-6 bg-white placeholder-slate-400 rounded-xl py-2 pl-10 ring-2 ring-slate-200 shadow-sm dark:bg-transparent text-slate-400" type="text" aria-label="Filter projects" placeholder="Pesquisar..." onChange={(e) => { setPesquisar(e.target.value) }} />

                    </div>
                    <div className='flex gap-1'>
                        <select onChange={(e) => setStatus(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" selected>Todos</option>
                            <option value="Contratado" >Contratado</option>
                            <option value="Demitido">Demitido</option>
                            <option value="Ausente" >Ausente</option>
                            <option value="Ferias">Ferias</option>
                            <option value="Afastado" >Afastado</option>
                        </select>
                        <select onChange={(e) => { setTrabalhista(e.target.value) }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" >Processo</option>
                            <option value="true">Está processando a empresa</option>
                            <option value="false" >Não está processando</option>
                        </select>
                        <select onChange={attPerpage} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="10" selected>10</option>
                            <option value="20">20</option>
                            <option value="30" >30</option>
                            <option value="40">40</option>
                            <option value="50" >50</option>
                            <option value="10000" >todos</option>
                        </select>
                        <select onChange={(e) => { setQtdvencidas(e.target.value) }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" >Qtds Vencidas</option>
                            <option value="0" >0</option>
                            <option value="1">1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                        </select>
                        <select onChange={(e) => { setEmpresa(e.target.value) }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" >Todas As Empresas</option>
                            {empresas.length > 0 && empresas.map((empresa) => (
                                < option key={empresa.nome_empresarial} value={empresa.empresa_id} >
                                    {empresa.nome_empresarial}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex flex-col mt-6 ">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-800">

                                    <tr>
                                        <th scope="col" class="py-3.5 px-4 text-xs font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div class="flex items-center gap-x-3">

                                                <span>Nome</span>
                                            </div>
                                        </th>
                                        {/* <th scope="col" class="px-4 py-3.5 text-xs font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div class="flex items-center gap-x-2">
                                                <span>Processo</span>

                                            </div>
                                        </th> */}


                                        <th scope="col" class="px-4 py-3.5 text-xs font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div class="flex items-center gap-x-2">
                                                <span>DP /Centro de Custo/ Cargo</span>

                                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                </svg> */}
                                            </div>
                                        </th>



                                        <th scope="col" class="relative py-3.5 px-4 text-xs font-normal text-gray-500 dark:text-gray-400">
                                            Dados
                                        </th>
                                        <th scope="col" class="px-4 py-3.5 text-xs font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Trabalhista/Empresa</th>
                                        <th scope="col" class="px-4 py-3.5 text-xs font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Férias Vencidas</th>
                                        <th scope="col" class="relative py-3.5 px-4">
                                            <span class="sr-only">Edit</span>
                                        </th>
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
                                                    {usuario.status == 'Ferias' ? <div class="flex flex-col items-center gap-y-1">
                                                        <p className={`px-3 py-1 text-xs rounded-md w-full text-center ${getStatusClasses(usuario.status)}`}>{usuario.status}</p>
                                                        <p class="px-3 py-1 text-xs rounded-md w-full text-center text-gray-900  bg-yellow-100 font-bold">Inicio: {moment(usuario.inicio, 'DD-MM-YYYY').format('DD/MM/YYYY')}</p>
                                                        <p class="px-3 py-1 text-xs rounded-md w-full text-center text-gray-900  bg-yellow-100 font-bold">Retorno: {moment(usuario.retorno, 'DD-MM-YYYY').format('DD/MM/YYYY')}</p>

                                                    </div> :
                                                        <div class="flex flex-col items-center gap-y-1">
                                                            <p className={`px-3 py-1 text-xs rounded-md w-full text-center ${getStatusClasses(usuario.status)}`}>{usuario.status}</p>
                                                            <p class="px-3 py-1 text-xs rounded-md w-full text-center text-gray-900  bg-gray-100/75 font-bold">Admissão: {moment(usuario.data_admissao, 'DD-MM-YYYY').format('DD/MM/YYYY')}</p>
                                                            <p class="px-3 py-1 text-xs rounded-md w-full text-center text-gray-900  bg-gray-100/75 font-bold">Ultimas férias: {usuario.ultimas_ferias == '0000-00-00' ? 'Em Branco' : moment(usuario.ultimas_ferias, 'DD-MM-YYYY').format('DD/MM/YYYY')}</p>

                                                        </div>}
                                                </td>

                                                <td className="px-4 flex flex-col gap-1 py-4 text-xs whitespace-nowrap text-ellipsis overflow-hidden max-w-sm relative ">
                                                    <div className='gap-y-1 flex flex-col'>
                                                        <p className={`px-3 py-1 text-xs text-center rounded-md w-full text-white  dark:bg-verde1 dark:text-azulQuasePreto ${getBgClass(usuario.empresa_id)}`}>
                                                            {usuario.empresa}
                                                        </p>

                                                    </div>

                                                    <div class="flex flex-col justify-center items-center gap-y-1 text-ellipsis max-w-xs" >
                                                        <div className={usuario.trabalhista == 'true' ? 'px-3 py-1 text-xs rounded-md w-full text-cente  bg-red-100 text-red-700 text-center' : 'px-3 py-1 text-xs rounded-md w-full text-center text-green-700  bg-green-100 '}>{usuario.trabalhista == 'true' ? 'Processando' : 'Sem Processos'}</div>
                                                    </div>

                                                </td>
                                                <td class="px-4 py-2 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap ">
                                                    <div className='flex flex-col justify-center items-center gap-y-1'>
                                                        {usuario.ferias_vencidas > 0 ? <div className='px-3 py-1 text-xs rounded-md w-full text-center bg-red-600 text-white'>Vencidas: {usuario.ferias_vencidas}</div> : <div className='px-3 py-1 text-xs rounded-md w-full text-center bg-green-600 text-white'>Vencidas: {usuario.ferias_vencidas}</div>}


                                                    </div>
                                                </td>

                                                <td class="px-4 py-4 text-xs whitespace-nowrap">
                                                    <div class="flex items-center gap-x-6">
                                                        <button onClick={() => { visualizarUsuario(usuario) }} className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none"  >
                                                            <svg
                                                                viewBox="0 0 1024 1024"
                                                                fill="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                                                            </svg>
                                                        </button>
                                                        {/* <button onClick={() => { editarUsuario(usuario) }} class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                        </button> */}
                                                        {/* <button onClick={() => { confirmeExcluir(usuario) }} class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
 */}


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

            <div class="flex items-center justify-between mt-6">
                <a onClick={() => { page > 1 ? setPage(page - 1) : null }} class="cursor-pointer flex items-center px-5 py-2 text-xs text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <span>
                        Anterior
                    </span>
                </a>

                <div class="items-center hidden lg:flex gap-x-3">
                    {pagination && (pagination.currentPage == 1 || pagination.prevPage == 1) ? null : <div> <a href="#" class="px-2 py-1 text-xs text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60" onClick={() => setPage(1)}>1</a> <span className='px-2 py-1 text-xs text-blue-500'>...</span></div>}
                    {pagination && pagination.currentPage > 1 ? <a href="#" class="px-2 py-1 text-xs text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60" onClick={() => setPage(pagination.prevPage)}>{pagination && pagination.prevPage}</a> : null}
                    <a href="#" class="px-2 py-1 text-xs text-white rounded-md dark:bg-gray-800 bg-azul" onClick={() => setPage(pagination.currentPage)} >{pagination && pagination.currentPage}</a>

                    {pagination && (pagination.currentPage == pagination.lastPage ? pagination.lastPage : +pagination.currentPage + 1) == pagination.currentPage ?
                        null :
                        <a href="#" class="px-2 py-1 text-xs text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                            onClick={() => setPage((pagination.currentPage == pagination.lastPage ? pagination.lastPage : +pagination.currentPage + 1))} >
                            {pagination && (pagination.currentPage == pagination.lastPage ? pagination.lastPage : +pagination.currentPage + 1)}</a>
                    }



                    {pagination && pagination.lastPage == pagination.currentPage ? null : <div> <span className='px-2 py-1 text-xs text-blue-500'>...</span> <a href="#" class="px-2 py-1 text-xs text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60" onClick={() => setPage(pagination.lastPage)} >{pagination && pagination.lastPage}</a> </div>}
                </div>

                <a onClick={() => { page > 0 ? setPage(page + 1) : null }} class="cursor-pointer flex items-center px-5 py-2 text-xs text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>
                        Próximo
                    </span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </a>
            </div>
        </section >
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

        <Modal open={openModalNovoColaborador} setOpenModal={setOpenModalNovoColaborador} >
            <NovoColaborador mostrarAlert={mostrarAlerta} openModalNovoColaborador={openModalNovoColaborador} setOpenModalNovoColaborador={setOpenModalNovoColaborador} />
        </Modal >
        < Modal open={openModalVisualizar} setOpenModal={setOpenModalVisualizar} >
            <UsuarioDetalhes usuario={user} update={update} setUpdate={setUpdate} openModal={openModalVisualizar} setOpenModal={setOpenModalVisualizar} />
        </Modal >
    </>

}

export default ListaFerias;
