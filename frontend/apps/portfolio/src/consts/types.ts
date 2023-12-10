type TransactionType = {
    transaction_id: number
    username: string
    date: number 
    coin: string
    quantity: number
    price: number | null
}
type AssetType = {
    coin: string
    price: string
    hourProcentage: {
        value: string
        positive: boolean
    }
    dayProcentage: {
        value: string
        positive: boolean
    }
    sevenDayProcentage: {
        value: string
        positive: boolean
    }
    quantity: number
    value: string
    valueNumber: number
}

type CoinsType = {
    btc: number | null
    eth: number | null
    usdt: number | null
    bnb: number | null
    usdc: number | null
    sol: number | null
    ada: number | null
    link: number | null
    matic: number | null
    dot: number | null
}

type UserDataType = {
    username: string
    email: string
    name: string | null
    lastname: string | null
    address: string | null
    city: string | null
    country: string | null
    phone: number | null
    coins: CoinsType
}

type PricesType = {
    date: number
    coins: CoinsType
}

export type { TransactionType, UserDataType, PricesType, AssetType }
