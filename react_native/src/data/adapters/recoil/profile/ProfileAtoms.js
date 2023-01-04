import { atom } from 'recoil'
import Constants from '../../../../utils/Constants'

/**
 * represent the prefile info used when user set or edit it.
 */
export const profileInfoAtom = atom({
    key: 'profileInfoAtom',
    default: {
        profileImage: Constants.COMMON.DEFAULT_DATA,
        profileName: Constants.COMMON.DEFAULT_DATA,
        profileGender: Constants.COMMON.DEFAULT_DATA,
        profileBirthday: Constants.COMMON.DEFAULT_DATA,
        profileHeight: Constants.COMMON.DEFAULT_DATA,
        profileWeight: Constants.COMMON.DEFAULT_DATA,
    },
});
