import React, { Component } from 'react';
import logo from '../logo.png';
import Web3 from 'web3'
import './App.css';
import Navbar from './Navbar'
import Marketplace from '../abis/Marketplace.json';
import Main from './Main';
import { BrowserRouter,Route} from 'react-router-dom';
import MyAccount from './MyAccount';
import Buy from './Buy';
import Regsiter from './Register';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import Claim from './Claim';
import Police from './Police';
import Final  from "./Final";
class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
    console.log(this.context)
  }

  async componentDidMount() {
    console.log("Hey");
    console.log(this.context)
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum,null,{transactionConfirmationBlocks: 1})
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    //load account
    
    const accounts = await web3.eth.getAccounts()
    
    this.setState({
      account : accounts[0],
      redirect : false
    })
    //load contract
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) 
    {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      this.setState({productCount})
      //Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      
      this.setState({ loading : false })
      console.log(this.state.products)
    }
  }

  constructor(props){
    super(props)
    this.state = {
      account : '',
      productCount : 0,
      products : [],
      loading : true
    }
    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
    this.reimburse = this.reimburse.bind(this)
  }
  createProduct(name,price){
    this.setState({ loading:true })
    this.state.marketplace.methods.createProduct(name,price).send({ from : this.state.account })
    .once('receipt',(receipt) => {
      console.log(receipt)
      this.setState({ loading : false });
      console.log("Product")
    })
  }

  purchaseProduct(id,price){
    this.setState({ loading:true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from : this.state.account , value:price })
    .then(() => {
      this.setState({ loading : false })
      this.setState({ redirect :true })
    })
    
  }
  reimburse(id,price){
    this.setState({ loading:true })
    this.state.marketplace.methods.reimburse(id).send({ from : this.state.account , value:price })
    .then(() => {
      this.setState({ loading : false })
      this.setState({ redirect :true })
    })
    
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        
      <Navbar account = { this.state.account }/ >
        <div className="container-fluid mt-5">
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading ? (
                <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-green-only">
                <div class="circle-clipper left">
                <div class="circle"></div>
                </div><div class="gap-patch">
                <div class="circle"></div>
                </div><div class="circle-clipper right">
                <div class="circle"></div>
          </div>
        </div>
      </div> 
                  ) :
                   (
                <div>
                <Route exact path="/main" render={(props) => <Main {...props} account = {this.state.account} 
                products = {this.state.products}
                createProduct = {this.createProduct}
                purchaseProduct= {this.purchaseProduct}
                account = { this.state.account }
                 />  } />
                
                <Route exact path="/myaccount" render={(props) => <MyAccount {...props} products = {this.state.products} account = { this.state.account } /> } />
                <Route exact path="/buy" render={(props) => <Buy {...props} products = {this.state.products}
                createProduct = {this.createProduct}
                purchaseProduct= {this.purchaseProduct}
                redirect = { this.state.redirect } /> } />
                <Route exact path = "/register" render={(props) => <Regsiter {...props}  account = { this.state.account } /> } />
                <Route exact path = "/" component = {Login} />

                <Route path = "/purchase/:id/:price" render={(props) => <Header {...props}
                purchaseProduct= {this.purchaseProduct}
                redirect = { this.state.redirect } /> } />

                <Route exact path = "/claim/:name" render={(props) => <Claim {...props} account = { this.state.account } /> } />

                <Route exact path = "/police" render={(props) => <Police {...props} account = { this.state.account } /> } />
                
                <Route exact path ="/reimburse" render={(props) => <Final {...props} account = { this.state.account }
                reimburse = { this.reimburse } /> } />
                </div>  
              )

              }
              
            </main>
          </div>
        </div>  
        </div>
      </div>
      </BrowserRouter>
    );
  }
}


export default withRouter(App);
