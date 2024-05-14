import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

import moment from 'moment';
import Loading from '../Helpers/Loading';

const DashBoardProdetech = () => {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    let token = window.localStorage.getItem('$TOKEN');

    const getDash = async () => {
        try {
            const response = await fetch('http://localhost:33331/prodetech-dash', {
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
                setDados(data)
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            console.log('Ocorreu um erro.');
        }
    };

    const options = {
        animation: {
            startup: true,
            easing: "out",
            duration: 1000,
        },
    }

    useEffect(() => {
        getDash();
    }, []);

    return <>
        {loading ? < Loading /> :
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden scroll">

                <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
                    <div className="grid gap-6 ">

                        <div className=' flex flex-col gap-10'>
                            <div className='rounded-xl w-full  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 p-2 bg-white  dark:bg-slate-800 shadow-lg  border border-slate-200 dark:border-slate-700 object-cover overflow-hidden'>
                                <h1 className='p-5'>Volume de vendas/mês - 2023</h1>
                                <Chart className=''
                                    chartType="Bar"
                                    width="100%"
                                    height="400px"
                                    data={dados.mes_produto}
                                    options={options}
                                />
                            </div>
                            <div className='rounded-xl w-full  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 p-2 bg-white  dark:bg-slate-800 shadow-lg  border border-slate-200 dark:border-slate-700 object-cover overflow-hidden'>
                                <h1 className='p-5'>Analise de serviços por cidade</h1>
                                <Chart className=''
                                    chartType="Bar"
                                    width="100%"
                                    height="400px"
                                    data={dados.cidade_produto}
                                //options={options}
                                />
                            </div>
                            <div className='rounded-xl w-full  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 p-2 bg-white  dark:bg-slate-800 shadow-lg  border border-slate-200 dark:border-slate-700 object-cover overflow-hidden'>
                                <h1 className='p-5'>Quantidade absoluta de serviços</h1>
                                <div className='flex items-center'>
                                    <Chart className=''
                                        chartType="BarChart"
                                        width="100%"
                                        height="400px"
                                        data={dados.ano_produto}
                                    // options={options}
                                    />
                                    <Chart className=''
                                        chartType="PieChart"
                                        width="100%"
                                        height="200px"
                                        data={dados.ano_produto}
                                        options={{ legend: "none" }}
                                    />
                                </div>
                            </div>
                            <div className='rounded-xl w-full  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 p-2 bg-white  dark:bg-slate-800 shadow-lg  border border-slate-200 dark:border-slate-700 object-cover overflow-hidden'>
                                <h1 className='p-5'>Quantidade de serviços no geral por cidade </h1>
                                <div className='flex items-center'>
                                    <Chart className=''
                                        chartType="BarChart"
                                        width="100%"
                                        height="400px"
                                        data={dados.geral_por_cidade}
                                    // options={options}
                                    />
                                    <Chart className=''
                                        chartType="PieChart"
                                        width="100%"
                                        height="200px"
                                        data={dados.geral_por_cidade}
                                        options={{ legend: "none" }}
                                    />
                                </div>
                            </div>
                            <div className='rounded-xl w-full  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 p-2 bg-white  dark:bg-slate-800 shadow-lg  border border-slate-200 dark:border-slate-700 object-cover overflow-hidden'>
                                <h1 className='p-5'>Quantidade de modalidades por contrato</h1>
                                <div className='flex items-center'>
                                    <Chart className=''
                                        chartType="BarChart"
                                        width="100%"
                                        height="400px"
                                        data={dados.modalidade_contratos}
                                    // options={options}
                                    />
                                    <Chart className=''
                                        chartType="PieChart"
                                        width="100%"
                                        height="200px"
                                        data={dados.modalidade_contratos}
                                        options={{ legend: "none" }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>








                </div>
            </div >}
    </>;

};

export default DashBoardProdetech;