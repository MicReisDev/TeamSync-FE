import React, { useState, useRef } from 'react';
import userIMG from '../../../assets/user-icon.png';
import moment from 'moment';
import DarFerias from './DarFerias';
const Perfil = ({ usuario, setUpdate, update, openModal, setOpenModal }) => {
    usuario = { ...usuario };
    const [feriasModal, setFeriasModal] = useState(false);

    const updateColaborador = async (e) => {
        e.preventDefault();
        let token = window.localStorage.getItem('$TOKEN');
        console.log(e.currentTarget.value)
        try {
            const response = await fetch(`http://localhost:33331/colaborador-ferias/${usuario.colaborador_ferias_id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                    status: e.currentTarget.value
                })
            });

            const data = await response.json();

            if (data.error) {
                console.log('Erro ao enviar dados:', data.error);
            } else {
                setOpenModal(!openModal)
                setUpdate(!update)
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        }


    };

    return (

        usuario && (

            <div className='w-full h-full flex flex-col overflow-y-auto  scroll  text-gray-700'>
                {feriasModal ? <DarFerias ferias={usuario.ferias} usuario={usuario} setOpenModal={setOpenModal} setUpdate={setUpdate} /> :
                    <div className='p-4 bg-gray-100 w-full h-full rounded-2xl flex flex-col gap-4 dark:bg-black'>
                        <div className='flex items-start justify-between bg-white rounded-md p-2 dark:bg-gray-800'>
                            <div className='flex justify-self-start'>
                                <div className='p-5'>
                                    <img
                                        class="object-cover w-[150px] h-[150px] border-2 border-azul rounded-full bg-azul"
                                        src={usuario.foto ? usuario.foto : userIMG}
                                        alt="Imagem de Perfil"
                                    />
                                </div>
                                <div className='p-5'>
                                    <div className='py-2'>
                                        <div className='text-3xl font-extrabold dark:text-white'>
                                            {usuario.nome && usuario.nome.split(' ')
                                                .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
                                                .join(' ')}
                                        </div>
                                        <div className='text-sm font-medium rounded-md  text-white bg-gray-600 px-2 py-1 dark:bg-gray-100 dark:text-gray-900'>{usuario.cargo && usuario.cargo.split(' ')
                                            .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
                                            .join(' ')}
                                        </div>
                                    </div>
                                    <div class="text-xl text-gray-500 rounded-xl dark:text-gray-300 w-full font-bold">Status: <span class="font-normal">{usuario.status}</span></div>

                                    <div className='text-xl text-gray-500 rounded-xl dark:text-gray-300 w-full font-bold'>

                                        Admissão: <span class="font-normal">{usuario.data_admissao && moment(usuario.data_admissao, 'DD-MM-YYYY').format('DD-MM-YYYY').replace(/-/g, '/')}</span>
                                    </div>

                                    {usuario.data_admissao && <div className='text-xl text-gray-500 rounded-xl dark:text-gray-300'>
                                        <span class="font-bold">Tempo de empresa: </span>
                                        <span class="font-normal">
                                            {
                                                (() => {
                                                    const now = moment();
                                                    const admissionDate = moment(moment(usuario.data_admissao, 'DD-MM-YYYY').format('YYYY-MM-DD'))
                                                    const diffDays = now.diff(admissionDate, 'days');
                                                    if (diffDays < 30) {
                                                        return `${diffDays} dias`;
                                                    } else if (diffDays < 365) {
                                                        const diffMonths = now.diff(admissionDate, 'months');
                                                        const remainingDays = now.diff(admissionDate.add(diffMonths, 'months'), 'days');
                                                        return `${diffMonths} meses e ${remainingDays} dias`;
                                                    } else {
                                                        const diffYears = now.diff(admissionDate, 'years');
                                                        const remainingMonths = now.diff(admissionDate.add(diffYears, 'years'), 'months');
                                                        return `${diffYears} anos e ${remainingMonths} meses`;
                                                    }
                                                })()

                                            }
                                        </span>
                                    </div>}
                                    <div className='text-xl text-gray-500 rounded-xl dark:text-gray-300 w-full font-bold'>

                                        Recebeu EPI? <span class="font-normal">{usuario.epi == 'true' ? 'Sim' : 'Não'}</span>
                                    </div>


                                </div>
                            </div>
                            <div className='p-1 h-full'>
                                <div class="flex flex-col justify-around h-full w-full max-w-xs gap-1 ">
                                    <button onClick={() => setFeriasModal(true)} value='Ferias' class="bg-orange-500 text-white flex items-center  dark:text-gray-300 justify-center gap-x-3 text-sm sm:text-base  dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-orange-500/80 duration-300 transition-colors border px-8 py-2.5">
                                        <span>Dar Férias</span>
                                    </button>

                                    <button onClick={updateColaborador} value='Demitido' class="bg-red-700 flex gap-x-3 text-sm sm:text-base items-center justify-center text-white rounded-lg hover:bg-red-700/80 duration-300 transition-colors border border-transparent px-8 py-2.5">


                                        <span>Demitir</span>
                                    </button>

                                    <button onClick={updateColaborador} value='Afastado' class="bg-black rounded-lg text-sm sm:text-base flex items-center gap-x-3 justify-center text-white hover:bg-black/80 duration-300 transition-colors border border-transparent px-8 py-2.5">


                                        <span>Solicitar Afastamento</span>
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className='rounded-md h-full overflow-auto scroll dark:bg-black'>

                            <div class="grid grid-cols-1 gap-8 xl:gap-4 md:grid-cols-2 xl:grid-cols-3 h-full dark:bg-black">
                                <div class="flex flex-col items-center p-6  text-center justify-center bg-white rounded-xl dark:bg-gray-800">
                                    <span class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                    </span>

                                    <h1 class="text-xl font-semibold text-gray-700 capitalize dark:text-white">Perfil do Funcionário:</h1>

                                    <p class="text-gray-500 dark:text-gray-300">
                                        <b className='text-azul'>{usuario.nome}</b> é um membro dedicado da nossa equipe com mais de 5 anos de experiência na indústria. Com habilidades excepcionais em comunicação e resolução de problemas, João tem contribuído significativamente para diversos projetos, promovendo inovações e eficiência.
                                    </p>

                                    <a href="#" class="flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                        <span class="mx-1">Ler Mais</span>
                                        <svg class="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </div>

                                <div class="flex flex-col items-center p-6  text-center justify-center bg-white rounded-xl dark:bg-gray-800">
                                    <span class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </span>

                                    <h1 class="text-xl font-semibold text-gray-700 capitalize dark:text-white">Reconhecimento e Contribuições </h1>

                                    <p class="text-gray-500 dark:text-gray-300">
                                        Ao longo de sua jornada conosco, <b className='text-azul'>{usuario.nome}</b> desempenhou um papel crucial no desenvolvimento e implementação de estratégias que resultaram em um aumento de 20% na produtividade do departamento. Sua capacidade de trabalhar em equipe e liderar projetos tem sido inestimável.
                                    </p>

                                    <a href="#" class="flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                        <span class="mx-1">Ler Mais</span>
                                        <svg class="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </div>

                                <div class="flex flex-col items-center p-6  text-center justify-center bg-white rounded-xl dark:bg-gray-800">
                                    <span class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </span>

                                    <h1 class="text-xl font-semibold text-gray-700 capitalize dark:text-white">Feedback dos Colegas:</h1>

                                    <p class="text-gray-500 dark:text-gray-300">
                                        Colegas de <b className='text-azul'>{usuario.nome}</b> frequentemente o descrevem como inovador, confiável e um excelente mentor. Sua disposição para ajudar e guiar novos membros da equipe é notável e contribui para um ambiente de trabalho positivo e produtivo.


                                    </p>

                                    <a href="#" class="flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                        <span class="mx-1">Ler Mais</span>
                                        <svg class="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </div>
                            </div>


                        </div>

                    </div>
                }
            </div >)

    )
}




export default Perfil;
