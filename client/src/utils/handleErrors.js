import { ERROR_MESSAGE_DURATION } from '../constants/errors';

export const handleErrors = (notifier) => (errors) => {
    Object.values(errors || {}).map((error, index) => {
        notifier.error(error, ERROR_MESSAGE_DURATION * (index + 1));
    });
};
