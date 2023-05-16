import LocalizedStrings from 'react-native-localization';
import * as english from './en.json'
import * as germany from './de.json'
import * as korean from './ko.json'
import * as Japanese from './ja.json'

export const originalStrings = {
    en: english,
    de: germany,
    ko: korean,
    ja: Japanese
}

let strings = new LocalizedStrings(originalStrings)

export default strings
