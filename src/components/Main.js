import React, { Component } from 'react';

class Main extends Component {

  render() {
    console.log(this.props.products);
    var seller;
    seller = this.props.account == '0xF4EE82A8f98a92d328D63F60c4a6a6f8646Ab985' ? true : false;
    console.log(seller)
    return (
    <div id="content">
      {seller ? (
        <div>
        <h1>Add Product</h1>
        <form onSubmit = {(event) => {
        event.preventDefault()
        const name = this.productName.value
        const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
        this.props.createProduct(name,price)    
            
        }}>
        <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
        </div>
        <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <a href="/reimburse">View Pending Claims</a>
        </div>
        ) : (
          <div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Buy Insurance</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="/buy" class="btn btn-primary">Buy</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Claim Insurance</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="/myaccount" class="btn btn-primary">My Account</a>
      </div>
    </div>
  </div>
</div>
            )
          }
          
        </div>
        )}
        
        
        
    
    
  
}
export default Main