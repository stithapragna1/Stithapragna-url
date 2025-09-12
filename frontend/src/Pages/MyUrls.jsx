import React,{useEffect, useState} from 'react'
import Service from '../utils/http'

const MyUrls = () => {
    const service = new Service();
    const [data,setData]=useState(null);
    const getData = () => (
        try {
            const response = await service.get("user/mu/urls")
            console.log(response)
            setData(response)
        }
        catch(err)
        {
            console.log(err)

        } 

    )
    useEffect
  return (
    <div>MyUrls</div>
  )
}

export default MyUrls