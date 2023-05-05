export function getOilPrice(){

    const oilPriceDate = document.getElementById("oilPriceDate")
    const wtiOil = document.getElementById("wti-oil")
    const brentOil = document.getElementById("brent-oil")
    const naturlGas = document.getElementById("naturl-gas")

    // axios
    //     .get("https://commodities-api.com/api/latest?access_key=4pjvc703gof82qsf1tl62te0kwzc4v93gnjmmo8brvuiba80x86wi0qsbtb3")
    //     .then(res => {
    //         oilPriceDate.innerHTML = res.data.data.date
    //         wtiOil.innerHTML = `WTI Oil ${Math.floor(1/res.data.data.rates.WTIOIL * 100) / 100} USD per barrel`
    //         brentOil.innerHTML = `Brent Oil ${Math.floor(1/res.data.data.rates.BRENTOIL * 100) / 100} USD per barrel`
    //         naturlGas.innerHTML = `Natural Gas ${Math.floor(1/res.data.data.rates.NG *100) / 100} USD per MMBtu`
    //     })
}
