import React, { useState, useRef, useEffect } from 'react';
import Loading from '../../Helpers/Loading';
import ButtonDefault from '../../Components/ButtonDefault'

const PermissaoEspecifica = ({ setComponente, permissaoEscolhida, setOpenModal }) => {
    const [arrpermissao, setArrpermissao] = useState([])
    const [checkpermission, setCheckpermission] = useState(permissaoEscolhida)
    const arrayPermissao = async () => {

        let token = window.localStorage.getItem('$TOKEN');

        try {
            const response = await fetch('http://localhost:33331/permissao', {
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
                setArrpermissao(data)
            }
        } catch (error) {
            console.error(error);
            console.log('Erro ao pegar permissões.');
        }
    };

    const togglePermission = (permId) => {
        const isPresent = checkpermission.permissoes.some(perm => perm.id_permissao === permId);
        if (isPresent) {
            setCheckpermission(prevState => ({
                ...prevState,
                permissoes: prevState.permissoes.filter(perm => perm.id_permissao !== permId)
            }));
        } else {
            setCheckpermission(prevState => ({
                ...prevState,
                permissoes: [...prevState.permissoes, { id_permissao: permId }]
            }));
        }
    };


    useEffect(() => {
        arrayPermissao()
    }, [])

    return (<>
        <div className='bg-white p-5 rounded-lg'>
            <div className='flex ' onClick={() => { setComponente('Permissao') }}>
                <div className='flex gap-2 hover:text-white hover:bg-azul hover:border-azul text-gray-500  transition-all font-bold justify-center items-center cursor-pointer border border-gray-300 px-3 py-1 rounded-lg' >
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.292583 6.79519L8.74123 0.881139C9.27145 0.509984 10 0.889306 10 1.53652V12.4635C10 13.1107 9.27145 13.49 8.74123 13.1189L0.292583 7.20481C0.150404 7.10528 0.150403 6.89472 0.292583 6.79519Z" fill="currentColor" />
                    </svg>
                    <p className=''>Voltar</p>
                </div>
            </div>

            <h3 className="p-5 font-semibold text-center text-gray-900 dark:text-white uppercase">{permissaoEscolhida.role}</h3>

            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {arrpermissao && arrpermissao.map((i) => (
                    <li key={i.id_permissao} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                onClick={() => togglePermission(i.id_permissao)}
                                id={`checkbox-${i.id_permissao}`}
                                type="checkbox"
                                checked={checkpermission.permissoes.some(e => e.id_permissao === i.id_permissao)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor={`checkbox-${i.id_permissao}`}
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {i.permissao}
                            </label>

                        </div>
                    </li>
                ))}

            </ul>
            <div className='py-3 flex items-center justify-center'>
                <ButtonDefault nome={'Salvar'}></ButtonDefault>
            </div>
        </div>
    </>)
}

export default PermissaoEspecifica