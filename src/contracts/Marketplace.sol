pragma solidity 0.5.8;

contract Marketplace{
    string public name;

    uint public productCount = 0;
    uint public ucount=0;
    mapping(uint => Product) public products;

    struct User{
        uint id;
        address[] owner;
    }

    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
        
        
    }
    

    event productCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event productPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Insurance Using BlockChain";
    }

    function createProduct(string memory _name,uint _price) public {
        require(bytes(_name).length>0);

        require(_price > 0);
        
    
        productCount++;

        products[productCount] = Product(productCount,_name,_price,msg.sender,false);
        //emit productCreated(productCount,_name,_price,msg.sender,false);
    }

    function purchaseProduct(uint _id) public payable {
        //fetch the product
        Product memory _product = products[_id];
        //fetch the owner
        address payable _seller = _product.owner;        
        //make sure product is valid
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);

        //purchase it
        _product.owner = msg.sender;
        //marked as purchased
        _product.purchased = true;

        //update the product    
        products[_id] = _product;
        //pay the seller by sending them ether
        address(_seller).transfer(msg.value);
        //trigger an event
        emit productPurchased(productCount,_product.name,_product.price,msg.sender,true);
    }





}