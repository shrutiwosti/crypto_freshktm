import { useEffect, useState } from "react"
import { getAssetDataById,  getAssetDataHistory,  } from "../apis/data"
import { useNavigate } from "react-router-dom"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import NavigationBar from "../assets/components/NavigationBar"
import Footer from "../assets/components/Footer"
// import { Line } from "react-chartjs-2"

const CryptoDetails = () => {

    const [data, setData] = useState([])

    //using window.location.toLocaleString to get current page url and creating a new URL object to search for params
    const myUrl = new URL(window.location.toLocaleString()).searchParams
    //looking for id param
    const id = myUrl.get('id')
    var timeScheme = "h1"
    const [graphData,setgraphData] = useState([])
    const [maxLengthArray, setMaxLengthArray] = useState(720)
    const [graphLimit,setGraphLimit] = useState(maxLengthArray - 25)
    const [totalSupply, setTotalSupply] = useState("NA")

    const navigate = useNavigate();


    const getData = async() => {
        const res = await getAssetDataById(id)
        setData(res.data)
        console.log(res)

        //some maxSupply values are null therefore conducting a check
        if(res.data.maxSupply !== null){
            setTotalSupply(parseInt(res.data.maxSupply))
        }
        else{
            setTotalSupply("NA")
        }
    }

    const getAssetsHistory = async() =>{
        getAssetDataHistory(id, timeScheme).then((res) => {
            console.log(res)
            console.log(graphLimit)
            setgraphData(res.data)
        })

    }

    //styling for active timeschema buttons 
    const activeBtn = (id) =>{
        document.getElementById("6M").style.color = "black"
        document.getElementById("1D").style.color = "black"
        document.getElementById("1W").style.color = "black"
        document.getElementById("1M").style.color = "black"
        document.getElementById("3M").style.color = "black"
        document.getElementById("1Y").style.color = "black"
        document.getElementById(id).style.color = "blue" 
    }


    

    useEffect(() => {
        getData()
        getAssetsHistory()
        activeBtn("1D")
    },[])

    return(
        
        <div>
            <NavigationBar/>

            <div style={{padding:"2% 6.4% 0% 6.4%", }}>

                <div style={styles.topDataContainer}>
                    <div style={{fontSize:"24px"}}>
                       <span> 
                            <span style={{cursor:"pointer"}} className="allPrices" onClick={() => {
                                navigate("/")
                            }}>
                            All Prices {`>`} 
                            </span> {data.name} Price
                        </span>  
                    </div>

                    <div style={{fontSize:"32px", fontWeight:"700"}}>
                        {data.name} {data.symbol}
                        
                    </div>
                    
                    {/* using parseFloat to convert text data to float and toFixed to round up three digits in order to limit decimal places */}
                    
                    <div style={{backgroundColor:"white", }}>
                        <div style={{display:"flex",fontWeight:"600", alignItems:"center", gap:"15px"}}>
                            <div style={{fontSize:"36px", fontWeight:"600", color:"green",}}>${(parseFloat(data.priceUsd)).toFixed(3)}</div> 
                            <div style={{fontSize:"28px", color:"black"}}> {(parseFloat(data.changePercent24Hr)).toFixed(3)}%</div>
                        </div>

                        <div>
                            <div>Market Cap: ${parseFloat(data.marketCapUsd).toFixed(3)}</div>
                            <div>Total Supply: {totalSupply}</div>
                            <div>Circulating Supply: {parseInt(data.supply)}</div>                   
                        </div>
                    </div>
                    

                </div>
                
                <div style={{backgroundColor:"white"} }>
                    <div style={styles.timeSchemeButtonsContainer}>
                        <div style={{fontSize:"20px", fontWeight:"600"}}>
                            {data.name} Price Chart (USD)
                        </div>
                        {/*  When a button is clicked, it determines the maximum array length and sets the graph data limit based on the selected button. 
                        for example: 
                        if the button to display chart for 1D is pressed, the time schema is set to h1 which gives price data of every hour
                        the api sends an array the length of 720 and the limit of values in the graph is set to 695, 25 lower than 720 (due to splicing we subtract one more than 24 ), 
                        which gives us the data of every hour of a single day
                         */}
                        <div className="timeSchemeContainer">
                                <button onClick={() => {
                                    timeScheme = "h1"
                                    setMaxLengthArray(720)
                                    setGraphLimit(695)
                                    getAssetsHistory()
                                    activeBtn("1D")

                                }} id="1D">
                                    1D
                                </button>
                                <button onClick={() => {
                                    timeScheme = "d1"
                                    setMaxLengthArray(363)
                                    setGraphLimit(355)
                                    getAssetsHistory()
                                    activeBtn("1W")

                                }} id="1W">
                                    1W
                                </button>
                                <button onClick={() => {
                                    timeScheme = "d1"
                                    setMaxLengthArray(363)
                                    setGraphLimit(332)
                                    getAssetsHistory()
                                    activeBtn("1M")

                                }} id="1M">
                                    1M
                                </button>
                                <button onClick={() => {
                                    timeScheme = "d1"
                                    setMaxLengthArray(363)
                                    setGraphLimit(270)
                                    getAssetsHistory()
                                    activeBtn("3M")

                                }} id="3M">
                                    3M
                                </button>
                                <button onClick={() => {
                                    timeScheme = "d1"
                                    setMaxLengthArray(363)
                                    setGraphLimit(182)
                                    getAssetsHistory()
                                    activeBtn("6M")

                                }} id="6M">
                                    6M
                                </button>
                                <button onClick={() => {
                                    timeScheme = "d1"
                                    setMaxLengthArray(363)
                                    setGraphLimit(0)
                                    getAssetsHistory()
                                    activeBtn("1Y")
                                }} id="1Y">
                                    1Y
                                </button>

                        </div>
                    </div>
                    

                    <ResponsiveContainer width="95%" height={400}>
                       <LineChart data={graphData.slice(graphLimit, maxLengthArray).map((data) => {
                            return data
                        })} >
                        <Line dataKey="priceUsd" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 " />
                        <XAxis dataKey="date"/>
                        <YAxis dataKey="priceUsd"/>
                        <Tooltip />
                    </LineChart> 
                    </ResponsiveContainer>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

const styles = {
    topDataContainer:{
        marginBottom:"0px",
        padding:"20px", 
        boxSizing:"border-box", 
        backgroundColor:"white"
    },
    timeSchemeButtonsContainer:{
        padding:"40px 40px 0px 20px",
        display:"flex", 
        justifyContent:"space-between"
    }
}

export default CryptoDetails