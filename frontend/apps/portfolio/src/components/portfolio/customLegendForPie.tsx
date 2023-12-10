const CustomLegendForPie = ({ payload }:any) => {
  payload.sort((a:any,b:any) => {return b.payload.percent*100 - a.payload.percent*100})
  return (
    <div className="flex flex-col items-center gap-3 text-2xl font-semibold">
      {
        payload.map((coin:any, index:any) => {
          return(
            <div key={`item-${index}`} className="flex flex-row items-center justify-between w-56">
              <div className="flex flex-row items-center gap-4">
                <div className={`w-6 h-6 rounded-[50%]`} style={{backgroundColor: coin.color}}></div>
                <label className="text-gray-600">{coin.value.toUpperCase()}</label>
              </div>
              <label>
                {(coin.payload.percent*100).toFixed(2)}%    
              </label>
            </div>
          )
        })
      }
    </div>
  );
}

export default CustomLegendForPie;
