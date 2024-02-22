import { getCurrentUser } from '../../services/apis/auth';

export async function rootLoader() {
    return getCurrentUser();
}