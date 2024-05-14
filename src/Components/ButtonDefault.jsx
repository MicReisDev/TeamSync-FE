
import React from 'react';


const ButtonDefault = ({ nome, icone, estilo, acao }) => {


    return (
        <>
            <button className={estilo ? estilo : 'rounded-md  hover:bg-blue-400 group flex justify-center items-center transition-all bg-azul text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm max-w-full text-center'} onClick={acao}>

                {nome}
            </button>

        </>

    );
};

export default ButtonDefault;