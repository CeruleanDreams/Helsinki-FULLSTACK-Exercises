import React from 'react';

const Submit = ({onSubmit, Text}) => {
console.log(onSubmit)
return ( <div>
<button type="submit" onClick={onSubmit} >add {Text} </button> 
 </div>) }

 export default Submit