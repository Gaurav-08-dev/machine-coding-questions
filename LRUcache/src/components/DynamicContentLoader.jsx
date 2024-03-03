import { useState } from 'react'
import useLRUCache from '../hooks/useLRUCache';

const DynamicContentLoader = () => {

  const {get,put} = useLRUCache(3)
  const [content, setContent] = useState([]);

  const loadContent = async (id)=>{
    await new Promise((res)=>setTimeout(res,1000)) 
    const loadedContent = {
      id,text:`Tab ${id} Clicked`
    }

    put(id,loadedContent)
    setContent(prevData => [...prevData,loadedContent])
  }

  const handleButtonClick= (id)=>{

    const cachedContent = get(id);
    if(cachedContent){
      console.log(`cachedContent loaded for ${id}`)
      setContent(prevData => [...prevData,cachedContent])
    }
    else{

      loadContent(id)
      
    }
  }

  return (
    <div>
    <h2>Dynamic Content Loader with LRU Cache</h2>
    <button onClick={()=>handleButtonClick(1)}>1</button>   
    <button onClick={()=>handleButtonClick(2)}>2</button>   
    <button onClick={()=>handleButtonClick(3)}>3</button>   
    <button onClick={()=>handleButtonClick(4)}>4</button>   
    <button onClick={()=>handleButtonClick(5)}>5</button>   

    <div>
      <h3>Loaded Content</h3>
      <ul>{
        content.map((item,i) => <li key={`${item.id}${i}`}>{item.text}</li>)
      }</ul>
    </div>
    
    </div>
  )
}

export default DynamicContentLoader