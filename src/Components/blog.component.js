import React from 'react';
import Four04 from './404.component';

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: "loading",
      valid: false,
      contentState: null,
      mainBlogPhoto: "",
      blogPhotos: null,
      title: "",
      author: "",
      date: null
    }
  }

  componentDidMount() {
    document.title = 'CWEN Blog';
    let query = this.props.location.search;
    let baseURL = "http://localhost:4000/"
    let id = ""
    let author = ""


    // getting the name and ID
    let authorIndex = query.indexOf("author=");
    let ampIndex = query.indexOf("&");
    let idIndex = query.indexOf("id=");

    if(authorIndex != -1 && ampIndex != -1 && idIndex != -1){
      console.log("hi");
      this.setState({
        valid: true,
      })
      id = query.substring(idIndex + "id=".length);
      author = query.substring(authorIndex + "author=".length, ampIndex);
      console.log("author: " + author);
      console.log("id: " + id);

      let contentURL = baseURL + "getBlogContent?author=" + author + "&id=" + id;
      let mainPhtoURL= baseURL + "getBlogMainPhoto?author=" + author + "&id=" + id;
      let photosURL = baseURL + "getBlogPhotos?author=" + author + "&id=" + id;

      this.setState({
        status: "done"
      })
      fetch(contentURL)
        .then((response) => response.json())
        .then((content) => {
          let date = new Date();


          console.log(content.sqlStuff[0].lastUpdated);
          this.setState({
            contentState: content,
            author: content.sqlStuff[0].author,
            title: content.sqlStuff[0].title,
            date: content.sqlStuff[0].lastUpdated,
          })
        })

      fetch(mainPhtoURL)
        .then((response) => response.text())
        .then((mainPhoto) => {
          if(mainPhoto === "unfound"){
            // no blog post with the give characteristics
            this.setState({
              valid: false
            })
          }else{
            this.setState({mainBlogPhoto: mainPhoto})
          }
          
        })

      fetch(photosURL)
        .then((response) => response.json())
        .then((photos) => this.setState({blogPhotos: photos}))
    }else{
      console.log("hi");
      this.setState({
        status: "done"
      })
    }
  }

  render() {
    if(this.state.status === "loading"){
      return <p id = "loading">loading...</p>
    }

    if(!this.state.valid){
      return <Four04/>;
    }else{
      console.log(this.state.date);
      return <div id = "blog">
        <h1>{this.state.title}</h1>
        <h4>By {this.state.author}</h4>
        <h4>Published {this.state.date}</h4>
        <img src = {this.state.mainBlogPhoto} alt = {this.state.title}/>
      </div>
    }
    
  }
}


export default Blog;