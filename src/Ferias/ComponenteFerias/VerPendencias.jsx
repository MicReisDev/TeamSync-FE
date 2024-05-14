import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';

const VerPendencias = ({ usuario, setUpdate, update, openModal, setOpenModal }) => {
    const [feriasAlteradas, setFeriasAlteradas] = useState([]);
    const token = window.localStorage.getItem('$TOKEN');

    const handleInputChange = (index, field, value) => {

        const novasFerias = feriasAlteradas.map((ferias, idx) =>
            idx === index ? { ...ferias, [field]: value } : ferias
        );
        setFeriasAlteradas(novasFerias);

    };

    const adicionarPeriodoAquisitivo = () => {

        const novoPeriodo = {
            periodo_aquisitivo_1: '',
            periodo_aquisitivo_2: '',
            limite: '',
            saldo: '',
            previsao: '',
            pendente: 'false'
        };

        setFeriasAlteradas([...feriasAlteradas, novoPeriodo]);
    };


    const enviarDados = async () => {

        try {
            const response = await fetch('http://localhost:33331/colaborador-atualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(feriasAlteradas),
            });

            if (response.ok) {
                setUpdate(update + 1)
                setOpenModal(!openModal)
            } else {
                console.error('Falha ao enviar dados.' + response);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    useEffect(() => {
        setFeriasAlteradas(usuario.ferias);
    }, [usuario])



    return (
        <div className='w-full h-full flex flex-col gap-1 bg-white overflow-y-auto rounded-lg shadow-lg border scroll overflow-x-hidden'>
            <table className="divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <div class="flex items-center gap-x-3">

                                <span>Periodo Aquisitivo</span>
                            </div>
                        </th>


                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <div class="flex items-center gap-x-2">
                                <span>Data limite</span>


                            </div>
                        </th>



                        <th scope="col" class="relative py-3.5 px-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                            Saldo de dias
                        </th>
                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Previsão</th>
                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Pendente</th>

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {feriasAlteradas && feriasAlteradas.map((ferias, index) => (

                        <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}>

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                                {!ferias.periodo_aquisitivo ?
                                    <div className='flex gap-1 items-center justify-center w-60' > <input
                                        className='rounded-md bg-white p-1'
                                        type="date"
                                        name=""
                                        value={ferias.periodo_aquisitivo_1 ? moment(ferias.periodo_aquisitivo_1, 'DD-MM-YYYY').format('YYYY-MM-DD') : ''}
                                        onChange={(e) => handleInputChange(index, 'periodo_aquisitivo_1', moment(e.target.value, 'YYYY-MM-DD').format('DD-MM-YYYY'))}
                                    /> a
                                        <input
                                            className='rounded-md bg-white p-1'
                                            type="date"
                                            name=""
                                            value={ferias.periodo_aquisitivo_2 ? moment(ferias.periodo_aquisitivo_2, 'DD-MM-YYYY').format('YYYY-MM-DD') : ''}
                                            onChange={(e) => handleInputChange(index, 'periodo_aquisitivo_2', moment(e.target.value, 'YYYY-MM-DD').format('DD-MM-YYYY'))}
                                        /> </div> : ferias.periodo_aquisitivo}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <input
                                    className='rounded-md bg-white p-1'
                                    type="date"
                                    name=""
                                    value={ferias.limite ? moment(ferias.limite, 'DD-MM-YYYY').format('YYYY-MM-DD') : ''}
                                    onChange={(e) => handleInputChange(index, 'limite', moment(e.target.value, 'YYYY-MM-DD').format('DD-MM-YYYY'))}
                                /></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <input
                                    className='rounded-md bg-white p-1 w-10'
                                    type="number"
                                    name=""
                                    value={ferias.saldo ? ferias.saldo : ''}
                                    onChange={(e) => handleInputChange(index, 'saldo', e.target.value)}
                                /></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <input
                                    className='rounded-md bg-white p-1'
                                    type="date"
                                    name=""
                                    value={ferias.previsao ? moment(ferias.previsao, 'DD-MM-YYYY').format('YYYY-MM-DD') : ''}
                                    onChange={(e) => handleInputChange(index, 'previsao', moment(e.target.value, 'YYYY-MM-DD').format('DD-MM-YYYY'))}
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <select
                                    onChange={(e) => handleInputChange(index, 'pendente', e.target.value)}
                                    id="pendente"
                                    className='rounded'
                                    value={ferias.pendente == 'true' ? 'true' : 'false'}
                                >
                                    <option value="" disabled>Selecione</option>
                                    <option value={'true'}>Sim</option>
                                    <option value={'false'}>Não</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex p-5 justify-center gap-5'>
                <button onClick={adicionarPeriodoAquisitivo} class="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18Z" />
                    </svg>

                    <span class="mx-1">Adicionar Periodo aquisistivo</span>
                </button>
                <button onClick={enviarDados}
                    class="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    <svg class="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                    </svg>

                    <span class="mx-1">Atualizar usuario</span>
                </button>
            </div>
        </div>


    );
};

export default VerPendencias;
