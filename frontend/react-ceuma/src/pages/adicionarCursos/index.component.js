import React, { Component } from 'react';
import api from '../../services/api'

export default class AdicionarCursos extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeCargaHoraria = this.onChangeCargaHoraria.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            cargaHoraria: '',

        };
    }
    onChangeNome(event) {
        this.setState({ nome: event.target.value })
    }
    onChangeCargaHoraria(event) {
        this.setState({ cargaHoraria: event.target.value })
    }
    async onSubmit(event) {
        event.preventDefault();

        try {
            await api.post('/cursos', {
                nome: this.state.nome,
                cargaHoraria: this.statecargaHoraria,
            });
            alert(`O curso ${this.state.nome} foi adicionado com sucesso!`)

        } catch (error) {

        }


    }

    render() {
        return (
            
            <div className='exec'>
                <h3>Adicionar Curso</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputName4">Nome</label>
                            <input type="text"
                                className="form-control"
                                id="inputName4"
                                placeholder="Nome do  Curso"
                                value={this.state.nome}
                                onChange={this.onChangeNome} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputCpf4">CargaHorária</label>
                            <input type="text"
                                className="form-control"
                                id="inputCpf4"
                                placeholder=""
                                value={this.state.cargaHoraria}
                                onChange={this.onChangeCargaHoraria}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Adicionar Curso</button>
                </form>

            </div>

        );
    }

}