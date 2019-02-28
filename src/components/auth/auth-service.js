import axios from 'axios';

class AuthService{
  
  constructor(){
    let service = axios.create({
      baseURL: `http://localhost:5000/api`,
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, password) => {
    return this.service.post('/signup', {username, password})
            .then(res => res.data);
  }

  loggedin = () => {
    return this.service.get('/loggedin')
            .then(res => res.data);
  }

  login = (username, password) => {
    return this.service.post('/login', {username,password})
      .then( res => res.data);
  }

  logout = () => {
    return this.service.post('/logout', {})
            .then(res => res.data);
  }
}

export default AuthService;