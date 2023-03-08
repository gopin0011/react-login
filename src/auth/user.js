class User {
    constructor() {
        this.init();
    }

    init() {
        this.user = localStorage.getItem('user');
        this.userToken = localStorage.getItem('userToken');
        this.loggedIn = localStorage.getItem('userLoggedIn');
    }

    /**
     *
     * @param data object
     * @param data.name string
     * @param data.email string
     * @param callback function
     */
    authenticated(data, callback) {
        localStorage.setItem('user', data.user);
        // localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userLoggedIn', true);
        localStorage.setItem('userToken', data.access_token);
        
        this.init();

        callback();
    }

    /**
     *
     * @return {boolean}
     */
    isLoggedIn() {
        return Boolean(this.loggedIn) === true;
    }
}

export default new User()