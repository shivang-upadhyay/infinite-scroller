import React, {Component} from 'react';
import axios from "axios";

import { withRouter } from "react-router-dom";
import { AUTH_COOKIE_NAME } from '../constants';

class InfiniteSpace extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        photos: [],
        users: [],
        timerId: null,

        loading: true,
      };

      window.onscroll = () => {
        this.debounceFunction();
      };
    }

    componentDidMount = () => {
        this.getUsersData()
    }

      debounceFunction = () => {
        this.setState({loading: true})
        let { timerId } = this.state;
        clearInterval(timerId);
    
        timerId = setTimeout(() => {
          this.getData();
        }, 1000);


        this.setState({ timerId });
      };

      getData = () => {   
          if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            this.getUsersData();
          }
      }
    
      getUsersData = async(page) => {
        try{
          const photoResponse = await axios.get(
              `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
            );
          
          const {data: photosList = []} = photoResponse || {};
  
          const userReponse = await  axios
            .get(
              `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=10`
            );
  
          const { data: usersList = []} = userReponse || {}
  
          this.setState({users: [...this.state.users, ...usersList], 
            loading: false,
            photos: [...this.state.photos, ...photosList]})
        } catch(err) {
          alert("Error in getting users data. Please try again.");
          this.setState({loading: false})
        }
       
      }

      signOut = () => {
        document.cookie = `${AUTH_COOKIE_NAME}=`;
        window.location.reload();
      }

      renderSignOut = () => {
        return(
          <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
            <button onClick={this.signOut} style={{width: "100px", height: "40px"}}>
              Sign Out
            </button>
          </div>
        )
      }

      renderLoading = () => {
        return(
          <div style={{display: "flex", 
          width: "100%",
          marginBottom: "10px",
          justifyContent: "center", 
          alignItems: "center"}}>
            <div className="loader" ></div>
          </div> )
      }

    render() {  
      const { users = [], photos = [], loading = false} = this.state;
      return (
        <div style={{width: "100%", height: "100%"}}>
          {this.renderSignOut()}
          <div style={{ minHeight: "800px" }}>
            {users.map((user, index) => {
              const {name = "", id } = user || {};
              let url = null;
              if(index < photos.length) {
                const photo = photos[index];
                const { url: photoUrl = null } = photo || {};
                url = photoUrl
              }
              return(
              <div key={id} style={{display: "flex", height:"100px", width:"50%", 
              justifyContent: "flex-start", alignItems: "center", borderWidth: 1,
              padding: 10,
              margin: 10,
              borderRadius: 8,
              overflow: "hidden",
              whiteSpace:"nowrap",
              textOverflow:"ellipsis",
              minWidth: "100px",
              borderStyle: "solid",
               borderColor: "white"}}>
                <img src={url} height="60px" width="60px" style={{borderRadius: "30px", marginRight: 10}}/>
                {name}
              </div>
              )
              
            })}

            {loading && this.renderLoading()}
          </div>
        </div>
      );
    }

  }

export default withRouter(InfiniteSpace);