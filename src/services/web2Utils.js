const axios = require('axios');

export default class Web2Utils {

    constructor() {
        this.baseUrl = "https://ychase.herokuapp.com/wallet";
    }

    async isSubscribed(walletAddress) {
        try {
            let result = await axios.get(`${this.baseUrl}/${walletAddress}`);
            return {
                status: true,
                assets: result.data.assets
            }
        } catch(e) {
            return { status: false };
        }
    }

    async subscribe(assets, walletAddress) {
        let payload = {
            "walletAddress": walletAddress,
            "assets": assets,
        }

        try {
            let result = await axios.post(`${this.baseUrl}/${walletAddress}`, payload);
            return {
                status: true,
                assets: result.data.assets
            }
        } catch(e) {
            return { status: false };
        }
    }

    async unsubscribe(walletAddress) {
        try {
            let result = await axios.delete(`${this.baseUrl}/${walletAddress}`);
            return {
                status: true,
                assets: result,
            }
        } catch(e) {
            return { status: false };
        }
    }

    getSupportedAssets() {

        return [
            {
                id: 1,
                name: "ETH",
                selected: false,
            },
            {
                id: 2,
                name: "YFI",
                selected: false,
            },
            {
                id: 3,
                name: "MATIC",
                selected: false,
            },
            {
                id: 4,
                name: "WETH",
                selected: false,
            },
            {
                id: 5,
                name: "DAI",
                selected: false,
            },
            {
                id: 6,
                name: "CRV",
                selected: false,
            },
            {
                id: 7,
                name: "WBTC",
                selected: false,
            },
            {
                id: 8,
                name: "BAL",
                selected: false,
            },
            {
                id: 9,
                name: "BUSD",
                selected: false,
            },
            {
                id: 10,
                name: "USDC",
                selected: false,
            },
            {
                id: 11,
                name: "MKR",
                selected: false,
            },
            {
                id: 12,
                name: "AAVE",
                selected: false,
            }
        ]
    }
}