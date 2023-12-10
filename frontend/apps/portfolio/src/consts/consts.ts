import * as logos from "../assets"
const navbaritems:any = [
    {
        "name": "portfolio",
        "link": "/portfolio"
    },
    {
        "name": "profile",
        "link": "/profile"
    }
]

const logo:any = {
    "btc": logos.BTCLogo,
    "eth": logos.ETHLogo,
    "usdt": logos.USDTLogo,
    "usdc": logos.USDCLogo,
    "bnb": logos.BNBLogo,
    "dot": logos.DOTLogo,
    "link": logos.LINKLogo,
    "ada": logos.ADALogo,
    "sol": logos.SOLLogo,
    "matic": logos.MATICLogo
}

const coinlist:any = [
    "btc",
    "eth",
    "usdt",
    "usdc",
    "bnb",
    "dot",
    "link",
    "ada",
    "sol",
    "matic"
]

const fullcoinnames:any = {
    "btc": "Bitcoin",
    "eth": "Ethereum",
    "usdt": "Tether",
    "usdc": "USD Coin",
    "bnb": "BNB",
    "dot": "Polkadot",
    "link": "Chainlink",
    "ada": "Cardano",
    "sol": "Solana",
    "matic": "Polygon"
}

const colors:any = {
    "btc": "#faa905",
    "eth": "#5400ff",
    "usdt": "#44bba3",
    "usdc": "#006cff",
    "bnb": "#ffe600",
    "dot": "#ff00c7",
    "link": "#1a2b6b",
    "ada": "#0033AD",
    "sol": "#af22dd",
    "matic": "#8247e5"
}



export { navbaritems, logo, fullcoinnames, colors, coinlist }
