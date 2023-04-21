
import React from 'react';

const Button = ({Text, onChange,value}) => {
return(
<div>
  {Text}: <input onChange = {onChange} value={value}/>
</div>)
}

export default Button