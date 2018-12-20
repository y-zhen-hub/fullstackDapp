pragma solidity ^0.4.24;


contract CampainFactory {

    address[] public deployedCampain;  //存储所有部署的campaign

    function createCampain(uint mininum) public {
        address newCampain = new Campain(mininum, msg.sender);
        deployedCampain.push(newCampain);
    }

    function getDeployeddCampain() public view returns (address[]) { // 动态数组返回只返回一个，需要用函数来获取
        return deployedCampain;
    }
}


contract Campain {

    struct Request {
        string  description; //描述
        uint  value;  //申请总金额
        address  recipient; //受益人的地址
        bool  complete;  //项目是否完成
        uint  approvalCount; //投资者同意的数量
        mapping (address => bool) approvers;  //投资人的意见
    }

    Request[] public requests;  //存储请求
    address public manager; //管理者地址
    uint public minimumContribution; //投资最小金额
    mapping (address => bool) public approvers; //投资人---是否投资--投资人是否进行投资
    uint public approvesCount;     //投资申请者数量

    modifier restrict {
        require(msg.sender == manager);
        _;
    }

    constructor (uint minimum, address _address) public {
        minimumContribution = minimum;
        manager = _address; //增强扩展性
    }

    function contribute() public payable {  //投资人投资
        require(msg.value > minimumContribution);
        // approvers.push(msg.sender);
        approvers[msg.sender] = true; //将投资人地址存储
        approvesCount++;  //投资者数量会增加
    }

    function createRequest(string _description, uint _value, address _addr) public restrict {//管理者创建一个请求
        Request memory newrequest = Request({ //函数体内创建的结构体，类型为memory
            description : _description,
            value : _value,
            recipient : _addr,
            complete : false,
            approvalCount : 0
        });
        requests.push(newrequest); //在请求列表中添加新的请求
    }

    function approveRequest(uint index) public {//投资者是否支持请求
        Request storage request = requests[index];
        require(approvers[msg.sender]); //只有投资后才能进行投票
        require(!request.approvers[msg.sender]); //只有没有投票的投资者才能进行投票，
        request.approvers[msg.sender] = true; //默认同意申请
        request.approvalCount++; //当前同意请求的人数
    }

    function finalizeRequest(uint index) public restrict  payable { //请求是否成功
        Request storage request = requests[index];
        //请求的描述/请求的总金额/受益人地址
        require(request.approvalCount > approvesCount / 2);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(uint, uint, uint, uint, address) {
        return (minimumContribution, address(this).balance, requests.length, approvesCount, manager);
    }

    function getRequestCount() public view returns(uint) {
        return requests.length;
    }

}
