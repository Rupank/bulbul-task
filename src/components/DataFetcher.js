import React, { Component } from "react";
const MAIN_URL = 'https://swapi.co/api/people';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
export default class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            data: [],
            isLoading: true
        };
    }

    fetchData = async (url) => {
        try {
            let data = await fetch(`${CORS_PROXY}${url}`);
            data = await data.json();
            return data;
        } catch (error) {
            this.setState({
                error: error.message,
                isLoading: false
            })
        }
    }

    componentDidMount() {
        this.fetchData(MAIN_URL)
            .then(data => {
                data &&
                    this.setState({
                        isLoading: false,
                        data: data.results,
                    });
            });
    }

    fetchHomeworldData(url) {
        this.fetchData(url)
            .then(data => {
                data &&
                    this.setState({
                        ...this.state,
                        homeworld: data.name
                    });
            });
    }

    render() {
        const { error, homeworld, data, isLoading } = this.state;
        if (isLoading) return <div>Loading Content</div>;
        if (error) return <div>{error}</div>;
        return (
            <div style={{ display: "flex" }}>
                <div>
                    <h3>List of Characters</h3>
                    {data.map(character => (
                        <div key={character.name} style={{ display: "flex" }}>
                            <button
                                onClick={() => this.fetchHomeworldData(character.homeworld)}>
                                {character.name}
                            </button>
                        </div>
                    ))}
                </div>

                <div>HomeWorld Name- {homeworld}</div>
            </div>
        );
    }
}
