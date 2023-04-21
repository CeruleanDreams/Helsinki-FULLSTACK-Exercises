app = require("./app") 

//require('dotenv').config()

const PORT = require('./utils/config').PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
