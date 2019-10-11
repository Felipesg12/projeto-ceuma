import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/home/index.component';
import AdicionarAlunos from './pages/adicionarAlunos/index.component';
import AdicionarCursos from './pages/adicionarCursos/index.component';
import Alunos from './pages/alunos/index.component';
import Cursos from './pages/cursos/index.component'  ;
import EditarAluno from './pages/editarAlunos/index.component';
import DeletarAluno from './pages/deletarAluno/index.component';
import DeletarCurso from './pages/deletarCurso/index.component'



export default function Router(){

    return(
        <BrowserRouter>

        <Switch>

            <Route path='/' exact component={Home}></Route>
            <Route path='/adicionarAlunos' exact component={AdicionarAlunos}></Route>
            <Route path='/alunos' exact component={Alunos}></Route>
            <Route path='/deletarAluno/:id' exact component={DeletarAluno}></Route>
            <Route path='/editarAluno/:id' exact component={EditarAluno}></Route>

            <Route path='/adicionarCursos' exact component={AdicionarCursos}></Route>
            <Route path='/cursos' exact component={Cursos}></Route>
            <Route path='/deletarCurso/:id' exact component={DeletarCurso}></Route>
            <Route path='/deletarCurso/:id' exact component={DeletarCurso}></Route>
            
            
        </Switch>
        
        </BrowserRouter>
        
    );

}