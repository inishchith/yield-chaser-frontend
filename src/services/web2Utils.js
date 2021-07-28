export default class Web2Utils {

    constructor() {}

    isSubscribed() {
        // TODO: API CALL
        // true {status: true, data: []}
        // false {status: false, }
    }

    unsubscribe() {
        // TODO: Unsubscribe 
    }

    subscribe() {
        // TODO: Subscribe UPSERT

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