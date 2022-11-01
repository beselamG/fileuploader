const { loginRequest } = require("../authConfig");

export const handleLogin = async (instance) => {
  try {
    await instance.loginRedirect(loginRequest);
  } catch (error) {
    console.log(error);
  }
};

export const handleLogout = async (instance) => {
  try {
    await instance.logoutRedirect();
  } catch (error) {
    console.log(error);
  }
};

export const RequestAccessToken = async (instance, accounts) => {
  try {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance.setActiveAccount(accounts[0]);
    const response = await instance.acquireTokenSilent(request);
    return response

  } catch (error) {
    console.log(error);
  }
};
