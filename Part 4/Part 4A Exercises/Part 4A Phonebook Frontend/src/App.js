import { useState, useEffect } from 'react'
import Filter from "./Components/Filter";
import Numbers from './Components/Numbers';
import Button from "./Components/Phonebook/Button"
import Submit from "./Components/Phonebook/Submit"
import axios from 'axios'
import SuccessMessage from './Components/Messages/SuccessMessage';
import ErrorMessage from './Components/Messages/ErrorMessage';

import servercom from "./Components/servercom"

const App = () => {

  const handleDelete = (id) => {
    if (window.confirm("do you want to delete?"))
    {
    console.log(id);
    servercom.deleteEntry(id).then(
      response => 
      setPersons(persons.filter(person => person.id !== id))).catch(error => {
        setErrorMessage(error.message);
        console.log(`This is the error message: ${errorMessage}`)
        setTimeout(() => 
          setErrorMessage(null)        
        , 5000);
        });
        
      setNewName('');
      setNewNumber('');
    }
  }

  const [filter, setFilter]  = useState('');

  const onChangeFilter = (event) => {setFilter(event.target.value)};

  //console.log("refresh")

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
    number: '82713'}
  ]) 

  useEffect(() => {
    console.log('effect')
    axios
      .get('/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons, 'persons')

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState("")



  const onChange = (event) => {
    //event.preventDefault();
    console.log(event.target.value);
    setNewName(event.target.value)
  }
  
    

  let newPersonToAnyPersonCorresponds = persons.map( (person) => person.name === newName); //returns an array, where for each entry, it specifies true or false
  console.log(newPersonToAnyPersonCorresponds)

  let hasTrue = newPersonToAnyPersonCorresponds.find( (entry)  => entry === true)
  console.log(hasTrue) //goes through the previous array to check if any array is true; you can use .includes(true) as well


const [errorMessage, setErrorMessage] = useState(null)
const [successMessage, setSuccessMessage] = useState(null)

const updateList = () => {
    const newPerson = {name: newName, number: newNumber};

    servercom.create(newPerson)
    .then(
      (returnedPerson) =>
        {setPersons
          (persons.concat(returnedPerson));

        setNewName('');

        setNewNumber('');

        setSuccessMessage(`${returnedPerson.name} has been successfully added` );

        setTimeout(() => setSuccessMessage(null), 5000);
        })
      .catch(error => {
        setErrorMessage(error.message);
        console.log(`This is the error message: ${errorMessage}`)
        setTimeout(() => 
          setErrorMessage(null)        
        , 5000);
        
      setNewName('');
      setNewNumber('');})
        
    };
  

  const onSubmitB = (event) => {
  event.preventDefault();
  if (hasTrue){
    alert(`${newName} already exists`);
    if (window.confirm("Do you want to replace?")){
      const id = persons.find(person => person.name === newName).id
      //console.log(id) //
      //console.log({name: newName, number: newNumber})
      servercom.update(id, {name: newName, number: newNumber})
      .then(response => setPersons(persons.map( person => person.id !== id ? person : response.data ))).catch(error => 
        {
        setErrorMessage(error.message);
        console.log(`This is the error message: ${errorMessage}`)
        setTimeout(() => 
          setErrorMessage(null)        
        , 5000);
        });
    }
  }
  else if (alreadyNum(newNumber)){
    alert(`${newNumber} already exists`);
  }
  else{
    updateList();
  }
  //gia ? updateList() : alert()
  
} 

  const alreadyNum = (inputNumber) => {
    persons.some((person) => person.number === inputNumber)
  } 



 /* const onSubmitNum = (event) => {
    event.preventDefault();
    if (alreadyNum(newNumber)){
     setNumbers(numbers.concat(newNumber));
     setNewNumber('');
    }
    else{
    alert(`${newNumber} already exists`)
    }
  } */

  const onChangeNumber = (event) => {
  setNewNumber(event.target.value)
  }

  
  return (
    <div>
      <ErrorMessage errorMessage={errorMessage}/>
      <SuccessMessage successMessage={successMessage}/>

      <h2>Phonebook</h2>
      <Filter onChangeFilter={onChangeFilter} value={filter}/>
      <h2>add a new</h2>
      <form>
        <Button Text={"name"} onChange={onChange} value={newName}/>
        
        <Button Text={"number"} onChange={onChangeNumber} value={newNumber}/>
        
        <Submit Text={"name"} onSubmit={onSubmitB} />
        
        
      </form>
      <Numbers deleteFunction={handleDelete} persons = {persons} condition = {filter}/>
    </div>
  )
}

export default App


/*servercom.update(newPerson).then(
      (returnedPerson) => {
        console.log (`${returnedPerson} successfully added`);
        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
      }
    )*/