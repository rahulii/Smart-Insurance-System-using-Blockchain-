import React, { Component } from 'react';
import axios from 'axios';

class Claim extends Component {
    state = {
        pname : '',
        owner: '',
        description : '',
        
    }
    handleFormSubmit( event ) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('pname', this.props.match.params.name) 
        formData.append('owner', this.props.account)
        formData.append('description', this.state.description) 
        axios({
            method: 'POST',
            url: 'http://localhost/claims.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then((response) => {
            //handle success
            console.log(response);
            this.props.history.push("/main")       
        })
        .catch(function (response) {
            //handle error
            console.log(response)
            
            
        });
    }
    render(){
        return(
            <div>
                <form>
                <h1>Insurance</h1>
                <br/>
                <h2>Claim Self-Service</h2>
                <br/>
                <h3>File a Theft Claim</h3>
                

                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                    onChange={e => this.setState({ description : e.target.value })}>
                    </textarea>
                </div>
                <button type="submit" class="btn btn-primary" onClick={e => this.handleFormSubmit(e)}>Submit</button>
                </form>

            </div>
        )

    }


}
export default Claim;