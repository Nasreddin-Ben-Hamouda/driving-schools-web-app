import React, {lazy, useEffect, useRef, useState} from 'react'
import UseForm from './UseForm'

const Configuration = () => {

    const [fields,setFields]=useState(null);
    useEffect(()=>{
            setFields({
               title: "kkkkkkk",
               cin: "12335874"
            })
    },[])

    const onSubmit = (data)=>{
        console.log(data)
    };

  return fields?<UseForm preloadedValues={fields} onSubmit={onSubmit}/>:<p>loading ...</p>
}

export default Configuration;
