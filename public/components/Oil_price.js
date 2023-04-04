export function getOilPrice(){

    const oilPriceDate = document.getElementById("oilPriceDate")
    const wtiOil = document.getElementById("wti-oil")
    const brentOil = document.getElementById("brent-oil")
    const naturlGas = document.getElementById("naturl-gas")

    axios
        .get("https://commodities-api.com/api/latest?access_key=u1co2u9ekxr0sgfdsjvbga8fp0ricay8cz7lgcfm0zq5zjiqvsjdwsiq5h8m")
        .then(res => {
            console.log(res.data)
            oilPriceDate.innerHTML = res.data.data.date
            wtiOil.innerHTML = `WTI Oil ${Math.floor(1/res.data.data.rates.WTIOIL * 100) / 100} USD per barrel`
            brentOil.innerHTML = `Brent Oil ${Math.floor(1/res.data.data.rates.BRENTOIL * 100) / 100} USD per barrel`
            naturlGas.innerHTML = `Natural Gas ${Math.floor(1/res.data.data.rates.NG *100) / 100} USD per MMBtu`
        })
}
