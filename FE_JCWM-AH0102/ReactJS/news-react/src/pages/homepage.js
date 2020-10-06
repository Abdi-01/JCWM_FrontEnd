import Axios from 'axios';
import React from 'react';
import CardNews from '../components/cardNews';
import CardNewsPage from '../components/cardNewsPage';
import CarouselComp from '../components/carousel';
import InfoCorona from '../components/infoCorona';

const API_URL = "http://newsapi.org/v2/top-headlines?country=id&"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ["Business", "Entertainment", "Health", "Science", "Sports", "Technology"],
            selectedCategory: "business",
            news: []
        }
    }

    componentDidMount() {
        this.getNews()
    }

    getNews = () => {
        Axios.get(API_URL + `category=${this.state.selectedCategory}&apiKey=56e93abee1e94703a4c99090376efa3b`)
            .then((res) => {
                console.log("Get News Success", res.data.articles)
                this.setState({ news: res.data.articles, reload: false })
            }).catch((err) => {
                console.log("Get News Error", err)
            })
    }

    btSelect = (category) => {
        this.setState({ selectedCategory: category, reload: true })
    }

    renderCategory = () => {
        return this.state.category.map((item, index) => {
            return (
                <a className="nav-link" key={index} style={{ cursor: "pointer" }} onClick={() => this.btSelect(item.toLowerCase())}>{item}</a>
            )
        })
    }

    renderNews = () => {
        // melakukan duplikasi data array dari state
        let tempNews = [...this.state.news]
        tempNews.splice(0, 5)
        return tempNews.map((item, index) => {
            return (
                <CardNewsPage berita={item} />
            )
        })
    }

    renderCarousel = () => {
        let temp = [...this.state.news]
        temp.splice(3, temp.length - 3)
        console.log('news', this.state.news)
        console.log('temp', temp)
        return temp.map((item, index) => {
            if (index == 0) {
                return (
                    <div className="carousel-item active ">
                        <CarouselComp headline={item} />
                    </div>
                )
            }
            return (
                <div className="carousel-item">
                    <CarouselComp headline={item} />
                </div>
            )
        })
    }

    render() {
        if (this.state.reload) {
            this.getNews()
        }
        return (
            <div>
                <div className="nav-scroller py-1 mb-1">
                    <nav className="nav d-flex flex-nowrap justify-content-between" style={{ overflow: "auto" }}>
                        {this.renderCategory()}
                    </nav>
                </div>
                <div id="carousel-home" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        {this.renderCarousel()}
                    </div>
                    <a className="carousel-control-prev" style={{ marginLeft: -50 }} href="#carousel-home" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon rounded" style={{ backgroundColor: "gray" }} aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" style={{ marginRight: -50 }} href="#carousel-home" role="button" data-slide="next">
                        <span className="carousel-control-next-icon rounded" style={{ backgroundColor: "gray" }} aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <CardNews berita={[this.state.news[3], this.state.news[4]]} kategori={this.state.selectedCategory} />
                <div className="row">
                    <div className="col-md-8">
                        {this.renderNews()}
                    </div>
                    <div className="col-md-4">
                        <InfoCorona/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;