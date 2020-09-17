import React from 'react';

class Name extends React.Component {
    state = {
        name: "David Rodrigo"
    }

    changeName = () => {
        this.state.name = "Pablo"
    }

    render() {
        this.changeName()
        console.log(this.state)
        return (
            <div>
                <h1>{this.state.name}</h1>
            </div>
        );
    }
}

export default Name;