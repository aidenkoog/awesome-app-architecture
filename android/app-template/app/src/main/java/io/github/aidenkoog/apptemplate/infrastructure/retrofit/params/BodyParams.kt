package io.github.aidenkoog.apptemplate.infrastructure.retrofit.params

class BodyParams : HashMap<String, Any?>() {
    /*
     * common body params.
     */
    fun putBody(key: String, body: Any?): BodyParams {
        put(key, body)
        return this
    }
}