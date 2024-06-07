import { atom} from 'recoil';
import { BACKEND_URL } from '../config';



export const api = atom({
    key: 'api-key', // unique key for this atom
    default: `${BACKEND_URL}/api/v1/blog/`
});


