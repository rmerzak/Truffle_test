const VendingMachine = artifacts.require("VendingMachine");

contract("VendingMachine", (accounts) => {
    before(async () => {
        instance = await VendingMachine.deployed();
    })
    it('ensure that the starting balance is 100', async () => {
        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 100,'the initial balance should be 100 donuts');
    })
    it('ensure that the sbalance of vending machine can be abdated', async () => {
        await instance.restock(100);
        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 200, 'the initial balance should be 200 donuts');
    })
    it ('allows donuts to be purchased', async () => {
        await instance.purchase(1, {from: accounts[0], value: web3.utils.toWei('3','ether')});

        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 199, 'the balance should be 199 donuts');
    })
})