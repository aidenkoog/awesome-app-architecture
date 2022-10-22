const profile = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_PROFILE':
        case 'SAVE_PROFILE_SUCCESS':
        case 'SAVE_PROFILE_FAILURE':
        default:
            return state;
    }
};

export default profile;
