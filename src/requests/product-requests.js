import {
    get
} from './helpers';
import { paths } from './config';

export function getProducts() {
    return get(paths.PRODUCTS).then(res => res.status === 200 ? res.json() : null);
}

export function getProduct(id) {
    return get(`${paths.PRODUCTS}/${id}`).then(res => res.status === 200 ? res.json() : null);
}