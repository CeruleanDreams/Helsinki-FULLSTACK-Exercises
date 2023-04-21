const ErrorMessage = ({errorMessage}) =>
{
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (errorMessage != null){
    return (
      <div style={errorStyle}> {errorMessage}
      </div>
    )
  }
  else{
    return null
  }
}

export default ErrorMessage