import React, {Component} from "react";
import Auth from "./Auth";
import Public from "./Public";
import {AUTH_COOKIE_NAME} from "../constants";


class AppRouter extends Component { 
    constructor(props) {
        super(props);
        this.state = {
          authenticated: false
        };
    }

    getCookie = (cookieName) => {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const allCookies = decodedCookie.split(';');
        for(let i = 0; i <allCookies.length; i++) {
          let cookieVal = allCookies[i];
          while (cookieVal.charAt(0) == ' ') {
            cookieVal = cookieVal.substring(1);
          }
          if (cookieVal.indexOf(name) == 0) {
            return cookieVal.substring(name.length, cookieVal.length);
          }
        }
        return "";
    }

    render() {
        const authCookie = this.getCookie(AUTH_COOKIE_NAME)
        if(authCookie) {
            return <Auth />
        } else {
            return <Public />
        }
    }
}

export default AppRouter;