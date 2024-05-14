
import React from 'react';
import moment from 'moment/moment';
import StatusTask from './StatusTask.jsx'
const TarefaVisual01 = ({ tarefas, criarTarefa, tarefaEspecifica, setTarefaEspecifica, openVisualizar, setOpenVisualizar }) => {

    return <>
        <ul className="bg-transparent p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 text-sm leading-6">
            {tarefas && tarefas.map((tarefa) => (
                <li key={tarefa.id_tarefa} onClick={() => { setTarefaEspecifica([tarefa]); setOpenVisualizar(!openVisualizar); }}>
                    <div className='p-[1px] bg-gradient-to-r from-azul/40 via-azul/100 to-azul/40 rounded-3xl'>
                        <div className='bg-white/100 hover:bg-white/90 gap-1 grid grid-cols-3 justify-center align-baseline px-6 py-7 hover:shadow-md group min-h-full dark:text-white rounded-3xl cursor-pointer transition-all dark:bg-richBlack dark:hover:bg-richBlack/0'>

                            <div className='flex items-center'>
                                <p className="overflow-hidden ... text-ellipsis truncate max-w-xs"><b>Titulo:</b> {tarefa.titulo}</p>
                            </div>
                            <p className='flex gap-2 items-center'>
                                <b>Entrega:</b>{moment(tarefa.entrega).format('DD-MM-YYYY').replace(/-/g, '/')}
                            </p>
                            <div className='flex items-center gap-2 justify-end grid-column: auto;'>
                                <StatusTask tarefa={tarefa} />
                            </div>
                        </div>
                    </div>
                </li>
            ))}
            <li className="flex">
                <a onClick={(e) => { e.preventDefault(); criarTarefa(); }} className="transition-all hover:border-blue-500 hover:border-solid hover:bg-white/10 hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-graucous text-sm leading-6 text-slate-900 font-medium dark:text-white">
                    <svg className="group-hover:text-blue-500 mb-1 text-slate-400" width="20" height="20" fill="currentColor" aria-hidden="true">
                        <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                    </svg>
                    Nova Tarefa
                </a>
            </li>
        </ul >
    </>;
};

export default TarefaVisual01;
