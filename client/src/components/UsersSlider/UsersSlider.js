import './UsersSlider.scss';
import React, { useCallback } from 'react';
import { Slider } from '../Slider/Slider';

const ALL_USERS_ITEM = {
    displayName: 'Общий',
};

export const UsersSlider = ({ selected, users, onChange }) => {
    const getUserValue = useCallback((user) => {
        const usersValuesMap = new Map([
            [ALL_USERS_ITEM, null],
            ...users.map(user => [user, user]),
        ]);
        return usersValuesMap.get(user);
    }, [users]);

    const getUsersWithCommon = useCallback(() => {
        return [ALL_USERS_ITEM, ...users];
    }, [users]);

    const getSelectedUserIndex = useCallback((selected) => {
        const selectedUserIndex = getUsersWithCommon().findIndex(user => selected === getUserValue(user));
        return selectedUserIndex === -1 ? getSelectedUserIndex(getUserValue(ALL_USERS_ITEM)) : selectedUserIndex;
    }, [users]);

    const renderUserItem = useCallback((user) => {
        return (
            <div className='users-slider__user-wrapper'>
                <span className='users-slider__user'>{user?.displayName}</span>
            </div>
        );
    }, []);

    const handleChange = useCallback((position) => {
        const user = getUsersWithCommon()[position];
        onChange && onChange(getUserValue(user));
    }, [onChange]);

    return (
        <Slider
            className='users-slider'
            initialSlide={getSelectedUserIndex(selected)}
            items={getUsersWithCommon()}
            renderItem={renderUserItem}
            afterChange={handleChange}
        />
    );
};
