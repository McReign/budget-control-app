import { RequestStatus } from '../components/RequestWrapper/RequestWrapper';

export const mapStoreRequestStateToRequestStatus = (data, loading, error) => {
    if (loading) {
        return RequestStatus.LOADING;
    }
    if (error) {
        return RequestStatus.ERROR;
    }
    if (data) {
        return RequestStatus.LOADED;
    }
    return null;
};
