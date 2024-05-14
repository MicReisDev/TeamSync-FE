
import React from 'react';


const StatusTask = ({ tarefa }) => {

    return <>
        {tarefa.status === 'Pendente' && (
            <p className='text-center justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs px-4 py-2 font-bold bg-gradient-to-r from-red-500 to-orange-500  rounded-xl text-white '>{tarefa.status}</p>
        )}
        {tarefa.status === 'Em Andamento' && (
            <p className='text-center justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs px-4 py-2 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white '>{tarefa.status}</p>
        )}
        {tarefa.status === 'Concluida' && (
            <p className='text-center justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs px-4 py-2 font-bold bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-xl text-white'>{tarefa.status}</p>
        )}
        {tarefa.status === 'Cancelada' && (
            <p className='text-center justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs px-4 py-2 font-bold text-white rounded-xl bg-gradient-to-r from-pink-600 to-red-600 '>{tarefa.status}</p>
        )}
        {tarefa.status === 'Interrompida' && (
            <p className='text-center justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs px-4 py-2 font-bold bg-red-300 rounded-xl text-red-700'>{tarefa.status}</p>
        )}
        {tarefa.status === 'Atrasada' && (
            <p className='text-center justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs px-4 py-2 font-bold bg-yellow-200 rounded-xl text-yellow-600 '>{tarefa.status}</p>
        )}
        {tarefa.status === 'Finalizada' && (
            <p className='text-center justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs px-4 py-2 font-bold bg-gradient-to-r from-green-600 to-green-500  rounded-xl text-white '>{tarefa.status}</p>
        )}
    </>
}
export default StatusTask;

