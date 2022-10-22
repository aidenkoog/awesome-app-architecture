import { atom } from 'recoil';
import Constants from '../../../utils/Constants';

/*-----------------------------------------------------------------------------------
 * necessary profile related states.
 * 1. profile image.
 * 2. profile name.
 * 3. profile gender.
 * 4. profile birthday.
 * 5. profile height.
 * 6. profile weight.
 *----------------------------------------------------------------------------------*/

/**
 * represent the prefile info used when user set or edit it.
 */
export const profileInfo = atom({
    key: 'profileInfo',
    default: {
        profileImage: Constants.COMMON.DEFAULT_DATA,
        profileName: Constants.COMMON.DEFAULT_DATA,
        profileGender: Constants.COMMON.DEFAULT_DATA,
        profileBirthday: Constants.COMMON.DEFAULT_DATA,
        profileHeight: Constants.COMMON.DEFAULT_DATA,
        profileWeight: Constants.COMMON.DEFAULT_DATA,
    },
});
