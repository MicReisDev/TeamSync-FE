import React, { useEffect, useState } from 'react';
import moment from 'moment';

const DarFerias = ({ ferias, usuario, setOpenModal, setUpdate }) => {
    const token = localStorage.getItem('$TOKEN');
    const [feriasAlteradas, setFeriasAlteradas] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [dadosFerias, setDadosFerias] = useState({
        inicio: '',
        retorno: '',
        colaborador_ferias_periodo_id: '',
        pendente: 'false'
    });


    const enviarDados = async () => {
        const env = []
        env.push({ ...dadosFerias, gozando: 'true' })
        try {
            const response = await fetch('http://localhost:33331/colaborador-atualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(env),
            });

            if (response.ok) {
                AtualizaStatus()
                setUpdate(prevE => (+prevE + 1))

                setOpenModal(prev => (!prev))
            } else {
                console.error('Falha ao enviar dados.' + response);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const AtualizaStatus = async () => {

        try {
            const response = await fetch(`http://localhost:33331/colaborador-ferias/${usuario.colaborador_ferias_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status: 'Ferias' }),
            });

            if (response.ok) {
                setUpdate(prevE => (+prevE + 1))

                setOpenModal(prev => (!prev))
            } else {
                console.error('Falha ao enviar dados.' + response);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    useEffect(() => { setFeriasAlteradas(ferias) }, [ferias]);

    return (
        <div className="flex flex-col gap-5 w-full overflow-hidden  justify-center text-center items-center  z-50 ">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                <table className="divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <div class="flex items-center gap-x-3">

                                    <span>Escolha</span>
                                </div>
                            </th>
                            <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <div class="flex items-center gap-x-3">

                                    <span>Periodo Aquisitivo</span>
                                </div>
                            </th>


                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <div class="flex items-center gap-x-2">
                                    <span>Data limite</span>


                                </div>
                            </th>



                            <th scope="col" class="relative py-3.5 px-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                                Saldo de dias
                            </th>
                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Previsão</th>
                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Pendente</th>
                            {dadosFerias != '' ?
                                < th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Inicio</th>

                                : null}

                            {dadosFerias != '' ?
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Fim</th>

                                : null}


                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {feriasAlteradas && feriasAlteradas.map((ferias, index) => (
                            ferias.pendente == 'true' ?
                                <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}>




                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                                        <input
                                            type="checkbox"
                                            checked={ferias.colaborador_ferias_periodo_id === selectedId}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setDadosFerias({ ...dadosFerias, colaborador_ferias_periodo_id: e.target.value });
                                                    setSelectedId(ferias.colaborador_ferias_periodo_id);
                                                } else {
                                                    setSelectedId(null);
                                                }
                                            }}
                                            value={ferias.colaborador_ferias_periodo_id}
                                        />
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                                        {ferias.periodo_aquisitivo}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {moment(ferias.limite, 'DD-MM-YYYY').format('DD/MM/YYYY')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ferias.saldo ? ferias.saldo : ''}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">

                                        {ferias.previsao != '00-00-0000' ? moment(ferias.previsao, 'DD-MM-YYYY').format('DD/MM/YYYY') : 'Sem previsão'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ferias.pendente == 'true' ? 'Sim' : 'Não'}
                                    </td>

                                    {dadosFerias != '' ?
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input onChange={(e) => { setDadosFerias({ ...dadosFerias, inicio: e.target.value, retorno: moment(e.target.value, 'YYYY-MM-DD').add(+ferias.saldo, 'days').format('YYYY-MM-DD') }) }} type="date" />
                                        </td>

                                        : null}

                                    {dadosFerias != '' ?
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                value={dadosFerias.retorno}
                                                onChange={(e) => { setDadosFerias({ ...dadosFerias, retorno: e.target.value }) }}
                                                type="date"
                                            />
                                        </td>

                                        : null}

                                </tr> : null
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={enviarDados}
                disabled={!(dadosFerias.inicio != '' && dadosFerias.retorno != '' && dadosFerias.colaborador_ferias_periodo_id != '')}
                class={`px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${(dadosFerias.inicio != '' && dadosFerias.retorno != '' && dadosFerias.colaborador_ferias_periodo_id != '') ? 'bg-orange-600 hover:bg-orange-500 cursor-pointer' : 'bg-orange-300 cursor-not-allowed'}`}
            >
                Dar Ferias
            </button>
        </div >
    );
};

export default DarFerias;
