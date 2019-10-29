import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
class Buy extends Component {
    render(){
        if (this.props.redirect )
            return (<Redirect to = "/myaccount"/>)
        return(
            <div className="container">
           <a class="btn btn-primary" href="/main" role="button">Back</a>
          
          { this.props.products.map((product,key) => {
            return(
              <div key={key}>
              { !product.purchased ? (
            <div class="row" >
            <div class="col s12 m6">
            <div class="card blue-grey darken-1">
            <div class="card-content white-text">
            <span class="card-title">{product.name}</span>
            <p>Current Ownership : { product.owner }</p>
            <p>Price : {window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</p>
            </div>
            <div class="card-action">
            <a href={'/purchase/' + product.id + "/" + product.price }>Buy Now</a>
            </div>      
            
            
          </div>
          </div>
          </div>
              ) : (null) }
            
          </div>
            )
          })}

        </div>
        
        )
    }
}
export default withRouter(Buy);