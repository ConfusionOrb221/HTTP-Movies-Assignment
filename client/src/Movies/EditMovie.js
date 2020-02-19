import React, { Component } from 'react';
import axios from 'axios';

class EditMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
          movie: null
        };
      }

    componentDidMount() {
        this.fetchMovie(this.props.match.params.id);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.match.params.id !== newProps.match.params.id) {
          this.fetchMovie(newProps.match.params.id);
        }
    }

    fetchMovie = id => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => this.setState({ movie: res.data }))
          .catch(err => console.log(err.response));
    };

    handleChange = e =>{
        this.setState({
            movie: {
                ...this.state.movie,
                [e.target.name]: e.target.value
            }
        })
    }
    
    handleChangeArray = (e, index) =>{
        let newStars = this.state.movie.stars;
        newStars[index] = e.target.value
        this.setState({
            movie: {
                ...this.state.movie,
                stars: newStars
            }
        })
    }

    handleSubmit = (e, movie) =>{
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            this.setState({movie: null});
            this.props.history.push(`/movies/${movie.id}`)
        })
        .catch(err => console.log(err));
    }

    render() {
        if (!this.state.movie) {
            return <div>Loading movie information...</div>;
          }
        return (
            <div className="movie-card">
                <form onSubmit={(e) => this.handleSubmit(e, this.state.movie)}>
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
                    {this.state.movie.stars.map((star, index) => (
                        <>
                        <input 
                            type="text"
                            name={star}
                            value={this.state.movie.stars[index]}
                            onChange={(e) => this.handleChangeArray(e,index)}
                        /><br />
                        </>               
                    ))}
                    <input
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
        );
    }
}

export default EditMovie;