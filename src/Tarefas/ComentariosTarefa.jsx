import React, { useDebugValue, useState, useEffect } from 'react';
import creativeIMG from '../../assets/creative-circle-dot.svg';
import moment from 'moment/moment';
import { useFetcher, useNavigate } from 'react-router-dom';
import Loading from '../Helpers/Loading';



const ComentariosTarefa = ({ tarefa, forceUpdate, setForceUpdate }) => {
    const navigate = useNavigate()
    const [mensagem, setMensagem] = useState({ id_tarefa: tarefa[0].id_tarefa, mensagem: '' })
    const [comentarios, setComentarios] = useState(null)

    async function criarComentarios(e) {

        e.preventDefault();
        let token = window.localStorage.getItem('$TOKEN');

        try {
            const response = await fetch('http://localhost:33331/tarefa/comentario', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify(mensagem),
            });

            const data = await response.json();
            console.log(data)
            if (data.error) {
                console.log('Erro ao enviar dados:', data.error);
            } else {
                setForceUpdate(forceUpdate + 1)
                navigate('/tarefas')
                setMensagem({ ...mensagem, mensagem: "" })
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        }

    }

    async function pegarComentario() {


        let token = window.localStorage.getItem('$TOKEN');

        try {
            const response = await fetch(`http://localhost:33331/tarefa/comentario/${tarefa[0].id_tarefa}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });

            const data = await response.json();
            console.log(data)
            if (data.error) {
                console.log('Erro ao enviar dados:', data.error);
            } else {
                setComentarios(data)
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        }

    }
    useEffect(() => {
        pegarComentario()
    }, [
        forceUpdate
    ])




    return (
        <>
            {comentarios == null ? < Loading /> : ""}
            < div className='w-full p-5 h-full bg-gray-50 rounded-xl overflow-x-auto scroll flex justify-between flex-col gap-2'>
                <section className="flex flex-col gap-2 overflow-x-auto scroll">
                    {comentarios && comentarios.map((comentario) => (
                        <article key={comentario.id} className="p-5 border-gray-200 border text-base bg-white rounded-xl dark:bg-gray-900 ">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                        <img
                                            className="mr-2 w-6 h-6 rounded-full"
                                            src={comentario.avatar}
                                            alt={comentario.nome}
                                        />
                                        {comentario.nome}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400">{comentario.mensagem}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-200 font-medium mt-4">
                                <time pubdate datetime={comentario.criado} title="">{moment(comentario.criado).format('DD-MM-YYYY HH:mm:ss').replace(/-/g, '/')}</time>
                            </p>
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

                <div className='p-1 rounded' >
                    <div className="flex items-center gap-2 w-full rounded">
                        <textarea
                            id="chat"
                            rows="1"
                            className="text-base resize-none w-screen scroll  p-3 text-gray-900 bg-white rounded-xl border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Escreva um texto"
                            value={mensagem.mensagem}
                            onChange={(e) => { setMensagem({ ...mensagem, mensagem: e.target.value }); }}
                        ></textarea >
                        <button onClick={criarComentarios} type="submit" className="transition-all font-bold inline-flex justify-center px-5 py-3 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-500 transform hover:translate-y-[-4px]">
                            {/*<img src={creativeIMG} className='h-10 w-10' alt="" />*/}Enviar
                        </button >
                    </div>
                </div>

            </div >
        </>
    );
};

export default ComentariosTarefa;

