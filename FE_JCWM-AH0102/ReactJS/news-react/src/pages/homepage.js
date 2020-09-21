import Axios from 'axios';
import React from 'react';

const API_URL = "http://newsapi.org/v2/top-headlines?country=id&"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ["Business", "Entertainment", "Health", "Science", "Sports", "Technology"],
            selectedCategory: "business"
        }
    }

    componentDidMount() {
        this.getNews()
    }

    componentDidUpdate() {
        this.getNews()
    }

    getNews = () => {
        Axios.get(API_URL + `category=${this.state.selectedCategory}&apiKey=56e93abee1e94703a4c99090376efa3b`)
            .then((res) => {
                console.log("Get News Success", res.data)
            }).catch((err) => {
                console.log("Get News Error", err)
            })
    }

    btSelect = (category) => {
        this.setState({ selectedCategory: category })
        // console.log(this.state.selectedCategory)
    }

    renderCategory = () => {
        return this.state.category.map((item, index) => {
            return (
                <a className="nav-link" key={index} style={{cursor:"pointer"}} onClick={() => this.btSelect(item.toLowerCase())}>{item}</a>
            )
        })
    }

    render() {
        return (
            <div >
                <div className="nav-scroller py-1 mb-1">
                    <nav className="nav d-flex flex-nowrap justify-content-between" style={{ overflow: "auto" }}>
                        {this.renderCategory()}
                    </nav>
                </div>
                <div className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;