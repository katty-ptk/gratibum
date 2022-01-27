class LocalStorage {
    setUserData( userData, data ) {
        localStorage.setItem(userData, JSON.stringify( data ));
    }

    getUserData ( userData ) {
        return localStorage.getItem( userData );
    }
}

export default LocalStorage;