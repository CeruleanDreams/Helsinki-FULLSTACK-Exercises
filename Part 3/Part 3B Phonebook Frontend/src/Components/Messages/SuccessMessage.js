const SuccessMessage = ({successMessage}) =>
{
  const successStyle = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
  }

  if (successMessage != null){
    return (
      <div style={successStyle}> {successMessage}
      </div>
    )
  }
  else{
    return null
  }
}

export default SuccessMessage