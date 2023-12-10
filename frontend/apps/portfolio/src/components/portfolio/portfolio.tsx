import { FC, useEffect, useState } from "react"
import { PricesType, UserDataType } from "../../consts/types"
import Charts from "./charts"
import Assets from "./assets"
import Header from "./header"

type Props = {
  className?: string
  userData: UserDataType | undefined
}
const Portfolio: FC<Props> = ({ className, userData }) => {
  const [prices, setPrices] = useState<PricesType>();
  const [prices1d, setPrices1d] = useState<PricesType>();
  const [prices1h, setPrices1h] = useState<PricesType>();
  const [prices7d, setPrices7d] = useState<PricesType>();

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = JSON.parse(sessionStorage.getItem("prices") as string) as PricesType
      if (!prices) {
        const response = await fetch(`/api/prices`);
        const data = await response.json();
        if (data.message == "error") {
          alert("Server error")
          return
        }
        setPrices(data.prices as PricesType);
        sessionStorage.setItem("prices", JSON.stringify(data.prices))
        return
      }
      if (prices.date <= Date.now() - 300000) {
        const response = await fetch(`/api/prices`);
        const data = await response.json();
        if (data.message == "error") {
          alert("Server error")
          return
        }
        setPrices(data.prices as PricesType);
        sessionStorage.setItem("prices", JSON.stringify(data.prices))
        return
      }
      setPrices(prices)
    }
    const fetchPrices1d = async () => {
      const prices = JSON.parse(sessionStorage.getItem("prices1d") as string) as PricesType
      if (!prices) {
        const response = await fetch(`/api/prices/1d`);
        const data = await response.json();
        if (data.message == "error") {
          alert("Server error")
          return
        }
        setPrices1d(data.prices as PricesType);
        sessionStorage.setItem("prices1d", JSON.stringify(data.prices))
        return
      }
      if (prices.date <= Date.now() - 3.6e6*24) {
        const response = await fetch(`/api/prices/1d`);
        const data = await response.json();
        if (data.message == "error") {
          alert("Server error")
          return
        }
        setPrices1d(data.prices as PricesType);
        sessionStorage.setItem("prices1d", JSON.stringify(data.prices))
        return
      }
      setPrices1d(prices)

    }
    const fetchPrices1h = async () => {
      const prices = JSON.parse(sessionStorage.getItem("prices1h") as string) as PricesType
      if (!prices) {
        const response = await fetch(`/api/prices/1h`);
        const data = await response.json();
        if (data.message == "error") {
          alert("Server error")
          return
        }
        setPrices1h(data.prices as PricesType);
        sessionStorage.setItem("prices1h", JSON.stringify(data.prices))
        return
      }
      if (prices.date <= Date.now() - 3.6e6) {
        const response = await fetch(`/api/prices/1h`);
        const data = await response.json();
        if (data.message == "error") {
          alert("Server error")
          return
        }
        setPrices1h(data.prices as PricesType);
        sessionStorage.setItem("prices1h", JSON.stringify(data.prices))
        return
      }
      setPrices1h(prices)
    }
    const fetchPrices7d = async () => {
      const prices = JSON.parse(sessionStorage.getItem("prices7d") as string) as PricesType
      if (!prices) {
        const response = await fetch(`/api/prices/7d`);
        const data = await response.json();
        if (data.message == "error") {
          alert("Server error")
          return
        }
        setPrices7d(data.prices as PricesType);
        sessionStorage.setItem("prices7d", JSON.stringify(data.prices))
        return
      }
      if (prices.date <= Date.now() - 3.6e6*24*7 - 300000) {
        const response = await fetch(`/api/prices/7d`);
        const data = await response.json();
        if (data.message == "error") {
          alert("Server error")
          return
        }
        setPrices7d(data.prices as PricesType);
        sessionStorage.setItem("prices7d", JSON.stringify(data.prices))
        return
      }
      setPrices7d(prices)
    }
    setInterval(() => {fetchPrices().catch(console.error);}, 300000);
    fetchPrices().catch(console.error);
    fetchPrices1d().catch(console.error);
    fetchPrices1h().catch(console.error);
    fetchPrices7d().catch(console.error);

  }, [])
  

  return (
    <div className={className}>
      <Header userData={userData} prices={prices} prices1d={prices1d} className="w-full flex items-center justify-between" />
      <Charts className="w-full flex items-center justify-between" userData={userData} prices={prices}/>
      <Assets userData={userData} prices={prices} prices1h={prices1h} prices1d={prices1d} prices7d={prices7d} className="w-full flex flex-col gap-5" />
    </div>
  )
}

export default Portfolio; 
