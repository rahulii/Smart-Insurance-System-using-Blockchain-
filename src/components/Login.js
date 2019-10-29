import React,{ Component } from 'react';
import './App.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class Login extends Component {
    state = {
        email: '',
        password: '',
        redirect : false,
    }
    handleFormSubmit( event ) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('email', this.state.email) 
        formData.append('password', this.state.password) 
        axios({
            method: 'POST',
            url: 'http://localhost/signin.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then((response) => {
            //handle success
            console.log(response);
            if(response.data.redirect==true)
                this.props.history.push("/main")       
        })
        .catch(function (response) {
            //handle error
            console.log(response)
            
            
        });
    }

    render(){
        return(
            <div className="">
                <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })} />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" 
                    value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}/>
                </div>

                <button type="submit" class="btn btn-primary" onClick={e => this.handleFormSubmit(e)}>Submit</button>
                <a href="/register">Not a member?Sign Up!</a>
                </form>
            </div>
        )
    }
  
}
export default withRouter(Login);