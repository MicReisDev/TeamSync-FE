
import { useState } from 'react';
import userIMG from '../../../assets/user-icon.png';
import Modal from '../../Helpers/Modal';
import ConfirmarDelete from './ConfirmarDelete'
import EditarUsuario from './EditarUsuario';
import VisualizarUsuario from './VisualizarUsuario'
const ListaUsuarios = ({ arrUsuarios, setUpdateComponent, updateComponent }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [openModalEditar, setOpenModalEditar] = useState(false);
    const [openModalVisualizar, setOpenModalVisualizar] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false)
    const [imgs, setimgs] = useState('');
    const [user, setUser] = useState('');

    const visualizar = (img) => {
        setimgs(img)
        setOpenModal(!openModal);
    };

    const confirmeExcluir = (usuario) => {
        setUser(usuario)
        setOpenModalExcluir(!openModalExcluir);
    };

    const editarUsuario = (usuario) => {
        setUser(usuario)
        setOpenModalEditar(!openModalEditar);
    }

    const visualizarUsuario = (usuario) => {

        setUser(usuario)
        setOpenModalVisualizar(!openModalVisualizar);
    }
    return <>

        <section class=" px-4 mx-auto">
            <div class="flex flex-col mt-6">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-800">

                                    <tr>
                                        <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div class="flex items-center gap-x-3">

                                                <span>Nome</span>
                                            </div>
                                        </th>


                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">

                                            Permissão

                                        </th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email</th>

                                        {/* <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Time</th> */}
                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Pastas</th>

                                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Opções
                                        </th>
                                    </tr>


                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 ">


                                    {arrUsuarios.length > 0 &&
                                        arrUsuarios.map((usuario) => (
                                            <tr key={usuario.id_usuario} >
                                                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div class="inline-flex items-center gap-x-3">


                                                        <div class="flex items-center gap-x-2">
                                                            <img class="object-cover w-10 h-10 rounded-full bg-azul" src={usuario.avatar ? usuario.avatar : userIMG} alt="" onClick={() => { if (usuario.avatar) visualizar(usuario.avatar) }}></img>
                                                            <div className='overflow-hidden ... text-ellipsis truncate max-w-[100%]'>
                                                                <h2 class="font-medium text-gray-800 dark:text-white ">{usuario.nome}</h2>
                                                                <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{usuario.username}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div class="flex items-center gap-x-2">
                                                        {
                                                            usuario.roles.map((role) => (
                                                                <p key={role.id_role} class="px-3 py-1 text-xs text-indigo-500 rounded-md dark:bg-gray-800 bg-indigo-100/60">{(role.role)}</p>
                                                            ))
                                                        }
                                                    </div>
                                                </td>
                                                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-hidden ... text-ellipsis truncate max-w-[200px]">{usuario.email}</td>
                                                {/* <td class="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div class="flex items-center gap-x-2">
                                                        <p class="px-3 py-1 text-xs  text-green-500 bg-green-100 rounded-md dark:bg-verde1 dark:text-azulQuasePreto">Design</p>
                                                        <p class="px-3 py-1 text-xs  text-red-500 bg-red-200 rounded-md dark:bg-magenta1 dark:text-azulQuasePreto">Marketing</p>
                                                    </div>
                                                </td> */}

                                                <td className="px-4 py-4 text-sm whitespace-nowrap text-ellipsis overflow-hidden max-w-sm relative"
                                                    onMouseOver={(e) => e.currentTarget.scrollWidth > e.currentTarget.clientWidth && setShowTooltip(true)}
                                                    onMouseOut={() => setShowTooltip(false)}>

                                                    <div className="flex items-center gap-x-2">
                                                        {usuario.pastas.map((pasta) => (
                                                            <p key={pasta.id_pasta} className="px-3 py-1 text-xs text-gray-700 rounded-md dark:bg-gray-800 bg-gray-200">
                                                                {pasta.pasta}
                                                            </p>
                                                        ))}
                                                    </div>

                                                    {showTooltip && (
                                                        <div className="absolute left-0 top-full mt-2 p-2 border bg-white shadow-lg rounded text-gray-800 z-20">
                                                            {usuario.pastas.map((pasta, index) => (
                                                                <span key={index}>{pasta.pasta}{index < usuario.pastas.length - 1 ? ', ' : ''}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </td>


                                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div class="flex items-center gap-x-6">
                                                        <button onClick={() => { visualizarUsuario(usuario) }} className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none"  >
                                                            <svg
                                                                viewBox="0 0 1024 1024"
                                                                fill="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                                                            </svg>
                                                        </button>
                                                        <button onClick={() => { editarUsuario(usuario) }} class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                        </button>
                                                        <button onClick={() => { confirmeExcluir(usuario) }} class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>


                                                    </div>
                                                </td>
                                            </tr>

                                        ))
                                    }




                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div class="flex items-center justify-between mt-6">
  <a href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>

    <span>
      Anterior
    </span>
  </a>

  <div class="items-center hidden lg:flex gap-x-3">
    <a href="#" class="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
  </div>

  <a href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
    <span>
      Próximo
    </span>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
  </a>
</div> */}
        </section>
        <Modal open={openModal} setOpenModal={setOpenModal} >
            <img src={imgs} alt="" />
        </Modal>
        <Modal open={openModalExcluir} setOpenModal={setOpenModalExcluir} >
            <ConfirmarDelete usuario={user} openModalExcluir={openModalExcluir} setOpenModalExcluir={setOpenModalExcluir} setUpdateComponent={setUpdateComponent} updateComponent={updateComponent}></ConfirmarDelete>
        </Modal>
        <Modal open={openModalEditar} setOpenModal={setOpenModalEditar} >
            <EditarUsuario usuario={user} openModalEditar={openModalEditar} setOpenModalEditar={setOpenModalEditar} setUpdateComponent={setUpdateComponent} updateComponent={updateComponent}></EditarUsuario>
        </Modal>
        <Modal open={openModalVisualizar} setOpenModal={setOpenModalVisualizar}>
            <VisualizarUsuario usuario={user} openModalVisualizar={openModalVisualizar} setOpenModalVisualizar={setOpenModalVisualizar}> </VisualizarUsuario>
        </Modal>
    </>
};

export default ListaUsuarios;
