import React,{useEffect,useState} from 'react'
import './ApiCss.css'
import logo from '../logo.svg'

function ApiComponent() {
const [country,setCountry] = useState([])
const [selected,setSelected] = useState()
useEffect(()=>{
    fetch('https://countriesnow.space/api/v0.1/countries/flag/unicode',{
        method:'GET'
    })
    .then((response)=>response.json())
    .then((res)=>{
        console.log(res.data);
        setCountry(res.data);
    })
    .catch((err)=>{
      alert(err)
    })
},[])

const loadFlag = (country)=>{
fetch('https://countriesnow.space/api/v0.1/countries/flag/images',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    'iso2':country.iso2
  })
}).then((response)=>response.json())
.then(res=>{
  console.log(res.data);
  setSelected(res.data)
})
.catch((err)=>{
  console.log('err',err);
})
}

const exit = ()=>{
  setSelected()
}
  return (
    <>
    <div className='container'>
      {country.map((cnty,index)=>
        <div className='country-list' key={index} onClick={()=>loadFlag(cnty)}>{cnty.name}</div>
      )}
    </div>
  { selected?.flag && <div className='flag-container'>
        <div className='postion-exit'><button className='exit-btn' onClick={exit}>Close</button></div>
        <img src={selected?.flag} alt="" height={'200px'}/>
        <div style={{color:"white"}}><b>{selected.name}</b></div>
    </div>}
    </>
  )
}

export default ApiComponent