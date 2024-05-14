
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import userIMG from '../../../assets/user-icon.png';

const VisualizarUsuario = ({ usuario, openModalVisualizar, setOpenModalVisualizar }) => {


    return (
        <>

            <div className='bg-white rounded-lg w-auto'>
                <div className='flex p-5 ' onClick={() => { setOpenModalVisualizar(false) }}>
                    <div className='flex gap-2 hover:text-white hover:bg-azul hover:border-azul text-gray-500  transition-all font-bold justify-center items-center cursor-pointer border border-gray-300 px-3 py-1 rounded-lg' >
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.292583 6.79519L8.74123 0.881139C9.27145 0.509984 10 0.889306 10 1.53652V12.4635C10 13.1107 9.27145 13.49 8.74123 13.1189L0.292583 7.20481C0.150404 7.10528 0.150403 6.89472 0.292583 6.79519Z" fill="currentColor" />
                        </svg>
                        <p className=''>Voltar</p>
                    </div>
                </div>
                <div className="min-w-80 overflow-hidden  shadow-lg dark:bg-gray-800  flex flex-col items-center ">
                    <img className="object-cover object-center w-60 h-60 rounded-full border-4 p-1 border-azul mb-5 bg-azul" src={usuario.avatar ? usuario.avatar : userIMG} alt="avatar" />

                    <div className="flex items-center justify-center px-6 py-3 bg-azul  w-full">

                        <h1 className="mx-3 text-lg font-semibold text-white text-center">#{usuario.id_usuario} - {usuario.nome}</h1>
                    </div>
                    <div className='p-2 text-center'>
                        <div>Pastas</div>
                        <div className="flex items-center gap-x-2">
                            {usuario && usuario.pastas.map((pasta) => (
                                <p key={pasta.id_pasta} className="px-3 py-1 text-xs text-gray-700 rounded-full dark:bg-gray-800 bg-gray-200 text-ellipsis max-w-md">
                                    {pasta.pasta}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="px-6 py-4 w-full flex flex-col items-center">

                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7071 11.7071L17.3552 14.3552C17.7113 14.7113 17.7113 15.2887 17.3552 15.6448C15.43 17.57 12.3821 17.7866 10.204 16.153L8.62857 14.9714C6.88504 13.6638 5.33622 12.115 4.02857 10.3714L2.84701 8.79601C1.21341 6.61788 1.43001 3.56999 3.35523 1.64477C3.71133 1.28867 4.28867 1.28867 4.64477 1.64477L7.29289 4.29289C7.68342 4.68342 7.68342 5.31658 7.29289 5.70711L6.27175 6.72825C6.10946 6.89054 6.06923 7.13846 6.17187 7.34373C7.35853 9.71706 9.28294 11.6415 11.6563 12.8281C11.8615 12.9308 12.1095 12.8905 12.2717 12.7283L13.2929 11.7071C13.6834 11.3166 14.3166 11.3166 14.7071 11.7071Z" stroke="#33363F" stroke-width="2" />
                            </svg>



                            <h1 className="px-2 text-sm">{usuario.ramal ? usuario.ramal : 'Sem Ramal'}</h1>
                        </div>

                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                            <svg aria-label="suitcase icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 11H10V13H14V11Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z" />
                            </svg>

                            <h1 className="px-2 text-sm">{usuario.username}</h1>
                        </div>


                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                            <svg aria-label="email icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z" />
                            </svg>

                            <h1 className="px-2 text-sm">{usuario.email}</h1>
                        </div>


                    </div>
                </div>
            </div>



        </>

    );
};

export default VisualizarUsuario;