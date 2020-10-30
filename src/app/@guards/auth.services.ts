import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {

    private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')

    setLoginStatus(value: boolean) {
        this.loggedInStatus = value;
        localStorage.setItem('loggedIn', 'true');
    }

    setLogOutStatus(value: boolean) {
        this.loggedInStatus = value;
        localStorage.setItem('loggedIn', 'false');
    }

    get LoginStatus() {
        return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
    }

    createUser(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    signInUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
}
