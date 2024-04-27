const authProvider = {
    // authentication
    login: params => 
        Promise.resolve(/* ... */),
    checkError: error => 
        Promise.resolve(/* ... */),
    checkAuth: params => 
        Promise.resolve(/* ... */),
    logout: () => 
        Promise.resolve(/* ... */),
    getIdentity: () => 
        Promise.resolve(/* ... */),
    handleCallback: () => 
        Promise.resolve(/* ... */), // for third-party authentication only
    // authorization
    getPermissions: () => 
        Promise.resolve(/* ... */),
}

export default authProvider;