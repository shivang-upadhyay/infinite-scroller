import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {AUTH_COOKIE_NAME} from "../constants";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      userName: "",
      password: ""
    };
  }

  userNameChanged = (event) => {
      this.setState({userName: event.target.value})
  }

  passwordChanged = (event) => {
    this.setState({password: event.target.value})
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { userName, password } = this.state;
    const valid = this.validateDetails();

    if(valid) {
        if(userName === "foo" && password === "bar") {
            this.saveAuthCookie();
            this.navigateToHome()

            window.location.reload();
        } else {
            alert('User does not exist');
        }
    }
    
  };

  saveAuthCookie = () => {
      document.cookie = `${AUTH_COOKIE_NAME}=true`
  }

  validateDetails = () => {
    const { userName, password } = this.state;
    if(!userName) {
        alert('Please enter username.');
        return false;
    } else if(!password) {
        alert('Please enter password.');
        return false;
    }

    return true;
  }

  navigateToHome = () => {
      const { history } = this.props;

      history.push("/home")
  }

  renderLoginForm = () => {
      const { userName ="", password = "" } = this.state;
      return(
        <form onSubmit={this.handleSignIn}>
            <div>
            <label>
             Username
                <input type="text" name="username" 
                style={styles.inputBox}
                value={userName} onChange={this.userNameChanged}/>
            </label>
            </div>
           
            <div>
            <label>
             Password
                <input type="password" name="password" 
                style={styles.inputBox}
                value={password} onChange={this.passwordChanged}/>
            </label>
            </div>

            <input type="submit" value="Submit" style={{ marginTop: "10px", 
            width: "100px", height: "40px", borderRadius: "10px"}}/>
        </form>
      )
  }

  render() {
    return(this.renderLoginForm())
  }
}

const styles = {
    inputBox: {
        height: "40px",
        width: "300px",
        borderRadius: "10px",
        margin: "8px",
        fontSize: "20px"
    }
}

export default withRouter(SignIn);
