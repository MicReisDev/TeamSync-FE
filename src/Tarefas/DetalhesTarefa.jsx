import React, { useEffect, useState } from 'react';
import StatusTask from './TarefaLista/StatusTask'
import moment from 'moment/moment';

const status = ['Pendente', 'Em Andamento', 'Cancelada', 'Interrompida', 'Concluida', 'Finalizada']

const DetalhesTarefa = ({ tarefa, forceUpdate, setForceUpdate, edit, setOpenVisualizar, openVisualizar }) => {

    const [editar, setEditar] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const [editTarefa, setEditTarefa] = useState({});

    async function updateStatus(e) {

        e.preventDefault();

        setEditTarefa({ ...editTarefa, status: e.target.outerText })
        // try {
        //   const response = await fetch(`http://localhost:33331/tarefa/${editTarefa.id_tarefa}`, {
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

    async function updateDesc() {
        let token = window.localStorage.getItem('$TOKEN');
        console.log(editTarefa)
        try {
            const response = await fetch(`http://localhost:33331/tarefa/${editTarefa.id_tarefa}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                    titulo: editTarefa.titulo,
                    descricao: editTarefa.descricao,
                    entrega: editTarefa.entrega,
                    status: editTarefa.status,
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


    function handleChange(e) {
        setEditTarefa({
            ...editTarefa,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        setEditTarefa(tarefa[0])
        setEditar(edit)
    }, [tarefa]);
    return (

        editTarefa &&
        <div className='h-full flex flex-col'>
            <div className='flex flex-col '>
                <div className='pt-5 pb-5 flex-col w-full items-center justify-center text-center bg-white  '>

                    {editar ?
                        <div className='flex items-center w-full'>
                            {/* <span className='p-1 bg-blue-200 text-azul rounded-md'> {tarefa.id_tarefa}</span> */}
                            <input type="text" value={editTarefa.titulo} className='outline-none border-none w-full text-4xl text-gray-600 flex flex-col items-center justify-center font-bold px-5 text-center' name='titulo' onChange={handleChange} />
                        </div> :
                        <h1 className=' outline-none border-none w-full text-4xl text-gray-600 flex flex-col items-center justify-center font-bold px-5'>
                            <span className='px-3 mb-4 font-bold bg-blue-100 text-azul rounded-md text-base '>#{editTarefa.id_tarefa}</span>
                            {editTarefa.titulo}
                        </h1>
                    }
                    <div className='font-bold px-2 text-gray-500 mt-2'>
                        {editar ?
                            <input type="date" className='outline-none border-none' value={moment(editTarefa.entrega, 'YYYY-MM-DD').format('YYYY-MM-DD')} name='entrega' onChange={handleChange} /> :
                            <span className='font-bold'>Entrega em {moment(editTarefa.entrega, 'YYYY-MM-DD').format('DD-MMM-YYYY').replace(/-/g, '/')} </span>
                        }
                    </div>
                </div>

                <div className='flex  items-center w-full h-full justify-center gap-2 px-5 py-2'>
                    <div className='flex items-center'>
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
                                            {editTarefa.status == stat ? `${stat}   ✔` : stat}
                                        </div>
                                    ))}



                                </div>
                            )}



                        </div>
                        <div className='flex items-center gap-1 border-gray-200 border rounded-xl p-1 justify-around'>
                            <div className='font-bold text-gray-600 px-2'>Status</div>
                            {editTarefa.status === 'Pendente' && (
                                <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-orange-300 rounded-lg text-white font-bold   px-4 py-1' >{editTarefa.status}</p>
                            )}
                            {editTarefa.status === 'Em Andamento' && (
                                <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-azul rounded-lg text-white font-bold   px-4 py-1'>{editTarefa.status}</p>
                            )}
                            {editTarefa.status === 'Concluida' && (
                                <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-green-400 rounded-lg text-white font-bold   px-4 py-1'>{editTarefa.status}</p>
                            )}
                            {editTarefa.status === 'Cancelada' && (
                                <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-red-700 rounded-lg text-white font-bold   px-4 py-1'>{editTarefa.status}</p>
                            )}
                            {editTarefa.status === 'Interrompida' && (
                                <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-red-500 rounded-lg text-white font-bold   px-4 py-1'>{editTarefa.status}</p>
                            )}
                            {editTarefa.status === 'Atrasada' && (
                                <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-yellow-500 rounded-lg text-azul font-bold   px-4 py-1'>{editTarefa.status}</p>
                            )}
                            {editTarefa.status === 'Finalizada' && (
                                <p className='justify-self-start overflow-hidden ... text-ellipsis truncate max-w-xs bg-green-700 rounded-lg text-white font-bold  px-4 py-1'>{editTarefa.status}</p>
                            )}
                        </div>
                    </div>


                    {editTarefa.status === 'Concluida' || editTarefa.status === 'Finalizada' ? null :
                        <div className='rounded-xl  gap-1  flex items-center justify-around text-gray-600 font-medium p-1 border'>
                            {Number(editTarefa.dias_restantes) > 0 && (<div className='rounded-lg border gap-1 border-azul text-white bg-azul px-4 py-1 font-bold'>Faltam {editTarefa.dias_restantes} dias</div>)}
                            {Number(editTarefa.dias_restantes) < 0 && (<div className='rounded border gap-1 border-red-500 text-white bg-red-500 p-1 font-bold'>Faltam {editTarefa.dias_restantes} dias</div>)}
                        </div>
                    }

                </div>
            </div>
            <div className=' border-gray-200 p-2 bg-gray-50 border flex flex-col gap-1 justify-between w-full h-full rounded-md'>

                {editar ? <div className='flex flex-col items-center gap-3 h-full'>
                    <textarea value={editTarefa.descricao} name='descricao' onChange={handleChange} className='border border-gray-300 bg-white rounded-xl overflow-auto h-full scroll w-[95%] mb-5 mt-5 resize-none'>
                        {editTarefa.descricao}
                    </textarea>
                    <div className='flex gap-2 justify-center px-1 py-2 bg-azul cursor-pointer rounded-xl w-full  text-center text-white font-semibold hover:bg-blue-500 trasnform transition-all hover:translate-y-[-4px]' onClick={updateDesc}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15.3431C16.1606 3 16.5694 3 16.9369 3.15224C17.3045 3.30448 17.5935 3.59351 18.1716 4.17157L19.8284 5.82843C20.4065 6.40649 20.6955 6.69552 20.8478 7.06306C21 7.4306 21 7.83935 21 8.65685V15C21 17.8284 21 19.2426 20.1213 20.1213C19.48 20.7626 18.5534 20.9359 17 20.9827V18L17 17.9384C17.0001 17.2843 17.0001 16.6965 16.9362 16.2208C16.8663 15.7015 16.7042 15.1687 16.2678 14.7322C15.8313 14.2958 15.2985 14.1337 14.7792 14.0638C14.3034 13.9999 13.7157 13.9999 13.0616 14L13 14H10L9.93839 14C9.28427 13.9999 8.69655 13.9999 8.22084 14.0638C7.70149 14.1337 7.16867 14.2958 6.73223 14.7322C6.29579 15.1687 6.13366 15.7015 6.06383 16.2208C5.99988 16.6965 5.99993 17.2843 6 17.9384L6 18V20.9239C5.02491 20.828 4.36857 20.6112 3.87868 20.1213C3 19.2426 3 17.8284 3 15V9ZM15 18V21H9C8.64496 21 8.31221 21 8 20.9983V18C8 17.2646 8.00212 16.8137 8.046 16.4873C8.08457 16.2005 8.13942 16.1526 8.14592 16.1469L8.14645 16.1464L8.14692 16.1459C8.1526 16.1394 8.20049 16.0846 8.48734 16.046C8.81369 16.0021 9.26462 16 10 16H13C13.7354 16 14.1863 16.0021 14.5127 16.046C14.7995 16.0846 14.8474 16.1394 14.8531 16.1459L14.8536 16.1464L14.8541 16.1469C14.8606 16.1526 14.9154 16.2005 14.954 16.4873C14.9979 16.8137 15 17.2646 15 18ZM7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9H12C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7H7Z" fill="currentColor" />
                    </svg>Salvar</div>
                </div> :
                    <textarea value={editTarefa.descricao} readOnly className='border-0 bg-white  overflow-auto scroll h-full  rounded-md'>
                        {editTarefa.descricao}
                    </textarea>}
            </div>
        </div>

    );
};

export default DetalhesTarefa;
