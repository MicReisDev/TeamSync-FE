import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import userIMG from '../../../assets/user-icon.png';

const objEmpresas = [
    {
        empresa: 'Ferreira',
        value: 3
    },
    {
        empresa: 'BRASIL',
        value: 2
    },
    {
        empresa: 'FORCE COMMANDER',
        value: 4
    },
    {
        empresa: 'IMPACTO',
        value: 5
    },
    {
        empresa: 'MAODEOBRA',
        value: 8
    },
    {
        empresa: 'SEGURANCA',
        value: 6
    },
    {
        empresa: 'SUPPORT',
        value: 7
    },
    {
        empresa: 'BCI',
        value: 1
    }
]


const status = [
    'Contratado',
    'Demitido',
    'Ausente',
    'Ferias',
    'Licença',
    'Afastado'
]




const ColaboradorConfiguracoes = ({ usuario, setUpdate, update, openModal, setOpenModal }) => {
    const [usuarioEdit, setUsuarioEdit] = useState({})
    const [checkEpi, setCheckEpi] = useState()
    const [empresas, setEmpresas] = useState([])
    const [userLoading, setUserLoading] = useState(false);
    const inputFileRef = useRef(null);
    const ativarInputFile = () => {

        inputFileRef.current.click();
    };

    const handleImagemChange = (event) => {
        const imagemSelecionada = event.target.files[0];
        setUserLoading(true)
        enviarImagem(imagemSelecionada)
    };

    const enviarImagem = async (imagemSelecionada) => {
        const formData = new FormData();
        formData.append('arquivo', imagemSelecionada);
        formData.append('pasta', 'Colaboradores');

        try {
            const response = await fetch('http://localhost:33331/arquivo/uploadCloud', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const dados = await response.json();

                setUsuarioEdit({ ...usuarioEdit, foto: dados.url })
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('Erro ao enviar a imagem', error);
        }
        finally {
            setUserLoading(false)
        }
    };


    const getEmpresas = async () => {

        try {
            const response = await fetch('http://localhost:33331/colaborador-empresas', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + window.localStorage.getItem('$TOKEN'),
                },
            });

            if (response.ok) {
                const dados = await response.json();

                setEmpresas(dados)
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('Erro ao enviar a imagem', error);
        }

    };

    function handleChange(e) {

        setUsuarioEdit(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value,

        }))

    }

    const updateColaborador = async (e) => {
        e.preventDefault();
        let token = window.localStorage.getItem('$TOKEN');

        try {
            const response = await fetch(`http://localhost:33331/colaborador-ferias/${usuario.colaborador_ferias_id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                    nome: usuarioEdit.nome,
                    cargo: usuarioEdit.cargo,
                    departamento: usuarioEdit.departamento,
                    telefone: usuarioEdit.telefone,
                    centro_de_custo: usuarioEdit.centro_de_custo,
                    empresa_id: usuarioEdit.empresa_id,
                    status: usuarioEdit.status,
                    data_admissao: usuarioEdit.data_admissao,
                    codigo: usuarioEdit.codigo,
                    email: usuarioEdit.email,
                    epi: usuarioEdit.epi,
                    trabalhista: usuarioEdit.trabalhista,
                    foto: usuarioEdit.foto
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

    useEffect(() => { getEmpresas() }, [])

    useEffect(() => {

        setUsuarioEdit({ ...usuario, data_admissao: moment(usuario.data_admissao, 'DD-MM-YYYY').format('YYYY-MM-DD') })
        setCheckEpi(usuario.epi)
    }, [usuario])

    return (
        <>
            <div className='flex flex-col items-center'>
                <div className=' justify-center items-center p-5'>
                    {userLoading ? <div role="status">
                        <svg aria-hidden="true" class="w-20 h-20 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div> :

                        <img
                            class="object-cover w-[150px] h-[150px] border-2 border-azul rounded-full bg-azul"
                            src={usuarioEdit.foto ? usuarioEdit.foto : userIMG}
                            alt="Imagem de Perfil"
                            onClick={ativarInputFile}
                        />
                    }

                    <input
                        type="file"
                        id="imagem"
                        name="imagem"
                        accept="image/*"
                        onChange={handleImagemChange}
                        ref={inputFileRef}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>

            <form className='p-5' onSubmit={updateColaborador}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome Completo</label>
                        <input type="text" onChange={handleChange} value={usuarioEdit.nome} id="nome" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                    </div>
                    <div>
                        <label for="cargo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cargo</label>
                        <input type="text" onChange={handleChange} value={usuarioEdit.cargo} id="cargo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                    </div>
                    <div>
                        <label for="departamento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento</label>
                        <input type="text" onChange={handleChange} value={usuarioEdit.departamento} id="departamento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" />
                    </div>
                    <div>
                        <label for="telefone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone (Celular)</label>
                        <input type="tel" id="telefone" onChange={handleChange} value={usuarioEdit.telefone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="(DDD) 9 9999-9999" pattern="\([0-9]{2}\) [0-9] [0-9]{4}-[0-9]{4}" />
                    </div>

                    <div>
                        <label for="centro_de_custo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Centro de Custo</label>
                        <input type="text" value={usuarioEdit.centro_de_custo} onChange={handleChange} id="centro_de_custo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" />
                    </div>

                    <div>
                        <label htmlFor="empresa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresas</label>
                        <select
                            id="empresa_id"
                            value={usuarioEdit.empresa_id}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                            {empresas.length > 0 && empresas.map((empresa) => (
                                < option key={empresa.nome_empresarial} value={empresa.empresa_id} >
                                    {empresa.nome_empresarial}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <div>
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">status</label>
                        <select
                            id="status"
                            value={usuarioEdit.empresa}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                            {status.map((statu) => (
                                < option key={empresa} value={empresa} >
                                    {empresa}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    <div className="mb-6">
                        <label for="data_admissao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data da Contratação</label>
                        <input type="date" id="data_admissao" onChange={handleChange} value={moment(usuarioEdit.data_admissao, 'YYYY-MM-DD').format('YYYY-MM-DD')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className='flex w-full gap-1'>
                        <div className='w-full'>
                            <label for="codigo" className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white">RE</label>
                            <input type="number" onChange={handleChange} value={usuarioEdit.codigo} id="codigo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="RE" />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Atualmente</label>
                            <select
                                id="status"
                                value={usuarioEdit.status}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                {status.map((statu, index) => (
                                    <option key={index} value={statu}>
                                        {statu}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
                <div className="mb-6">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email@prodetechgroup.com.br" />
                </div>



                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="epi"
                            type="checkbox"
                            checked={usuarioEdit.epi == 'false' ? false : true}
                            onChange={handleChange}
                            value={usuarioEdit.epi == 'false' ? true : false}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                    </div>
                    <label for="epi" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recebeu EPI?<a href="#" className="text-blue-600 hover:underline dark:text-blue-500"> Só marcar para usuario que necessitam de EPI´s</a>.</label>
                </div>

                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="trabalhista"
                            type="checkbox"
                            checked={usuarioEdit.trabalhista == 'false' ? false : true}
                            onChange={handleChange}
                            value={usuarioEdit.trabalhista == 'false' ? true : false}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                    </div>
                    <label for="trabalhista" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Entrou com processo trabalhista?<a href="#" className="text-blue-600 hover:underline dark:text-blue-500"></a></label>
                </div>


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
            </form >

        </>
    )
};

export default ColaboradorConfiguracoes;
