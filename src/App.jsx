import React from 'react';
import './App.css';
import Login from './Login/Login'
import Usuarios from './Usuarios/Usuarios'
import Dashboard from './DashBoard/pages/Dashboard'
import IndexDashboard from './Dashboard2/IndexDashboard';
import DashBoardProdetech from './DashBoardProdetechClients/DashBoardProdetech'
import Tarefas from './Tarefas/Tarefas'
import { GlobalStorage } from './UserContext'
import RotasProtegidas from './Helpers/RotasProtegidas'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TarefasDefault from '../src/Tarefas/Folder/TarefaDefault';
import ListaFerias from './Ferias/ComponenteFerias/ListaFerias';
import UsuariosFerias from './Ferias/UsuariosFerias';
import MeuPerfil from './MeuPerfil/MeuPerfil';

const App = () => {
  return <div>
    <BrowserRouter>
      <GlobalStorage>
        <Routes>
          <Route path='/usuarios' element={<RotasProtegidas>< Usuarios /></RotasProtegidas>} />
          <Route path='/meuperfil' element={<RotasProtegidas>< MeuPerfil /></RotasProtegidas>} />
          <Route path='/dashboard' element={<RotasProtegidas><IndexDashboard /></RotasProtegidas>} />
          <Route path='/dashboardclientes' element={<RotasProtegidas><DashBoardProdetech /></RotasProtegidas>} />
          <Route path='/listaferias' element={<RotasProtegidas><ListaFerias /></RotasProtegidas>} />
          <Route path='/tarefas' element={<RotasProtegidas><Tarefas /></RotasProtegidas>} />
          <Route path='/pasta/:id' element={<RotasProtegidas><Tarefas /></RotasProtegidas>} />
          <Route path='/colaboradores' element={<RotasProtegidas><UsuariosFerias /></RotasProtegidas>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </GlobalStorage>
    </BrowserRouter>
  </div>;
};

export default App;
