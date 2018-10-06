pragma solidity ^0.4.17;

contract Inbox {
    /// Defining message variable below automatically creates a public function
    /// which can be called ie getMessage is unnecessary duplication in this case.
    /// Calling a function is free, instant, and can return data. However storing data costs.
   
    string public message;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    /// Sending a transaction to a function can modify contract data, creates a transaction hash, & costs money.
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    function getMessage() public view returns (string) {
        return message;
    }
}

