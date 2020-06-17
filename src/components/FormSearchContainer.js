import React, { Component } from 'react';

import Select from '../components/Select';
import CheckBox from '../components/CheckBox';

const INITIAL_SEARCH_FORM = {
    place: '',
    reach: '',
    make: '',
    model: '',
    version: '',
    year: '',
    price_range: '',
    state_news: true,
    state_uses: true,
};
const URL_API = "http://desafioonline.webmotors.com.br/api/OnlineChallenge";
const DEBUG = false;

class FormSearchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: INITIAL_SEARCH_FORM,
            errors: [],
            genderOptions: ['Male', 'Female', 'Others'],
            skillOptions: ['Programming', 'Development', 'Design', 'Testing'],
            places: [{ value: 0, text: "São Paulo - SP" }],
            radius: [{ value: 0, text: "100km" }],
            makes: [],
            models: [],
            versions: [],
            price_ranges: [],
            years: [],
            formStatus: 'NOT_SENT'
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleChangeMake = this.handleChangeMake.bind(this);
        this.handleChangeModel = this.handleChangeModel.bind(this);
        this.handleAdvanced = this.handleAdvanced.bind(this);
    }

    componentDidMount() {
        this.renderSelectMake();
    }

    renderSelectMake() {
        fetch(`${URL_API}/Make`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ makes: data });
            });
    }

    renderSelectModel(MakeID) {
        fetch(`${URL_API}/Model?MakeID=${MakeID}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ models: data });
            });
    }

    renderSelectVersion(ModelID) {
        fetch(`${URL_API}/Version?ModelID=${ModelID}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ versions: data });
            });
    }

    validForm() {
        const formFields = this.state.search;
        let isValid = true;

        this.setState({
            errors: []
        });
        // Required Fields
        let requiredFields = ['place', 'reach', 'make', 'model'];
        Object.entries(formFields).forEach(([key, value]) => {
            if (requiredFields.indexOf(key) >= 0 && !value.length) {
                const error = { [key]: 'required'};
                this.setState(state => {
                    const errors = state.errors.concat(error);
                    return {
                        errors
                    }
                });
                isValid = false;
            }
        });

        return isValid;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if(!this.validForm()) {
            this.setState({ formStatus: 'NOT_VALID' });
            return false;
        }
        this.setState({ formStatus: 'SUCCESS' });
    }

    handleAdvanced(ev) {
        // Busca avançada
    }

    handleClearForm(ev) {
        ev.preventDefault();
        this.setState({
            search: INITIAL_SEARCH_FORM
        });
    }

    handleChangeMake(ev) {
        this.setState({ search: { ...this.state.search,  make: ev.target.value  }});
        this.renderSelectModel(ev.target.value);
    }

    handleChangeModel(ev) {
        this.setState({ search: { ...this.state.search, model: ev.target.value } });
        this.renderSelectVersion(ev.target.value);
    }

    fieldIsValid(fieldName) {
        const error = Object.entries(this.state.errors).filter(([k, v]) => fieldName === Object.keys(v)[0]);
        return !error.length
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <div className="row">
                    <div className="col col-1">
                        <CheckBox
                            name="state_news"
                            className={this.fieldIsValid('state_news') ? '' : 'error'}
                            title="Novos"
                            checked={this.state.search.state_news}
                            value={this.state.search.state_news}
                            handleChange={(e) => this.setState({ search: { ...this.state.search, state_news: !this.state.search.state_news } })}
                        />
                    </div>
                    <div className="col col-1">
                        <CheckBox
                            name="state_uses"
                            className={this.fieldIsValid('state_uses') ? '' : 'error'}
                            title="Usados"
                            checked={this.state.search.state_uses}
                            value={this.state.search.state_uses}
                            handleChange={(e) => this.setState({ search: { ...this.state.search, state_uses: !this.state.search.state_uses } })}
                        />
                    </div>
                    <div className="col col-6"></div>
                </div>
                <div className="row">
                    <div className="col col-3">
                        <label>Onde:</label>
                        <Select
                            name={'place'}
                            className={this.fieldIsValid('place') ? '' : 'error'}
                            options={this.state.places}
                            value={this.state.search.place}
                            placeholder={'Selecione'}
                            optionId="value"
                            optionText="text"
                            handleChange={(e) => this.setState({ search: { ...this.state.search, place: e.target.value } })}
                        />
                    </div>
                    <div className="col col-1">
                        <label>Raio:</label>
                        <Select
                            name={'reach'}
                            className={this.fieldIsValid('reach') ? '' : 'error'}
                            options={this.state.radius}
                            value={this.state.search.reach}
                            placeholder={'Selecione'}
                            optionId="value"
                            optionText="text"
                            handleChange={(e) => this.setState({ search: { ...this.state.search, reach: e.target.value } })}
                        />
                    </div>
                    <div className="col col-2">
                        <label>Marca:</label>
                        <Select
                            name={'make'}
                            className={this.fieldIsValid('make') ? '' : 'error'}
                            options={this.state.makes}
                            value={this.state.search.make}
                            placeholder={'Selecione'}
                            optionId="ID"
                            optionText="Name"
                            handleChange={this.handleChangeMake}
                        />
                    </div>

                    <div className="col col-2">
                        <label>Modelo:</label>
                        <Select
                            name={'model'}
                            className={this.fieldIsValid('model') ? '' : 'error'}
                            options={this.state.models}
                            value={this.state.search.model}
                            placeholder={'Selecione'}
                            optionId="ID"
                            optionText="Name"
                            handleChange={this.handleChangeModel}
                            disabled={!this.state.models.length}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-2">
                        <label>Ano:</label>
                        <Select
                            name={'year'}
                            className={this.fieldIsValid('year') ? '' : 'error'}
                            options={this.state.years}
                            value={this.state.search.year}
                            placeholder={'Selecione'}
                            optionId="value"
                            optionText="text"
                            handleChange={(e) => Object.assign({}, this.state.search, { year: e.target.value })}
                        />
                    </div>
                    <div className="col col-2">
                        <label>Faixa de preço:</label>
                        <Select
                            name={'price_range'}
                            className={this.fieldIsValid('price_range') ? '' : 'error'}
                            options={this.state.price_ranges}
                            value={this.state.search.price_range}
                            placeholder={'Selecione'}
                            optionId="value"
                            optionText="text"
                            handleChange={(e) => Object.assign({}, this.state.search, { price_range: e.target.value })}
                        />
                    </div>
                    <div className="col col-4">
                        <label>Versao:</label>
                        <Select
                            name={'version'}
                            className={this.fieldIsValid('version') ? '' : 'error'}
                            options={this.state.versions}
                            value={this.state.search.version}
                            placeholder={'Selecione'}
                            optionId="ID"
                            optionText="Name"
                            handleChange={(e) => this.setState({ search: { ...this.state.search, version: e.target.value } })}
                            disabled={!this.state.versions.length}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-4">
                        <span className="searchAdvanced" onClick={(e) => this.handleAdvanced(e)}>> Busca Avançada</span>
                    </div>
                    <div className="col col-1">
                        <span className="clearFilter" onClick={(e) => this.handleClearForm(e)}>Limpar filtros</span>
                    </div>
                    <div className="col col-3">
                        <button type="submit" className="btn">Ver Ofertas</button>
                    </div>
                </div>
                {this.state.formStatus === 'SUCCESS' && <span class="popuptext">Formulário enviado com sucesso!</span> }
                {this.state.formStatus === 'NOT_VALID' && <span class="popuptext">Formulário não esta válido!</span> }
                {DEBUG && <pre>{JSON.stringify(this.state)}</pre>}
            </form>
        );
    }
}

export default FormSearchContainer;
