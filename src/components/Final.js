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
                    <div>
                        <button>Reimburse</button>
                    </div>
                    </div>
                    )
                })}
            </div>
        )
    }
}
export default Final;