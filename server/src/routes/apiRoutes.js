const { providers, utils } = require('ethers');
const env = require('../../env');

const provider = new providers.JsonRpcProvider(env.INFURA_URL);

async function balance(address) {
    const result = await provider.getBalance(address);
    //console.log(utils.formatEther(result));
    return utils.formatEther(result);
}

async function latestBlocks(limit = 5) {
    const blocks = [];

    const blockNumber = await provider.getBlockNumber();
    for (let i = 0; i < limit; i++) {
        console.log("blockNumber", blockNumber);
        
        const block = await provider.getBlock(blockNumber-i);
        console.log(block);
        blocks.push(block);        
    }

    return {blocks: blocks, latestBlock: blockNumber};
}

async function latestBlockNumber() {
    const blockNumber = await provider.getBlockNumber();

    return blockNumber;
}

async function getBlockTransactions(blockNumber) {
    const block = await provider.getBlockWithTransactions(blockNumber);
    console.log(block);

    return block;
}

async function getBlock(blockNumber) {
    const block = await provider.getBlock(blockNumber);
    console.log(block);

    return block;
}


async function getTransaction(txHash) {
    const tx = await provider.getTransaction(txHash);
    console.log(tx);
}

async function isAddressCode(address) {
    const code = await provider.getCode(address);

    if(code==="0x") {
        return true;
    }
    else {
        return false;
    }
}
//getLatestBlocks();

//getTransaction("0x9fb9dbf2d999e62b7ad8b2c2648c9d63762fdcbfc493ee679e699d351817e7bc");

//addressCode("0x31B98D14007bDEe637298086988A0bBd31184523");

module.exports = function (app)  {
  
    app.get('/get-balance/:address', async function(req, res) {
        const sum = await balance(req.params.address);
        console.log('sum', sum);
        res.send({sum});
    });

    app.get('/latest-blocks', async function(req, res) {
        const blocks = await latestBlocks();
        console.log(blocks);
        res.send(blocks);
    });

    app.get('/block/:height', async function(req, res) {
        const blocks = await getBlock(parseInt(req.params.height));
        console.log(blocks);
        res.send(blocks);
    });

}