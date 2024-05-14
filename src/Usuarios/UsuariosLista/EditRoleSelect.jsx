import React, { useState, useEffect } from 'react';

function RolesSelect({ setRole, dados }) {
  const [options, setOptions] = useState([]);
  const selectedRole = dados.role;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:33331/roles');
        if (!response.ok) {
          throw new Error('Não foi possível obter os dados');
        }
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Erro ao buscar dados do endpoint:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className='flex gap-1 items-center'>
      <label className='p-1 bg-blue-200 text-azul rounded-md'>Função</label><br />
      <select
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        value={selectedRole}
        onChange={handleChange}
      >
        <option value="">Selecione uma função</option>
        {options.map((option) => (
          <option
            key={option.id_role}
            value={option.id_role}
          >
            {option.role}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RolesSelect;
