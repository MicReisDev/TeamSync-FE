import React, { useDebugValue, useState, useEffect } from 'react';
import creativeIMG from '../../../assets/creative-circle-dot.svg';
import moment from 'moment/moment';
import { useFetcher, useNavigate } from 'react-router-dom';
import Loading from '../../Helpers/Loading';
import { UserContext } from '../../UserContext';
import ConfirmarDeleteObs from './ConfirmarDeleteObs';


const Observacao = ({ usuario }) => {
    const { data } = React.useContext(UserContext);

    const navigate = useNavigate()
    const [novaObservacao, setNovaObservacao] = useState({ colaborador_ferias_id: usuario.colaborador_ferias_id, observacao: '' })
    const [loading, setLoading] = useState(true)
    const [observacoes, setObservacoes] = useState([])
    const [obs, setObs] = useState(null)
    const [forceUpdate, setForceUpdate] = useState(0)
    const [excluirObs, setExcluirObs] = useState(false)
    let token = window.localStorage.getItem('$TOKEN');

    async function criarComentarios(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:33331/colaborador-observacoes', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify(novaObservacao),
            });

            const data = await response.json();
            if (data.error) {
                console.log('Erro ao enviar dados:', data.error);
            } else {
                pegarComentario()
                setNovaObservacao({ ...novaObservacao, observacao: "" })
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        }

    }
    async function pegarComentario() {
        try {
            const response = await fetch(`http://localhost:33331/colaborador-observacoes/${usuario.colaborador_ferias_id}`, {
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
                setObservacoes(data)
                setLoading(false)
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        }

    }
    async function confirmeExcluir(obsservacao) {
        setExcluirObs(true)
        setObs(obsservacao)
    }
    useEffect(() => {
        pegarComentario()
    }, [
        forceUpdate
    ])




    return (
        <>



            < div className='w-full h-full p-1  bg-gray-200 rounded overflow-x-auto scroll flex justify-between flex-col gap-2 border-gray-200 border'>
                {loading ?
                    <div className="flex justify-center items-center h-full">
                        <svg aria-hidden="true" class="w-20 h-20 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg> </div> : null}
                <section className="flex flex-col gap-2 dark:bg-gray-900 overflow-x-auto scroll rounded">
                    {observacoes && observacoes.map((observacao) => (
                        <article key={observacao.id} className="p-5 border-gray-200 border text-base bg-white rounded dark:bg-gray-900">

                            <div className={data.id_usuario == observacao.id_usuario ? 'flex justify-end items-center mb-2' : 'flex justify-between items-center mb-2'}>
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">

                                        {data.id_usuario == observacao.id_usuario ? null : <img
                                            className="mr-2 w-6 h-6 rounded-full"
                                            src={observacao.avatar}
                                            alt={observacao.nome}
                                        />}
                                        {data.id_usuario == observacao.id_usuario ? "Você" : observacao.nome}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">
                                        <time pubdate datetime={observacao.criado} title="">{moment(observacao.criado).format('DD-MM-YYYY HH:mm:ss').replace(/-/g, '/')}</time>
                                        <button onClick={() => { confirmeExcluir(observacao) }} class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <p className={data.id_usuario == observacao.id_usuario ? 'flex justify-end items-center mb-2' : 'text-gray-500 dark:text-gray-400'}>{observacao.observacao}</p>
                            <div className="flex items-center mt-4 space-x-4">
                                {/* <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                    <svg className="mr-1.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                    </svg>
                                    Reply
                                </button> */}
                            </div>
                        </article>
                    ))}
                </section>
                {excluirObs ?
                    <ConfirmarDeleteObs obs={obs} setForceUpdate={setForceUpdate} forceUpdate={forceUpdate} excluirObs={excluirObs} setExcluirObs={setExcluirObs} /> : null}

                <div className='p-1 rounded bg-white' >
                    <div className="flex items-center  gap-5 w-full rounded dark:bg-gray-700">
                        <textarea
                            id="chat"
                            rows="1"
                            className="w-screen escroll p-3 border-gray-400  text-gray-900 bg-white rounded border  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Escreva um texto"
                            value={novaObservacao.observacao}
                            onChange={(e) => { setNovaObservacao({ ...novaObservacao, observacao: e.target.value }); }}
                        ></textarea >
                        <button onClick={criarComentarios} type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                            <img src={creativeIMG} className='h-10 w-10' alt="" />
                        </button >
                    </div>
                </div>

            </div>

        </>
    );
};

export default Observacao;

