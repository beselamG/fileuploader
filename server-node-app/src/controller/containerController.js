

const getContainers = async (req, res) => {
    res.send("container listed");
  };

  const createContainer = async (req, res) => {
    res.send("container created");
  };



  module.exports =  {getContainers,createContainer}