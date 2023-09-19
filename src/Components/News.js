import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.Slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    
  }

  async updateNews() {
    this.props.setProgress(15);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(45);
    let parsedData = await data.json()
    this.props.setProgress(75);
    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47935c4764e6450284691b13dacf1b57&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(data);
    // this.setState({
    //   articles: parsedData.articles, totalResults: parsedData.totalResults,
    //   loading: false,
    // })
    this.updateNews();
  }

  // handlePrevClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47935c4764e6450284691b13dacf1b57&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  //   // this.setState({page: this.state.page - 1});
  //   // this.updateNews();
  // }

  // handleNextClick = async () => {
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize))) {


  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47935c4764e6450284691b13dacf1b57&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parsedData = await data.json()
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false
  //     })
  //   }
  //   // this.setState({page: this.state.page + 1});
  //   // this.updateNews();
  // }

  fetchMoreData = async()=>{
    this.setState({page:this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47935c4764e6450284691b13dacf1b57&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      totalResults:parsedData.articles ,
      articles: this.state.articles.concat(parsedData.articles),
    })
  }


  render() {

    return (
      <>
          <div className="container main" style={{backgroundColor:'#f6f5f5'}}>
          <center className='my-4'><h2>News shorts-{(this.props.category)}</h2></center>
          <hr />
          {this.state.loading && <Spinner />}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader ={<Spinner />}
          >
            <div className="container" >
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} newsUrl={element.url} imageUrl={element.urlToImage}
                    author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
            </div>
          </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}

</div>
      </>
    )
  }
}

export default News
