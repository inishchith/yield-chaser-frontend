import Portis from "@portis/web3";
import Web3 from "web3";
import epnsABI from '@/assets/epnsABI.json';

export default class Web3Utils {
    constructor() {
        this.portis = new Portis(process.env.VUE_APP_DAPP_ID, process.env.VUE_APP_NETWORK);
		this.web3 = new Web3(this.portis.provider);

        // LISTENERS
        this.userLoggedIn = false;
        this.walletAddress = null;

		this.portis.onLogout(() => {
			console.info("User logged out");
		});
    }

    async login() {
        /* TODO:
            - This button is supposed to be generic. should accept a provider via user.
                hence, push this method to root
        */

        await this.web3.eth.getAccounts();

        let that = this;
        let { status } = await new Promise((resolve, reject) => {
            that.portis.onLogin((walletAddress, email, reputation) => {
                console.info("User logged in", walletAddress, email, reputation);

                localStorage.setItem("walletAddress", walletAddress);
                that.userLoggedIn = true;
                that.walletAddress = walletAddress;

                resolve({status: true})
            });

            that.portis.onError(error => {
                console.error(error);
                reject({status: false})
            });
        });

        if (status) {
            return true;
        } else {
            return false;
        }
    }

    logout() {
        // TODO: check if this is a promise?
        this.userLoggedIn = false;
        this.portis.logout();
        localStorage.removeItem("walletAddress");
    }

    isUserLoggedIn() {
        return this.userLoggedIn;
    }

    getWalletAddress() {
        return this.walletAddress;
    }

    openWallet() {
        this.portis.showPortis();
    }

    async checkUserLoggedIn() {
        let { result } = await this.portis.isLoggedIn();
        this.userLoggedIn = result;
        if (result) {
            this.walletAddress = localStorage.getItem("walletAddress");
        }
        return result;
    }

    async signTransaction(tx) {
        const signedTx = await this.web3.eth.signTransaction(tx, tx.from);
        console.debug(signedTx)
        const sentTx = this.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

        const result = await new Promise((resolve, reject) => {
            sentTx.on("receipt", receipt => {
                resolve(receipt);
            });
            sentTx.on("error", error => {
                resolve(error);
            })

            sentTx.on("other", error => {
                reject(error);
            })
        });
        return result;
    }

    async subscribe() {
        const myContract = new this.web3.eth.Contract(epnsABI, process.env.VUE_APP_CONTRACT_ADDRESS);
        const tx = {
            from: this.walletAddress,
            to: process.env.VUE_APP_CONTRACT_ADDRESS,
            data: myContract.methods.subscribe(process.env.VUE_APP_CHANNEL_ADDRESS).encodeABI()
        };
        return await this.signTransaction(tx);
    }

    async unsubscribe() {
        const myContract = new this.web3.eth.Contract(epnsABI, process.env.VUE_APP_CONTRACT_ADDRESS);
        const tx = {
            from: this.walletAddress,
            to: process.env.VUE_APP_CONTRACT_ADDRESS,
            data: myContract.methods.unsubscribe(process.env.VUE_APP_CHANNEL_ADDRESS).encodeABI()
        };

        return await this.signTransaction(tx);
    }

    checkSubscription() {
        // TODO:
        // Web3 version of DB check

        const myContract = new this.web3.eth.Contract(epnsABI, process.env.VUE_APP_CONTRACT_ADDRESS);
        const tx = {
            from: this.walletAddress,
            to: process.env.VUE_APP_CONTRACT_ADDRESS,
            data: myContract.methods.memberExists(this.walletAddress, process.env.VUE_APP_CONTRACT_ADDRESS).encodeABI()
        };

        this.signTransaction(tx);
    }
}
