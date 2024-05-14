import React, { useState, useEffect, Ref } from 'react';
import moment from 'moment';

const LinksTarefa = ({ tarefa, forceUpdate, setForceUpdate, edit, setOpenVisualizar, openVisualizar }) => {
    tarefa = tarefa[0]

    let token = window.localStorage.getItem('$TOKEN');
    const [links, setLinks] = useState([]);
    const [copied, setCopied] = useState(false);
    const [tarefaLoading, setTarefaLoading] = useState(false);
    const [newLink, setNewLink] = useState({
        id_tarefa: "",
        url: "",
        titulo: "",
    })


    async function inserLink() {
        setTarefaLoading(true)


        try {
            const response = await fetch(`http://localhost:33331/tarefa/link`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({ ...newLink, id_tarefa: tarefa.id_tarefa }),
            });

            const data = await response.json();
            if (data.error) {
                console.log('Erro ao enviar dados:', data.error);
            } else {

                setNewLink({
                    id_tarefa: "",
                    url: "",
                    titulo: "",
                })
                getLinks()
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        } finally {
            getLinks()
        }

    }



    async function getLinks() {


        try {
            const response = await fetch(`http://localhost:33331/tarefa/link/${tarefa.id_tarefa}`, {
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

                setLinks(data)
                setTarefaLoading(false)
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        }

    }

    useEffect(() => {
        getLinks()
    }, [tarefa]);

    return <>

        <div class="w-full h-full  shadow-md sm:rounded-lg">
            <form onSubmit={inserLink} class="flex gap-1 flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row w-full">
                <div className='flex w-full gap-1'>
                    <input required value={newLink.titulo} onChange={(e) => setNewLink({ ...newLink, titulo: e.target.value })} class="rounded-lg w-[30%] px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent " type="text" name="link" placeholder="Titulo do link" aria-label="Titulo" />
                    <input required value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} class="rounded-lg w-[70%] px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent " type="text" name="link" placeholder="URL" aria-label="Seu link" />
                </div>
                <div className='flex items-center gap-1  px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-azul rounded-md hover:bg-blue-800 cursor-pointer focus:bg-azul focus:outline-none'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="1.5" />
                        <path d="M12 5V11" stroke="currentColor" stroke-width="1.5" />
                        <path d="M15 8H9" stroke="currentColor" stroke-width="1.5" />
                        <path d="M21 14H18.0704C17.5464 14 17.2844 14 17.0633 14.1183C16.8422 14.2367 16.6969 14.4546 16.4063 14.8906L15.5937 16.1094C15.3031 16.5454 15.1578 16.7633 14.9367 16.8817C14.7156 17 14.4536 17 13.9296 17H10.0704C9.5464 17 9.28442 17 9.06333 16.8817C8.84223 16.7633 8.69691 16.5454 8.40627 16.1094L7.59373 14.8906C7.30309 14.4546 7.15777 14.2367 6.93667 14.1183C6.71558 14 6.4536 14 5.92963 14H3" stroke="currentColor" stroke-width="1.5" />
                        <path d="M7 10H6.41421C6.149 10 5.89464 10.1054 5.70711 10.2929L3.29289 12.7071C3.10536 12.8946 3 13.149 3 13.4142V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13.4142C21 13.149 20.8946 12.8946 20.7071 12.7071L18.2929 10.2929C18.1054 10.1054 17.851 10 17.5858 10H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                    <button class="" >Anexar</button>

                </div>

            </form>
            <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        <th scope="col" class="px-6 py-3">
                            Titulo
                        </th>
                        <th scope="col" class="px-6 py-3">
                            URL
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Criado em
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Criado por
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Copiar ou ir
                        </th>

                    </tr>
                </thead>
                <tbody>

                    {
                        tarefaLoading ?
                            <div role="status">
                                <svg aria-hidden="true" class="w-20 h-20 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div> :
                            links && links.length > 0 && links.map((link) => (
                                <tr key={link.id_tarefa_link} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">

                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                        {link.titulo}
                                    </td>
                                    <td class="px-6 py-4 text-xs max-w-[100px] overflow-ellipsis overflow-hidden  whitespace-nowrap ">
                                        {link.url}
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        {moment(link.criado, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <div className='flex flex-col gap-1'>
                                            <div>
                                                {link.nome}
                                            </div>
                                            <div>
                                                ID:  #{link.id_usuario}
                                            </div>
                                        </div>

                                    </td>

                                    <td class="px-6 py-4 text-center ">
                                        <div className='flex gap-1 items-center justify-center'>
                                            <a
                                                href={link.url}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    navigator.clipboard.writeText(link.url);
                                                    setCopied(true);
                                                    setTimeout(() => setCopied(false), 2000); // Hide tooltip after 2 seconds
                                                }}
                                                className='text-center'
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 10L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M16 13L18 11C19.3807 9.61929 19.3807 7.38071 18 6V6C16.6193 4.61929 14.3807 4.61929 13 6L11 8M8 11L6 13C4.61929 14.3807 4.61929 16.6193 6 18V18C7.38071 19.3807 9.61929 19.3807 11 18L13 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                </svg>
                                                {copied && <span className='absolute'>Copiado!</span>}
                                            </a>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className='text-center'>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.5 6L18.0333 7.1C17.6871 7.35964 17.2661 7.5 16.8333 7.5H13.475C12.8775 7.5 12.3312 7.83761 12.064 8.37206V8.37206C11.7342 9.03161 11.9053 9.83161 12.476 10.2986L14.476 11.9349C16.0499 13.2227 16.8644 15.22 16.6399 17.2412L16.6199 17.4206C16.5403 18.1369 16.3643 18.8392 16.0967 19.5083L15.5 21" stroke="currentColor" />
                                                    <path d="M2.5 10.5L5.7381 9.96032C7.09174 9.73471 8.26529 10.9083 8.03968 12.2619L7.90517 13.069C7.66434 14.514 8.3941 15.9471 9.70437 16.6022V16.6022C10.7535 17.1268 11.2976 18.3097 11.0131 19.4476L10.5 21.5" stroke="currentColor" />
                                                    <circle cx="12" cy="12" r="9.5" stroke="currentColor" />
                                                </svg>
                                            </a>
                                        </div>

                                    </td>

                                </tr>
                            ))}
                </tbody>
            </table>
        </div>
    </>
};

export default LinksTarefa;
