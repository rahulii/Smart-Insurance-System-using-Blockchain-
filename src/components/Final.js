import React, { Component } from 'react';
import axios  from 'axios';

class Final extends Component{
    
    state = {
        claims : []
    }
    componentDidMount(){
        axios({
            method: 'GET',
            url: 'http://localhost/reimburse.php',
        })
        .then((response) => {
            //handle success
            console.log(response);
            this.setState({ claims : response.data })
                   
        })
        .catch(function (response) {
            //handle error
            console.log(response)
            
            
        });
    }
    render(){
        return(
            <div>
                {this.state.claims.map((claim) => {
                    return(
                    <div>
                    <div>
                        Insurance Name : {claim.pname}
                    </div>
                    <div>
                        File No : {claim.fileNo}
                    </div>
                    <div>
                        Owner : {claim.owner}
                    </div>
                    <div className="form-group mr-sm-2">
                       <form onSubmit = {(event) => {
                        event.preventDefault()
                        const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                        this.props.reimburse(claim.id,price)
                    }}> 
                <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Reimbursement Price"
              required />
                        <button type="submit">Reimburse</button>
                    
                    </form>
                    </div>
                    </div>
                    )
                })}
            </div>
        )
    }
}
export default Final;