import { useEffect, useState } from 'react';
import {styled} from 'styled-components'
import SearchResult from './components/SearchResults/SearchResult';

export const BASE_URL = "http://localhost:9000";


const App = () => {

  const [data,setData] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);

  const [filter, setFilter] = useState(null);
  const [filterBtn, setFilterBtn] = useState("all");



  useEffect(()=>{
    const fetchData = async()=>{

      setLoading(true);
      try{
        const response = await fetch(BASE_URL);
  
        const json = await response.json();
  
        setData(json);
        setFilter(json);
        setLoading(false);
  
      }catch(error){
        setError("Unable to load data")
      }
      
    };

    fetchData();
  },[]);

  if(error) return <div>Error</div>;
  if(loading) return <div>Loading...</div>;

  const search = (e)=>{

    const value = e.target.value;

    if(value === "")
      setFilter(null);

    const filter = data?.filter((food)=>
      food.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilter(filter);
  }

  const btnSearch = (type)=>{

    if(type === "all"){
      setFilter(data);
      setFilterBtn("all");
      return;
    }

    const filter = data?.filter((food)=>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilter(filter);
    setFilterBtn(type);

  }

  const btnTypes = [
    {
      name: "All",
      type: "all"
    },

    {
      name: "Breakfast",
      type: "breakfast"
    },

    {
      name: "Lunch",
      type: "lunch"
    },

    {
      name: "Dinner",
      type: "dinner"
    }
  ];

  return (
    <main>
  <Container>
    <TopContainer>
      <div>
        <a href="#"><img src="logo.svg" alt="logo" /></a>
      </div>
      <div className="search">
        <input onChange = {search} type="text" placeholder='Search Food...' />
      </div>
    </TopContainer>

    <FilterContainer>

      {
        btnTypes?.map((value)=>(

          <Button 
            isSelected = {filterBtn === value.type}
            key = {value.name}
            onClick={()=> btnSearch(value.type)}
          >{value.name}</Button>
        ))
      }

    </FilterContainer>

  </Container>


  <SearchResult data = {filter}/>
  </main>

  )
};

export default App;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;

`;

const TopContainer = styled.div`

  display: flex;
  height: 140px;
  justify-content: space-between;
  padding: 20px;
  align-items: center;

  .search{
    input{

      background-color: transparent;
      border: 2px solid red;
      height: 40px;
      border-radius: 4px;
      color: whitesmoke;
      padding: 0 10px;
      font-size: 17px;

      &::placeholder{
        color: silver;
      }
    }
  }

  @media (0 <width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  padding-bottom:40px;
`;


export const Button = styled.button`

  background-color: ${(props)=> (props.isSelected ? "red" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: 2px solid #ff4343;
  border-color: ${(props)=> (props.isSelected ? "gold" : "#ff4343")};
  color: whitesmoke;
  font-weight: 500;
  font-size: 17px;
  transition: 0.3s ease-in-out;

  &:hover{
    background-color: red;
    border: 2px solid #ff4343;
  }

  &:active{
    scale: 0.9;
  }
`;



