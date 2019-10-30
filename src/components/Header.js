import React, { Component } from 'react';

class Header extends Component {
    render(){
        console.log(this.props)
        var price,id;
        id = this.props.match.params.id;
        price = this.props.match.params.price;
        console.log(price);
        return(
            <form>
                <div class="form-group">
                    <label for="formGroupExampleInput">Name</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter your name"/>
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Model</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Enter the model of product"/>
                </div>

                <div class="form-group">
                    <label for="formGroupExampleInput2">RC/IMEI Number</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder=""/>
                </div>


                <button className="btn btn-primary"
                          onClick={() => {
                            this.props.purchaseProduct(id,price)
                          }}
                        >
                          Buy
              </button>
            </form>  
            
            
        )
    }


}
export default Header;