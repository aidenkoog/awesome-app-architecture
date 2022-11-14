import { stringToBytes } from "convert-string"

const CryptoJS = require("crypto-js")

/**
 * secret key information.
 */
export const KEY_HEXS = [
    0x36, 0x8B, 0x01, 0x39,
    0x6D, 0x89, 0x1F, 0x66,
    0x40, 0xD5, 0x98, 0xD2,
    0x40, 0x54, 0x4C, 0xB8
]
export const KEY_HEX_STRING = "368B01396D891F6640D598D240544CB8"
export const KEY_HEX_STRING_2ND =
    "\x36" + "\x8B" + "\x01" + "\x39"
    + "\x6D" + "\x89" + "\x1F" + "\x66"
    + "\x40" + "\xD5" + "\x98" + "\xD2"
    + "\x40" + "\x54" + "\x4C" + "\xB8"

export const KEY_BYTES = stringToBytes(
    "\x36" + "\x8B" + "\x01" + "\x39"
    + "\x6D" + "\x89" + "\x1F" + "\x66"
    + "\x40" + "\xD5" + "\x98" + "\xD2"
    + "\x40" + "\x54" + "\x4C" + "\xB8")

/**
 * custom secret key definition.
 */
export const CUSTOM_SECRET_KEY = CryptoJS.enc.Hex.parse(KEY_HEX_STRING)

/**
 * initialize vector information.
 */
export const IV_HEXS = [
    0xA6, 0xA6, 0xA6, 0xA6,
    0xA6, 0xA6, 0xA6, 0xA6
]
export const IV_HEX_ARRAY = ["A6", "A6", "A6", "A6", "A6", "A6", "A6", "A6"]
export const IV_HEX_STRING = "A6A6A6A6A6A6A6A6"
export const IV_HEX_STRING_2ND =
    "\xA6" + "\xA6" + "\xA6" + "\xA6"
    + "\xA6" + "\xA6" + "\xA6" + "\xA6"

export const IV_BYTES = stringToBytes(
    "\xA6" + "\xA6" + "\xA6" + "\xA6"
    + "\xA6" + "\xA6" + "\xA6" + "\xA6"
)

/**
 * custom iv definition.
 */
export const CUSTOM_IV = CryptoJS.enc.Hex.parse(IV_HEX_STRING)

/**
 * crypto
 */
export const CRYPTO_A128CBC = 0x40
export const CRYPTO_SHA256 = 0x10
export const CRYPTO_A128KW = 0x01
export const CRYPTO_HS_AAD = CRYPTO_A128CBC | CRYPTO_SHA256 | CRYPTO_A128KW

export const CRYPTO_HS_AL = [
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x08
]