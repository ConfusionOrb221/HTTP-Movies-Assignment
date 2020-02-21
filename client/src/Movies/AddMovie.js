import React, { Component, useState } from 'react';
import Axios from 'axios';

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
          movie: {
              title: null,
              director: null,
              metascore: null,
              stars: []
            },
          stars: []  
        };
    }

    handleChange = e =>{
        this.setState({
            movie: {
                ...this.state.movie,
                [e.target.name]: e.target.value
            }
        })
    }

    handleStars = (e, index) =>{
        let stars = this.state.movie.stars;
        stars[index] = e.target.value;
        this.setState({
            movie: {
                ...this.state.movie,
                stars: stars
            },
            stars: this.state.stars
        })
    }

    addActor = e =>{
        e.preventDefault();
        this.setState({
            movie: this.state.movie,
            stars: [...this.state.stars, <ActorArray index={this.state.stars.length} stars={this.state.movie.stars} handleStars={this.handleStars.bind(this)} />]
        })
    }

    handleSubmit = (e, state) =>{
        e.preventDefault();

        Axios.post('http://localhost:5000/api/movies', this.state.movie)
            .then(res =>{ 
                this.setState({
                    movie: {
                        title: null,
                        director: null,
                        metascore: null,
                        stars: []
                      },
                    stars: []  
                  })
                this.props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="movie-card">
                <form onSubmit={(e) => this.handleSubmit(e, this.state)}>
                    <h2>Title: 
                        <input 
                            type="text"
                            name="title"
                            value={this.state.movie.title}
                            onChange={this.handleChange}
                        /> 
                    </h2> 
                    <div className="movie-director">
                    Director:
                        <input 
                            type="text"
                            name="director"
                            value={this.state.movie.director}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="movie-metascore">
                    MetaScore: 
                        <input 
                            type="text"
                            name="metascore"
                            value={this.state.movie.metascore}
                            onChange={this.handleChange}
                        />
                    </div>
                    <h3>Actors</h3>
                    {this.state.stars.map(star => (
                        star             
                    ))}
                    <button onClick={this.addActor} > Add Star </button>
                    <input
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
        );
    }
}

function ActorArray({index, stars, handleStars}){
    return (
        <>
        <input 
            type="text"
            name='star'
            value={stars[index]}
            onChange={(e) => handleStars(e, index)}
        /><br />
        </>
    )
}

export default AddMovie;