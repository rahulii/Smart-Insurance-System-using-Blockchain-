import React, { Component } from 'react';

class Front extends Component {
    render(){
        return(
            
            <div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Buy Insurance</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="/main" class="btn btn-primary">Buy</a>
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
}

export default Front;