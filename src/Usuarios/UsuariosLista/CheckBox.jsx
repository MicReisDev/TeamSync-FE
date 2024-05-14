import React, { useState, useEffect } from 'react';

const CheckBoxComponent = ({ selectedPastas, setSelectedPastas, allPastas }) => {
    // Estado inicial da lista de pastas.
    const [pastas, setPastas] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchPastas = async () => {
        let token = window.localStorage.getItem('$TOKEN');
        try {
            const response = await fetch(`http://localhost:33331/pastas`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });
            const data = await response.json();
            if (data.error) {

                console.log(data.error);
                //setErro(data.error);
            } else {
                setPastas(data);
            }
        } catch (error) {
            window.localStorage.clear()
            console.error(error);
            //setErro('Ocorreu um erro ao buscar as pastas.');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (idPasta) => {
        if (selectedPastas && selectedPastas.some(pasta => pasta.id_pasta === idPasta)) {
            setSelectedPastas(selectedPastas.filter((pasta) => pasta.id_pasta !== idPasta));
        } else {
            setSelectedPastas([...selectedPastas, { id_pasta: idPasta }]);
        }
    };

    useEffect(() => {
        fetchPastas();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className='my-3'>
            <div className='flex gap-3 justify-between'>
                {pastas.map((pasta) => (
                    <div key={pasta.id_pasta} className="flex items-center gap-3 p-2  border border-gray-200 rounded dark:border-gray-700">
                        <input
                            id={`checkbox-${pasta.id_pasta}`}
                            type="checkbox"
                            checked={selectedPastas && selectedPastas.some(p => p.id_pasta === pasta.id_pasta)}
                            name="bordered-checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={() => handleCheckboxChange(pasta.id_pasta)}
                        />
                        <label
                            htmlFor={`checkbox-${pasta.id_pasta}`}
                            className="w-full  text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            {pasta.pasta}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckBoxComponent;
