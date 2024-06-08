import { atom} from 'recoil';


export const api = atom({
    key: 'api-key', // unique key for this atom
    default: `${import.meta.env.VITE_BACKEND_URL}/api/v1/`
});


