import { useEffect, useState } from 'react';
import { getAssetData, } from '../apis/data';
import NavigationBar from '../assets/components/NavigationBar';
import Footer from '../assets/components/Footer';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";




const Home = () =>{
   const[search,setSearch] = useState("")

    const [data,setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate()
    const numberOfRecordsPerPage = 10
    const indexOfLastRecord = currentPage * 10;
    const indexOfFirstRecord = indexOfLastRecord - 10;



    const changePage = (type) => {
      
      //increase of decrease page number in accordance to number of data
      if(type === "increase"){
        if(data.length % numberOfRecordsPerPage === 0 ){
          if(currentPage === data.length/numberOfRecordsPerPage){

          }
          else{
            setCurrentPage(currentPage + 1) 
          }

        }
        else if(data.length % numberOfRecordsPerPage !== 0){
          if(currentPage > data.length/numberOfRecordsPerPage){
          }
          else{
            setCurrentPage(currentPage + 1) 

  
          }
        }

      }
      else{
        if(currentPage === 1){

        }
        else{
          setCurrentPage(currentPage - 1) 
        }
      }

    }

    const getAssets = async() =>{
      const res = await getAssetData()
      setData(res.data)  
      
    }
    
    useEffect(() => {
      getAssets();
    },[])
  
    return (
      <div>
        
        <NavigationBar/>

        <div style={{ padding:"2% 6.4% 0% 6.4%"}}>
          <div style={{display:'flex', justifyContent:"space-between", alignItems:"center"}}>
            <div style={{fontSize:"30px", fontWeight:"400", marginBottom:"20px"}}>
                  Today's Cyptocurrency Prices
            </div>

            <div className='searchBar'>
                <input type="text" placeholder='Search' onChange={(e) => {
                    setSearch(e.target.value)
                }} value={search}/>
                <a href={`/searchResults?searchQuery=${search}`}>
                    <button onClick={() => {
                        console.log(search)
                        navigate()
                    }}><BiSearch/> </button> 
                </a>
                   
            </div>
          </div>
          <div style={{ width:"100%"}}>
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

              <tbody>
                {data.slice(indexOfFirstRecord,indexOfLastRecord).map((stocks) => 
                  <tr key={stocks.id} style={{backgroundColor:"white"}} onClick={() => {
                    navigate(`/cryptoDetails?id=${stocks.id}`)
                  }}>
                    <td>
                      {stocks.rank}
                    </td>
                    <td>
                      {stocks.name}
                    </td>
                    <td>
                      {stocks.symbol}
                    </td>
                    <td>
                      $ {stocks.priceUsd}
                    </td>
                    <td>
                      {stocks.changePercent24Hr}%
                    </td>
                  </tr>
                )}
              </tbody>     
            </table>
            
            <div className='changePages'>
                <div>
                  <button onClick={() => {
                    changePage()
                }}><FaAngleLeft/></button>
                </div>

                <div>
                  {currentPage}
                </div>

                <div>
                  <button onClick={() => {
                    changePage("increase")
                  }}><FaAngleRight/></button> 
                </div>
            </div>

          </div>
        </div>
        <Footer/>

      </div>
    )
}

export default Home