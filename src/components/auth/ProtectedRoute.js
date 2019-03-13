import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component: Component, loggedInUser, ...rest}) => {
  return (
    <Route {...rest} render={props => {
      if(rest.render == undefined){
        return loggedInUser !== null ? <Component {...props} /> : <Redirect to={{pathname: '/', state: {from: props.location}}} />
      } else{
        return loggedInUser !== null ? rest.render() : <Redirect to={{pathname: '/', state: {from: props.location}}} />
      }
      
    }}/>);
}

export default ProtectedRoute;