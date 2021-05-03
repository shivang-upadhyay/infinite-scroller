import React, {Component} from 'react';
import axios from "axios"

class InfiniteSpace extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        photos: [],
        timerId: null
      };

      window.onscroll = () => {
        this.debounceFunction();
      };
    }

    componentDidMount = () => {
        this.getPhotos()
    }

      debounceFunction = () => {
        let { timerId } = this.state;
        clearInterval(timerId);
    
        timerId = setTimeout(() => {
          this.getData();
        }, 500);


        this.setState({ timerId });
      };

      getData = () => {   
          if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            this.getPhotos();
          }
      }
    
      getPhotos(page) {
        this.setState({ loading: true });
        axios
          .get(
            `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
          )
          .then(res => {
            this.setState({ photos: [...this.state.photos, ...res.data] });
            this.setState({ loading: false });
          });
      }

    render() {
       // Additional css
    const loadingCSS = {
        height: "100px",
        margin: "30px"
      };
  
      // To change the loading icon behavior
      const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
  
      return (
        <div className="container">
          <div style={{ minHeight: "800px" }}>
            {this.state.photos.map((user, index) => (
              <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                {index + 1}
                <img src={user.url} height="100px" width="500px" />
              </div>
            ))}
          </div>
        </div>
      );
    }

  }

export default InfiniteSpace;