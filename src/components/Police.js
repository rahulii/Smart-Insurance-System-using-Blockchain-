import React, { Component } from 'react';
import axios  from 'axios';
class Police extends Component {
    state = {
        account:'',
        claims:[]
    }
    handleFormSubmit( event,id ) {
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
    componentDidMount(){
        let formData = new FormData();
        formData.append('account', this.props.account)
        axios({
            method: 'POST',
            url: 'http://localhost/police.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then((response) => {
            //handle success
            console.log(response);
            this.setState({claims : response.data});
            console.log(this.state.claims);       
        })
        .catch(function (response) {
            //handle error
            console.log(response)
            
            
        });
    }

    render(){
        return(
            <div className="">
                <h1 className="display-4">Police</h1>
                <div>
                    {this.state.claims.map((claim) => {
                        return(
                        <div className="border">
                            <div className="container">
                            <h2 className=""> Theft Claim </h2>
                            Product Name : {claim.pname}
                            <br/>
                            Owner : {claim.owner}
                            <br/>
                            Description : {claim.description}
                            <br/>
                            <button type="button" class="btn btn-info"
                            onClick={e => this.handleFormSubmit(e,{claim.id})}>
                            Accept</button>
                            <button type="button" class="btn btn-danger">Reject</button>
                            </div>
                        </div>)
                        })}

                </div>
            </div>
                    )
    }

}
export default Police;