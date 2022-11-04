# azure infra
## deploy
### main


#### deploy complete
```bash
az deployment group create --template-file main.bicep --resource-group $rg_name --parameters main.parameters.json --mode Complete
```

# server web app
## deploy
Azure Web Apps is deployed with bicep IaC.

## apis
### GET /blob 
query all files 

### GET /blob/blobVersion
query files with versions

### POST /blob
upload file in blob storage and metadata in database

### GET /container
get containers

### POST /container
create  a container


# Client web app
## deploy
Azure Web Apps is deployed with bicep IaC.

## Development
Run locally with app config values: \
REACT_APP_API = http://localhost:3001 \
REACT_APP_REDERICT = http://localhost:3000
```
npm run start-dev
```

## Sign in with roles
1. Azure Active Directory > Register Application
2. Azure Active Directory > Enterprise applications > Registed App > Users and groups > Add users/roles
3. Use @azure/msal-react and @azure/msal-browser to Two-Factor Authentication

More info about authentication and app registration: https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react



