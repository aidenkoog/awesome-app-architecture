package io.github.aidenkoog.apptemplate.presentation.adapter

class BaseItem {
    private val objects = HashMap<String, Any?>()

    fun put(key: String, value: Any?) {
        objects[key] = value
    }

    operator fun get(key: String): Any? = objects.getOrDefault(key, null)

    val size: Int
        get() = objects.size

    /*
     * Warning and errors occur in DiffUtil when override equals method is removed.
     */
    override fun equals(other: Any?): Boolean = super.equals(other)

    override fun hashCode(): Int = objects.hashCode()

    companion object {
        const val KEY_VIEWTYPE = "viewType"
    }
}