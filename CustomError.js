module.exports = (name, message) => {
    const CustomError = new Error();
    CustomError.name = name;
    CustomError.message = message;
  
    return CustomError;
  };