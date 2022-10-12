import {db} from "../firebase";
import {ref, set, get, update, remove, child} from 'firebase/database'

class UsersDataService {
    
    async getAll() {
        
    }

    async create(payload) {
        return await set(ref(db, 'users'), payload);   
    }

    async update(key, value) {
        //return db.child(key).update(value);
    }

    async delete(key) {
        //return db.child(key).remove();
    }

    async deleteAll() {
        //return db.remove();
    }
}

export default new UsersDataService();