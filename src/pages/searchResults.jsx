import { useEffect, useState } from "react"
import { getAssetDataBySearch } from "../apis/data"
import Footer from "../assets/components/Footer"
import NavigationBar from "../assets/components/NavigationBar"
import { useNavigate } from "react-router-dom"

const SearchResults = () => {
    const myUrl = new URL(window.location.toLocaleString()).searchParams
    const searchBy = myUrl.get("searchQuery")
    const navigate = useNavigate()
    const [searchText,setSearchText] = useState("")
    const [data, setData] = useState([])
    

    const getSearchData = async() => {
        const res = await getAssetDataBySearch(searchBy)
            console.log(data)
            setData(res.data)
            setSearchText(searchBy)
            console.log(res)
        
    }

    
    useEffect(() => {
        getSearchData()
    })

    if(data.length>0){
        return(
            <div> 
                <div >
                    <NavigationBar/>
                    <div style={{padding:"2% 6.4% 0% 6.4%", minHeight:"200px"}}>
                    <table  className='stockTable'  >
                        <thead>
                            <tr >
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>24H Change</th>
                            </tr>
                        </thead>


                        {data.map((myData) =>(

                            <tbody key={myData.id}>
                                <tr onClick={() => {
                                    navigate(`/cryptoDetails?id=${myData.id}`)
                                }}>
                                    <td>
                                    {myData.rank}
                                    </td>
                                    <td>
                                    {myData.name}
                                    </td>
                                    <td>
                                    {myData.symbol}
                                    </td>
                                    <td>
                                    $ {myData.priceUsd}
                                    </td>
                                    <td>
                                    {myData.changePercent24Hr}%
                                    </td>
                                </tr>
                            </tbody>     
                        ))}
                        </table>

                    </div>
                    <Footer/>
                </div>
            
            
            
            </div>    
        )
    }
    else{
        if(searchText){
            return(
                <div>
                    
                <NavigationBar/>
                <div style={styles.noResultScreen}>
                    No results for "{searchText}"                
                </div>
                <Footer/>
            
                </div>  
            )
        }
        else{
            return(
                <div>  

                    <NavigationBar/>
                    <div style={{width:"100%", height:"250px"}}></div>
                    <Footer/>
            
                </div>  
            )

        }
        
    }

    
        
}

const styles = {
    noResultScreen:{
        width:"100%", 
        height:"250px", 
        fontSize:"34px", 
        fontWeight:"500", 
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center"
    }
}
export default SearchResults