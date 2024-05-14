import React from 'react';




function DashboardCard01({ dados }) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        setData(dados)
    }, [dados])

    return (
        data && < div className=" rounded-xl  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 py-2 bg-white dark:bg-slate-800 shadow-lg  border border-slate-200 dark:border-slate-700 object-cover overflow-hidden" >
            <div className="px-5 pt-5 ">

                <h2 className="text-2xl  text-slate-800 dark:text-slate-100 mb-2 text-center bg-slate-100 rounded-sm font-bold">{data && data.empresa}</h2>
                <div className="text-xs text-center font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Tarefas
                </div>
                {data &&
                    <table className='w-full '>
                        <thead>
                            <tr className="text-xs">
                                <th >Status</th>
                                <th>Quantidade</th>
                                {/* <th>Variação</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='mb-10'>
                                <td className="text-xl text-center font-bold dark:text-slate-100">
                                    <div className='px-1 mr-2 bg-orange-200 p-1 rounded-md text-orange-700'>
                                        Pendente
                                    </div>
                                </td>
                                <td className='text-xl text-center font-bold'>
                                    <div className='px-1 mr-2  p-1 rounded-md text-gray-700'>
                                        {data.Pendente.quantidade}
                                    </div>
                                </td>
                                {/* <td className="text-sm text-center font-semibold ml-1 text-white px-1.5 ">
                                    <div className='px-1 mr-2 bg-green-500 p-1 rounded-full text-white '>
                                        {data.Pendente.variacao}
                                    </div>
                                </td> */}
                            </tr>
                            <tr className='mb-10'>
                                <td className="text-xl text-center font-bold dark:text-slate-100">
                                    <div className='px-1 mr-2 bg-blue-200 p-1 rounded-md text-azul'>
                                        Em Andamento
                                    </div>
                                </td>
                                <td className='text-xl text-center font-bold'>
                                    <div className='px-1 mr-2 text-gray-700 p-1 rounded-md '>
                                        {data.Em_Andamento.quantidade}
                                    </div>
                                </td>
                                {/* <td className="text-sm text-center font-semibold ml-1 text-white px-1.5 ">
                                    <div className='px-1 mr-2 bg-green-500 p-1 rounded-full text-white '>
                                        {data.Em_Andamento.variacao}
                                    </div>
                                </td> */}
                            </tr>

                            <tr className='mb-10'>
                                <td className="text-xl text-center font-bold dark:text-slate-100">
                                    <div className='px-1 mr-2 bg-green-200 p-1 rounded-md text-green-700'>
                                        Concluídas
                                    </div>
                                </td>
                                <td className='text-xl text-center font-bold'>
                                    <div className='px-1 mr-2  p-1 rounded-md text-gray-700'>
                                        {data.Concluida.quantidade}
                                    </div>
                                </td>
                                {/* <td className="text-sm text-center font-semibold ml-1 text-white px-1.5 ">
                                    <div className='px-1 mr-2 bg-green-500 p-1 rounded-full text-white '>
                                        {data.Concluida.variacao}
                                    </div>
                                </td> */}
                            </tr>
                            <tr className='mb-10'>
                                <td className="text-xl text-center font-bold dark:text-slate-100">
                                    <div className='px-1 mr-2 bg-green-500 p-1 rounded-md text-white'>
                                        Finalizadas
                                    </div>
                                </td>
                                <td className='text-xl text-center font-bold'>
                                    <div className='px-1 mr-2  p-1 rounded-md text-gray-700'>
                                        {data.Finalizada.quantidade}
                                    </div>
                                </td>
                                {/* <td className="text-sm text-center font-semibold ml-1 text-white px-1.5 ">
                                    <div className='px-1 mr-2 bg-green-500 p-1 rounded-full text-white '>
                                        {data.Finalizada.variacao}
                                    </div>
                                </td> */}
                            </tr>
                        </tbody>
                    </table>
                }
            </div>
            {/* Chart built with Chart.js 3 */}
            <div className="grow max-sm:max-h-[128px] xl:max-h-[128px] ">


            </div>
        </div >
    );
}

export default DashboardCard01;
