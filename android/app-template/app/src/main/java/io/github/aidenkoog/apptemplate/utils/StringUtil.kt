package io.github.aidenkoog.apptemplate.utils

object StringUtil {
    @JvmStatic
    fun isValidString(str: String?): Boolean {
        return !str.isNullOrEmpty() && str != "null" && str.trim { it <= ' ' } != ""
    }
}