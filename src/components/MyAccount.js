import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class MyAccount extends Component {

    render() {
        return(
            <div>
            <a class="btn btn-primary" href="/" role="button">Back</a>
                <h2>Purchased Insurance</h2>
                { this.props.products.map((product,key) => {
            return(
              <div>
              { product.purchased && this.props.account === product.owner ? (
                <div class="row" key={key}>
                <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                <span class="card-title">{product.name}</span>
                <p>Current Ownership : { product.owner }</p>
                <p>Price : {window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</p>
                </div>
                <div class="card-action">
                <button className="btn btn-primary"
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Claim
              </button>
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

export default withRouter(MyAccount);