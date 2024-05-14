import React, { useState, useEffect } from 'react';
import WelcomeBanner from '../DashBoard/partials/dashboard/WelcomeBanner';
import DashboardCard01 from './Components/DashCard01'
import Loading from '../Helpers/Loading';

// let dados = [
//     {
//         Empresa: "GERAL",
//         Em_Andamento: {
//             quantidade: 50,
//             variacao: "+49%"
//         },
//         Pendente: {
//             quantidade: 40,
//             variacao: "+49%"
//         },
//         Concluidas: {
//             quantidade: 5,
//             variacao: "+49%"
//         },
//         Finalizadas: {
//             quantidade: 100,
//             variacao: "+49%"
//         }
//     },

//     {
//         Empresa: "PRODETECH",
//         Em_Andamento: {
//             quantidade: 50,
//             variacao: "+49%"
//         },
//         Pendente: {
//             quantidade: 40,
//             variacao: "+49%"
//         },
//         Concluidas: {
//             quantidade: 5,
//             variacao: "+49%"
//         },
//         Finalizadas: {
//             quantidade: 100,
//             variacao: "+49%"
//         }
//     },
//     {
//         Empresa: "BCI",
//         Em_Andamento: {
//             quantidade: 50,
//             variacao: "+49%"
//         },
//         Pendente: {
//             quantidade: 40,
//             variacao: "+49%"
//         },
//         Concluidas: {
//             quantidade: 5,
//             variacao: "+49%"
//         },
//         Finalizadas: {
//             quantidade: 100,
//             variacao: "+49%"
//         }
//     },
//     {
//         Empresa: "Ferreira de Araujo",
//         Em_Andamento: {
//             quantidade: 50,
//             variacao: "+49%"
//         },
//         Pendente: {
//             quantidade: 40,
//             variacao: "+49%"
//         },
//         Concluidas: {
//             quantidade: 5,
//             variacao: "+49%"
//         },
//         Finalizadas: {
//             quantidade: 100,
//             variacao: "+49%"
//         }
//     },
//     {
//         Empresa: "Force Commander",
//         Em_Andamento: {
//             quantidade: 50,
//             variacao: "+49%"
//         },
//         Pendente: {
//             quantidade: 40,
//             variacao: "+49%"
//         },
//         Concluidas: {
//             quantidade: 5,
//             variacao: "+49%"
//         },
//         Finalizadas: {
//             quantidade: 100,
//             variacao: "+49%"
//         }
//     },
//     {
//         Empresa: "ABEPD",
//         Em_Andamento: {
//             quantidade: 50,
//             variacao: "+49%"
//         },
//         Pendente: {
//             quantidade: 40,
//             variacao: "+49%"
//         },
//         Concluidas: {
//             quantidade: 5,
//             variacao: "+49%"
//         },
//         Finalizadas: {
//             quantidade: 100,
//             variacao: "+49%"
//         }
//     }

// ]

const IndexDashboard = () => {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    let token = window.localStorage.getItem('$TOKEN');
    const getDash = async () => {
        try {
            const response = await fetch('http://localhost:33331/dash/tarefa', {
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
            console.log('Ocorreu um erro ao enviar os dados do formulário.');
        }
    };

    useEffect(() => {
        getDash();
    }, []);

    return <>
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden scroll">
            {loading ? < Loading /> : null}
            <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
                <WelcomeBanner></WelcomeBanner>

                <div className="grid grid-cols-12 gap-6">
                    {dados && dados.map((dado) => {
                        return <DashboardCard01 dados={dado} />
                    })}
                </div>

            </div>
        </div>
    </>;

};

export default IndexDashboard;