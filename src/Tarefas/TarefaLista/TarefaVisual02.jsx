
import React, { useState } from 'react';
import StatusTask from './StatusTask.jsx'
import Modal from '../../Helpers/Modal.jsx';
import ConfirmarDeleteTarefa from './ConfirmarDeleteTarefa.jsx'
import moment from 'moment'
const TarefaVisual02 = ({ tarefas, criarTarefa, pagination, tarefaEspecifica, setTarefaEspecifica, openVisualizar, setOpenVisualizar, params, setParams, forceUpdate, setForceUpdate, edit, setEdit }) => {
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    function getBgClass(id) {
        switch (id) {
            case '1':
                return 'bg-green-500';
            case '2':
                return 'bg-blue-900';
            case '3':
                return 'bg-orange-500';
            case '4':
                return 'bg-red-500';
            case '5':
                return 'bg-black';
            default:
                return 'bg-azul';
        }
    }
    return <>
        <section class="overflow-x-hidden">
            <div class="flex flex-col mt-6">
                <div class=" overflow-x-auto">
                    <div class="inline-block min-w-full align-middle p-2">
                        <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg ">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                                <thead class="bg-gray-50 dark:bg-gray-800">

                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <button className="flex items-center gap-x-3 focus:outline-none">
                                                <span>Titulo</span>

                                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {
                                                    if (params.ordem == 'asc') setParams({ ...params, ordem: 'desc' })
                                                    else setParams({ ...params, ordem: 'asc' })

                                                    setForceUpdate(forceUpdate + 1)
                                                }}>

                                                    <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                    <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                    <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                </svg>
                                            </button>
                                        </th>

                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Descrição
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Entrega</th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Ações</th>


                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y min-w-full divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 ">
                                    {tarefas.map((tarefa) => (
                                        <tr key={tarefa.id_tarefa}>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap overflow-hidden ... text-ellipsis truncate max-w-xs">
                                                <div className='flex flex-col gap-1'>
                                                    <h2 className="font-medium text-gray-800 dark:text-white text-ellipsis max-w-[250px] overflow-hidden ">#{tarefa.id_tarefa} - {tarefa.titulo}</h2>
                                                    <div>
                                                        <p className={`text-sm inline font-normal text-center text-white  rounded-lg px-2 py-1 ${getBgClass(tarefa.id_pasta)}`}>{tarefa.pasta}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap w-10">
                                                <StatusTask tarefa={tarefa} />
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div>
                                                    <h4 className="text-gray-700 dark:text-gray-200 text-ellipsis max-w-[250px] overflow-hidden">{tarefa.descricao}</h4>
                                                    {/* <p className="text-gray-500 dark:text-gray-400">Brings all your news into one place</p> */}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className=' flex flex-col gap-1 '>
                                                    <div className='bg-orange-200 text-orange-500 text-center rounded-md'>Criado {moment(tarefa.criado, 'YYYY-MM-DD').format('DD-MM-YYYY').replace(/-/g, '/')}</div>
                                                    <div className='bg-blue-200 text-azul text-center rounded-md'>Entrega {moment(tarefa.entrega, 'YYYY-MM-DD').format('DD-MM-YYYY').replace(/-/g, '/')}</div>

                                                    {tarefa.status === 'Concluida' || tarefa.status === 'Finalizada' ? null :
                                                        <>
                                                            {tarefa.dias_restantes == '0' ?
                                                                <div className='bg-green-200 text-center rounded-md text-green-500'>Hoje</div>
                                                                : moment(tarefa.entrega).isBefore(moment()) ?
                                                                    <div className='bg-red-200 text-center rounded-md text-red-700'>Atrasado a {tarefa.dias_restantes < 1 ? tarefa.dias_restantes + ' dia' : tarefa.dias_restantes + ' dias'}</div>
                                                                    : <div className='bg-green-200 text-center rounded-md text-green-500'>Faltam {tarefa.dias_restantes > 1 ? tarefa.dias_restantes + ' dias' : tarefa.dias_restantes + ' dia'} </div>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                                {/* <div className="flex items-center">
                                                    <img className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" alt=""></img>
                                                    <img className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" alt=""></img>
                                                    <img className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80" alt=""></img>
                                                    <img className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" alt=""></img>
                                                    <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">+4</p>
                                                </div> */}
                                            </td>
                                            <td className="  px-4 py-4 text-sm whitespace-nowrap">
                                                <div className='flex items-center gap-5'>
                                                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none" onClick={() => { setEdit(false); setTarefaEspecifica([tarefa]); setOpenVisualizar(!openVisualizar); }} >
                                                        <svg
                                                            viewBox="0 0 1024 1024"
                                                            fill="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                                                        </svg>
                                                    </button>
                                                    <button class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none" onClick={() => { setEdit(true); setTarefaEspecifica([tarefa]); setOpenVisualizar(!openVisualizar); }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                    </button>
                                                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" onClick={() => { setTarefaEspecifica([tarefa]); setOpenModalExcluir(!openModalExcluir); }} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </div>


                                                {/* <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                    </svg>
                                                </button> */}
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



        </section>
        <Modal open={openModalExcluir} setOpenModal={setOpenModalExcluir}>
            <ConfirmarDeleteTarefa openModalExcluir={openModalExcluir} setOpenModalExcluir={setOpenModalExcluir} tarefa={tarefaEspecifica[0]} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />
        </Modal>


    </>;
};

export default TarefaVisual02;
