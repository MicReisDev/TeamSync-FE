import React, { useEffect, useState } from 'react';
import moment from 'moment'

const ColaboradorAtestados = ({ usuario, setUpdate, update, openModal, setOpenModal }) => {

    const [arquivos, setArquivos] = useState(null)
    const [tarefaLoading, setTarefaLoading] = useState(false);
    const [newArquivo, setNewArquivo] = useState({
        colaborador_ferias_id: "",
        url: "",
        arquivo: "",
        tamanho: "",
        tipo: ""
    })

    const handleImagemChange = (event) => {
        const imagemSelecionada = event.target.files[0];

        enviarImagem(imagemSelecionada)
    };


    const enviarImagem = async (imagemSelecionada) => {
        const formData = new FormData();
        formData.append('arquivo', imagemSelecionada);
        formData.append('pasta', 'Colaboradores');
        setTarefaLoading(true)

        try {
            console.log('aqui')
            const response = await fetch('http://localhost:33331/arquivo/uploadCloud', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();


                if (data) await insertArquivos({ ...newArquivo, colaborador_ferias_id: usuario.colaborador_ferias_id, url: data.url, arquivo: data.originalname, tamanho: data.size, tipo: data.mimetype })
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('Erro ao enviar a imagem', error);
        }
    };

    async function insertArquivos(obj) {

        let token = window.localStorage.getItem('$TOKEN');

        try {
            const response = await fetch(`http://localhost:33331/colaborador-atestados`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify(obj),
            });

            const data = await response.json();
            if (data.error) {
                console.log('Erro ao enviar dados:', data.error);
            } else {
                setTarefaLoading(false)
                setNewArquivo({
                    colaborador_ferias_id: "",
                    url: "",
                    arquivo: "",
                    tamanho: "",
                    tipo: ""
                })
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        } finally {
            getArquivos()
        }

    }


    async function getArquivos() {

        let token = window.localStorage.getItem('$TOKEN');

        try {
            const response = await fetch(`http://localhost:33331/colaborador-atestados/${usuario.colaborador_ferias_id}`, {
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
                console.log(data)
                setArquivos(data)
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        }

    }

    useEffect(() => {
        setArquivos(usuario.atestados)
        // getArquivos()
    }, [usuario])
    return <>



        <div className="scroll overflow-scroll  p-1 border border-gray-200 bg-gray-50 h-full">
            <div className="flex flex-col justify-between items-center w-full">
                <button
                    class="self-end flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    onClick={() => document.getElementById('atestado').click()}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.17157 13H6C4.34315 13 3 11.6569 3 10C3 8.34315 4.34315 7 6 7C6.27954 7 6.41931 7 6.51699 6.98034C6.81502 6.92036 6.95652 6.82876 7.13328 6.58143C7.19121 6.50036 7.27282 6.31851 7.43606 5.95481C8.21776 4.21307 9.96722 3 12 3C14.0328 3 15.7822 4.21307 16.5639 5.95481C16.7272 6.31851 16.8088 6.50036 16.8667 6.58143C17.0435 6.82876 17.185 6.92036 17.483 6.98034C17.5807 7 17.7205 7 18 7C19.6569 7 21 8.34315 21 10C21 11.6569 19.6569 13 18 13H16.8284L13.4142 9.58579L12 8.17157L10.5858 9.58579L7.17157 13Z" fill="currentColor" />
                        <path d="M12 12L11.2929 11.2929L12 10.5858L12.7071 11.2929L12 12ZM13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21L13 21ZM7.29289 15.2929L11.2929 11.2929L12.7071 12.7071L8.70711 16.7071L7.29289 15.2929ZM12.7071 11.2929L16.7071 15.2929L15.2929 16.7071L11.2929 12.7071L12.7071 11.2929ZM13 12L13 21L11 21L11 12L13 12Z" fill="currentColor" />
                    </svg>
                    <span class="mx-1">Novo Atestado</span>
                </button>
                <div className='invisible'>
                    <label htmlFor="atestado" className=''></label>
                    <input
                        type="file"
                        id="atestado"
                        name="atestado"
                        accept="*"
                        placeholder='Upar arquivo'
                        onChange={handleImagemChange}
                    />
                </div>
                {
                    tarefaLoading ?
                        <div role="status">
                            <svg aria-hidden="true" class="w-20 h-20 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div> :
                        <div className="flex flex-col w-full">
                            <div className=" overflow-x-auto">
                                <div className="= w-full py-2 align-middle ">
                                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center gap-x-3">
                                                            {/* <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}
                                                            <span>Nome do arquivo</span>
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Tamanho
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Upado em
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Upado por
                                                    </th>

                                                    <th scope="col" className="relative py-3.5 px-4">
                                                        <span className="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                                {arquivos && arquivos.map((arquivo) => (
                                                    <tr>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <div className="inline-flex items-center gap-x-3">
                                                                {/* <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}

                                                                <div className="flex items-center gap-x-2">
                                                                    <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                                        </svg>
                                                                    </div>

                                                                    <div>
                                                                        <h2 className="font-normal text-gray-800 dark:text-white overflow-hidden ... text-ellipsis truncate max-w-[300px]">{arquivo.arquivo}</h2>
                                                                        {/* <p className="text-xs font-normal text-gray-500 dark:text-gray-400">200 KB</p> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                                            {arquivo.tamanho}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{(moment(arquivo.criado).format('YYYY-MM-DD').replace(/-/g, '/'))}</td>
                                                        <td className="px-4  py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                            <div className='flex  flex-col'>
                                                                <div>{arquivo.nome}</div>
                                                                <div className='text-xs'>ID: #{arquivo.id_usuario}</div>


                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm flex items-center justify-center gap-1">


                                                            <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100" onClick={() => { window.open(arquivo.url, '_blank') }}>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="12" cy="12" r="4" fill="#33363F" />
                                                                    <path d="M21 12C21 12 20 4 12 4C4 4 3 12 3 12" stroke="#33363F" stroke-width="2" />
                                                                </svg>

                                                            </button>
                                                            {/* <a href={arquivo.url} download={arquivo.url} className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100" >
                                                             <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M12 14L11.2929 14.7071L12 15.4142L12.7071 14.7071L12 14ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44771 11 5L13 5ZM6.29289 9.70711L11.2929 14.7071L12.7071 13.2929L7.70711 8.29289L6.29289 9.70711ZM12.7071 14.7071L17.7071 9.70711L16.2929 8.29289L11.2929 13.2929L12.7071 14.7071ZM13 14L13 5L11 5L11 14L13 14Z" fill="#4a4a4a" />
                                                                 <path d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16" stroke="#4a4a4a" stroke-width="2" />
                                                             </svg>
         
                                                         </a> */}



                                                        </td>
                                                    </tr>
                                                ))}






                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                }





            </div>


        </div>





    </>
};

export default ColaboradorAtestados;