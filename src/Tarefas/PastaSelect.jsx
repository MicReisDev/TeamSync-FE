import React, { useState, useEffect } from 'react';

function PastaSelect({ setRole, dados }) {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    let token = window.localStorage.getItem('$TOKEN');
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch('http://localhost:33331/pastas', {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });

                if (!response.ok) {
                    throw new Error('Não foi possível obter os dados');
                }

                const data = await response.json();

                setOptions(data);
            } catch (error) {
                window.localStorage.clear()
                console.error('Erro ao buscar dados do endpoint:', error);
            }
        };

        fetchData();
    }, [])

    return (


        <div className='flex gap-1 items-center'>
            <label className='p-1 bg-blue-200 text-azul rounded-md'>PASTA</label><br />
            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                value={selectedOption}
                required
                onChange={(e) => {
                    setSelectedOption(e.target.value)
                    setRole({ ...dados, id_pasta: e.target.value })
                }}
            >
                <option value="">Selecione uma função</option>
                {options.map((option) => (

                    <option key={option.id_pasta} value={option.id_pasta}>
                        {option.pasta}
                    </option>
                ))}
            </select>
        </div >
    );
}

export default PastaSelect;
