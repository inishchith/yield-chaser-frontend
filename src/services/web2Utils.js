const axios = require('axios');

export default class Web2Utils {

    constructor() {
        this.baseUrl = "https://salty-escarpment-75760.herokuapp.com/wallet";
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

        return {
            "ETH": {
                selected: false,
            },
            "YFI": {
                selected: false,
            },
            "MATIC": {
                selected: false,
            },
            "WETH": {
                selected: false,
            },
            "DAI": {
                selected: false,
            },
            "CRV": {
                selected: false,
            },
            "WBTC": {
                selected: false,
            },
            "BAL": {
                selected: false,
            },
            "BUSD": {
                selected: false,
            },
            "USDC": {
                selected: false,
            },
            "MKR": {
                selected: false,
            },
            "AAVE": {
                selected: false,
            }
        }
    }
}