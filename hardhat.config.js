require("@nomiclabs/hardhat-waffle");
const fs = require('fs')
const projectId = "3ef17ef5bf7340ab9d97f938b3c4019c"




// rinkeby
module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/3ef17ef5bf7340ab9d97f938b3c4019c",
      accounts: [privateKey]
       // nft deployed to: 0xe5F2576859A75D2164A28fC232D517C839382bBC
      //nftMarket deployed to: 0xE46c78165d804b3b6b9B4533F4bf2e2c81DdC3fe
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    
    mumbai: {
      // Infura
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey]

      //url: "https://rpc-mumbai.matic.today",
      //accounts: [privateKey]
    },
    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
    
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
















/*
module.exports = {
  defaultNetwork: "hardhat",
  network: {
    hardhat: {
      chainId: 1337
    },
    
    matic:{
      url: "https://rpc-mumbai.maticvigil.com",
      accounts:[privateKey]
    },

    mumbai:{
      url: "https://rpc-mumbai.matic.today",
      accounts:[privateKey]

      //infura
      //url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      //accounts:[privateKey]
    },

    mainnet:{
      url:`https://mainnet.infura.io/v3/{projectId}`,
      accounts:[privateKey]
    }
  },
  solidity: "0.8.4",
};
*/







































































































const privateKey = "490adcfc5eea7ec384f298e9df03a24493b368b2f4ecb4547f866c1b2ba731d8"