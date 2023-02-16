import axios from 'axios';
import Gzip from 'rn-gzip';

export const fetchGzFile = url => {
    const request = {
        url,
        method: 'get',
        responseType: 'arraybuffer',
        decompress: true
    }
    return new Promise((resolve, reject) => {
        axios(request)
        .then(response => resolve(Gzip.unzip(response.data)))
        .catch(error => reject(error)); 
    })
}