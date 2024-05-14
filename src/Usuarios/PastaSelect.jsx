import React, { useState, useEffect } from 'react';

function RolesSelect() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

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
  }, [])

  return (
    <div>
      <label>Selecione uma opção:</label>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.role}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RolesSelect;
