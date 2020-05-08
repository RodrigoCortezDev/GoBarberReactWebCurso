import React, { Component } from 'react';
import TechItem from './TechItem';


class TechList extends Component {
    state = {
        newTech: '',
        techs: [],    
    };

    //Eventos de componente
    //Quando é criado
    componentDidMount() {
        const techsJson = localStorage.getItem('techs');

        if (techsJson) {
            this.setState({ techs: JSON.parse(techsJson) })
        }

    }

    //Quando é atualizado
    componentDidUpdate(prevProps, prevState) {
        if (prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
    }

    //Quando o componente deixa de existir
    componentWillUnmount() {
        
    }


    handleInputChange = e => {
        this.setState({ newTech: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({ 
            techs: [...this.state.techs, this.state.newTech],
            newTech: '' 
        });
    }

    handleDelete = (tech) => {
        this.setState({ 
            techs: this.state.techs.filter(t => t !== tech)
        });
    }


    render() {
        return(
        <form onSubmit={this.handleSubmit}>
            <ul>
                {this.state.techs.map(tech => (
                    <TechItem key={tech} 
                              tech={tech} 
                              onDelete={() => this.handleDelete(tech)}
                    />
                ))}
            </ul>
            <input type="text" 
                   onChange={this.handleInputChange}
                   value={this.state.newTech} />            
            <button type="submit">Enviar</button>
        </form>
        );
    }
}

export default TechList;