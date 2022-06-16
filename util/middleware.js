const errorHandler = (error, request, response, next) => {
  console.error("error",error.message)

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'database does not support this command' })
  } 
  

  next(error)
}

module.exports = { errorHandler }