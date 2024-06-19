import { defineStore } from 'pinia';
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null,
        isAdmin: false,
        id: 0,
        coins: 0,
    }),
    getters: {
        quantCoints: (state) => {
            return state.coins;
        },
        getId: (state) => {
            return state.id;
        },
    },
    actions: {
        async login(name, password){
            try {
                const response = await fetch('https://6657cb085c3617052645dfd1.mockapi.io/users')
                const users = await response.json()

                const user = users.find(user => user.name === name && user.password === password)

                if(user) {
                    this.isAuthenticated = true;
                    this.user = user;
                    this.isAdmin = user.isAdmin;
                    this.id = user.id;
                    this.coins = user.coins;
                    localStorage.setItem('isAuthenticated', 'true')
                    localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false')
                    localStorage.setItem('user', JSON.stringify(user))
                }else{
                    alert('Usuario o Contrasena no valido')
                }

            } catch (error) {
                console.error('Error en Login: ', error)
            }

        },
        async register(name, email, password){
            if(name && email && password){
                try {
                    const coins = 100
                    const isAdmin = false
                    
                    const user = {
                        name,
                        password,
                        email,
                        isAdmin,
                        coins,                        
                    }

                    console.log('usuario : ', user);

                    const response = await axios.post('https://6657cb085c3617052645dfd1.mockapi.io/users', user)

                    console.log('RESPONSE: ', response);

                    const data = await response.data;

                    console.log('LA DATA: ', data);

                    this.isAuthenticated = true;
                    this.user = response.data;
                    localStorage.setItem('isAuthenticated', 'true')
                    localStorage.setItem('user', JSON.stringify(user))
                } catch (error) {
                    console.log('ERROR: ', error);
                    
                }
            }else{
                alert('Completa todos los datos')
            }
        },
        logout(){
            this.isAuthenticated = false;
            this.user = null;
            this.isAdmin = false;
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('isAdmin')
        },
        checkAuth(){
            this.isAuthenticated = localStorage.getItem('isAuthenticated' === true);
            this.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false
            if(this.isAuthenticated){
                this.user = JSON.parse(localStorage.getItem('user'))
            }
        },
        async updateUser({ id, name, email }) {
            try {
                if (!id) {
                    throw new Error('El ID del usuario es requerido');
                }
                const userUpdates = { name, email };
                const response = await axios.put(`https://6657cb085c3617052645dfd1.mockapi.io/users/${id}`, userUpdates);
                this.user = response.data;
                localStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                console.error('Error actualizando el usuario: ', error.response ? error.response.data : error.message);
                throw new Error('Error actualizando el usuario');
            }
        },
        async updateCoins({ id,coins}) {
            console.log(id)
            console.log(coins)
            try {
                if (!id) {
                    throw new Error('El ID del usuario es requerido');
                }
                const userUpdates = { coins };
                const response = await axios.put(`https://6657cb085c3617052645dfd1.mockapi.io/users/${id}`, userUpdates);
                this.user = response.data;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.coins = coins;
            } catch (error) {
                console.error('Error actualizando el usuario: ', error.response ? error.response.data : error.message);
                throw new Error('Error actualizando el usuario');
            }
        },
    }
})



