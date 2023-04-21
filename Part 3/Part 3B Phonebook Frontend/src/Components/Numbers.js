
import React from 'react';  
import Delete from "./Delete"; 
    
    //If passing multiple props, don't forget to 
    const Numbers = ({persons, condition, deleteFunction}) => {
      console.log(`includes ${condition}`)
      const filteredPeople = persons.filter((person) => person.name.includes(condition));
      //Filter goes through the array and checks for that condition that is returned as true or false. Returns an array for the entries that passed that condition/test.
      
      //includes searches for a subarray within the argument


      if (condition !== ""){
      return (<>
        <h2>Numbers</h2>
        {
        filteredPeople.map((person) => 
        <>
        <p>{person.name}: {person.number} 
        <Delete deleteFunction={() => deleteFunction(person.id)}></Delete></p>
        </>)
        }

        </>
        )
      }
      else {
      return ( 
      <>
          <h2>Numbers</h2>
          {persons.map((person) => 
          <p>{person.name}: {person.number} 
          <Delete 
          deleteFunction={() => deleteFunction(person.id)}></Delete></p>)}
        </>)
      } 
    }

    export default Numbers
