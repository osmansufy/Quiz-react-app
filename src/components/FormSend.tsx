import React from 'react'
 import {SelectorWrapper} from '../App.styles'


const ApiData=(props: any)=>(
    <SelectorWrapper>

       
        <span dangerouslySetInnerHTML={{__html:props.label}}></span>
    <select
    
    onChange={props.changed}
    
 >
     {
         props.options.map((option:any)=>(
<option key={option.value} value={option.value}>{option.displayValue}</option>
         )
         )
     }



    </select>
    </SelectorWrapper>

)
export default ApiData