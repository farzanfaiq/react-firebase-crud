import {GetFirebaseInstance} from "../firebase";
import {ref, set, get, update, remove, child, onValue} from 'firebase/database'
import { v4 as uuidv4 } from 'uuid';

class UsersDataService {
    
    async getAll() {
        let records = [];
        await onValue(ref(GetFirebaseInstance(),  'users'), (snapshot)=>{
            snapshot.forEach(chldSnapshot => {
                let key = chldSnapshot.key;
                let data = chldSnapshot.val();
                data.uuid = key;
                records.push(data);
            });
        });
        return records;
    }

    async create(payload) {
        return await set(ref(GetFirebaseInstance(), 'users/' + uuidv4()), payload);
    }

    async update(uuid, payload) {
        return await update(ref(GetFirebaseInstance(), 'users/' + uuid), payload);
    }

    async delete(uuid) {
        return await remove(ref(GetFirebaseInstance(), 'users/' + uuid));
    }

    async deleteAll() {
        return await remove(ref(GetFirebaseInstance(), 'users'));
    }
}

export default new UsersDataService();