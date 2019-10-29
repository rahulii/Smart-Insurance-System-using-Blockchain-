import React,{ Component } from 'react';
import './App.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
class Register extends Component {
    state = {
      name: '',
      email: '',
      password: '',
      
  }
  handleFormSubmit( event ) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('id', this.props.account) 
        formData.append('password', this.state.password) 
        axios({
            method: 'POST',
            url: 'http://localhost/register.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            console.log(response)
            if(response.data.redirect==true)
                this.props.history.push("/main")
        })
        .catch(function (response) {
            //handle error
            console.log(response)
        });
    }
    

    render(){
        console.log(this.props.account);
        return (
            
        <form>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}/>
                

            <label>Email</label>
            <input type="email" name="email" value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}/>

            <label>Password</label>
            <input type="text" name="password" value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}/>

            <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Register" />
        </form>
        );
    }
}


export default withRouter(Register);