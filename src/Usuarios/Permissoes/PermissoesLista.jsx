import React, { useState, useRef, useEffect } from 'react';
import Loading from '../../Helpers/Loading';


const PermissoesLista = ({ Componente, setComponente, permissaoEscolhida, setPermissaoEscolhida, setOpenModal }) => {
    const [permissoes, setPermissoes] = useState([])
    const fetchPermissoes = async () => {

        let token = window.localStorage.getItem('$TOKEN');

        try {
            const response = await fetch('http://localhost:33331/roles_permissao', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                }
            });

            const data = await response.json();

            if (data.error) {
                console.log('Erro ao pegar permissões.', data.error);
            } else {
                setPermissoes(data)
            }
        } catch (error) {
            console.error(error);
            console.log('Erro ao pegar permissões.');
        }
    };

    useEffect(() => {
        fetchPermissoes()
    }, [])

    return (<>
        <div className='bg-white flex flex-col shadow-md rounded-xl text-gray-500'>
            <div className='flex p-5' onClick={() => { setOpenModal(false) }}>
                <div className='flex gap-2 hover:text-white hover:bg-azul hover:border-azul text-gray-500  transition-all font-bold justify-center items-center cursor-pointer border border-gray-300 px-3 py-1 rounded-lg' >
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.292583 6.79519L8.74123 0.881139C9.27145 0.509984 10 0.889306 10 1.53652V12.4635C10 13.1107 9.27145 13.49 8.74123 13.1189L0.292583 7.20481C0.150404 7.10528 0.150403 6.89472 0.292583 6.79519Z" fill="currentColor" />
                    </svg>
                    <p className=''>Voltar</p>
                </div>
            </div>
            <div className='p-5'>
                <div className="flex justify-center items-center gap-5">
                    <input type="text" placeholder="Pesquisar Cargo" class="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="7" stroke="#33363F" stroke-width="2" />
                        <path d="M20 20L17 17" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white ">
                        <thead>
                            <tr className="bg-blue-gray-100 text-gray-700 text-center">
                                <th className="py-3 px-4 text-left">Nome do Cargo</th>
                                <th className="py-3 px-4 text-left">QTD de permissões</th>
                                <th className="py-3 px-4 text-left">Opções</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-500">
                            {permissoes.length > 0 && permissoes.map((i) => (
                                <tr key={i.id_role} className="border-b border-blue-gray-200 text-center">
                                    <td className="py-3 px-4">{i.role}</td>
                                    <td className="py-3 px-4">{i.permissoes.length} </td>
                                    <td className="py-3 px-4 flex gap-2 items-center justify-center">

                                        <a href="" onClick={(e) => {
                                            e.preventDefault()
                                            setComponente('PermissaoE')
                                            setPermissaoEscolhida(i)
                                        }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 13.0002C4 11.1146 4 10.1718 4.58579 9.58603C5.17157 9.00024 6.11438 9.00024 8 9.00024H16C17.8856 9.00024 18.8284 9.00024 19.4142 9.58603C20 10.1718 20 11.1146 20 13.0002V15.0002C20 17.8287 20 19.2429 19.1213 20.1216C18.2426 21.0002 16.8284 21.0002 14 21.0002H10C7.17157 21.0002 5.75736 21.0002 4.87868 20.1216C4 19.2429 4 17.8287 4 15.0002V13.0002Z" stroke="currentColor" stroke-width="2" />
                                                <path d="M16.4999 9.00006L16.5775 8.37947C16.8364 6.30788 15.9043 4.2675 14.1688 3.10709V3.10709C12.1023 1.72543 9.36726 1.89573 7.48819 3.52305L6.66986 4.23174" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                <circle cx="12" cy="15" r="2" fill="currentColor" />
                                            </svg>
                                        </a>
                                        <a href="">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 15L10 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                <path d="M14 15L14 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                <path d="M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                <path d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-full pt-5 px-4 mb-8 mx-auto ">
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default PermissoesLista