import {db} from "../firebase";
import {collection, addDoc, Timestamp, query, orderBy, onSnapshot} from 'firebase/firestore'

class UsersDataService {
    
    async getAll() {
        
    }

    async create(payload) {
        return await addDoc(collection(db, 'users'), payload);   
    }

    async update(key, value) {
        return db.child(key).update(value);
    }

    async delete(key) {
        return db.child(key).remove();
    }

    async deleteAll() {
        return db.remove();
    }
}

export default new UsersDataService();