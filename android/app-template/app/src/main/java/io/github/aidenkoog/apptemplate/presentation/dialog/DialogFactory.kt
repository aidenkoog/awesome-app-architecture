package io.github.aidenkoog.apptemplate.presentation.dialog

import android.content.Context
import android.content.DialogInterface
import android.view.KeyEvent
import android.view.View
import androidx.annotation.StringRes
import androidx.appcompat.app.AlertDialog
import io.github.aidenkoog.apptemplate.R

object DialogFactory {
    class Builder(context: Context) {

        private val builder: AlertDialog.Builder = AlertDialog.Builder(context)
        private var titleDividerColor: Int = 0

        fun setTitle(@StringRes resId: Int): Builder {
            builder.setTitle(resId)
            return this
        }

        fun setTitle(title: CharSequence): Builder {
            builder.setTitle(title)
            return this
        }

        fun setCustomTitle(view: View?): Builder {
            builder.setCustomTitle(view)
            return this
        }

        fun setTitleDividerColor(color: Int): Builder {
            this.titleDividerColor = color
            return this
        }

        fun setMessage(message: CharSequence): Builder {
            builder.setMessage(message)
            return this
        }

        fun setMessage(@StringRes resId: Int): Builder {
            builder.setMessage(resId)
            return this
        }

        fun setItems(
            items: Array<out CharSequence>,
            onSelected: (dialog: DialogInterface, witch: Int) -> Unit,
        ): Builder {
            builder.setItems(items) { dialog, witch ->
                onSelected(dialog, witch)
            }
            return this
        }

        fun setCancelable(cancelable: Boolean): Builder {
            builder.setCancelable(cancelable)
            return this
        }

        fun setPositiveButton(
            @StringRes resId: Int = R.string.label_ok,
            positive: ((dialog: DialogInterface, witch: Int) -> Unit)? = { dialog, _ -> dialog.dismiss() },
        ): Builder {
            builder.setPositiveButton(resId) { dialog, witch ->
                if (positive != null) {
                    positive(dialog, witch)
                }
            }
            return this
        }

        fun setDetailButton(
            @StringRes resId: Int = R.string.view_detail,
            positive: (
                dialog: DialogInterface, witch: Int,
            ) -> Unit = { dialog, _ -> dialog.dismiss() },
        ): Builder {
            builder.setPositiveButton(resId) { dialog, witch ->
                positive(dialog, witch)
            }
            return this
        }

        fun setNegativeButton(
            @StringRes resId: Int = R.string.label_cancel,
            negative: ((dialog: DialogInterface, witch: Int) -> Unit)? = { dialog, _ -> dialog.dismiss() },
        ): Builder {
            builder.setNegativeButton(resId) { dialog, witch ->
                if (negative != null) {
                    negative(dialog, witch)
                }
            }
            return this
        }

        fun setCancelListener(
            cancel: (
                dialog: DialogInterface,
            ) -> Unit = { dialog -> dialog.dismiss() },
        ): Builder {
            builder.setOnCancelListener { dialog ->
                cancel(dialog)
            }
            return this
        }

        fun setOnKeyListener(
            onKey: (dialog: DialogInterface, keyCode: Int, keyEvent: KeyEvent?) -> Boolean,
        ): Builder {
            builder.setOnKeyListener { dialog, keyCode, keyEvent ->
                onKey(
                    dialog, keyCode, keyEvent
                )
            }
            return this
        }

        fun setDismissListener(
            dismiss: (
                dialog: DialogInterface,
            ) -> Unit = { },
        ): Builder {
            builder.setOnDismissListener { dialog ->
                dismiss(dialog)
            }
            return this
        }

        fun create(): AlertDialog {
            return builder.create()
        }

        fun show(): AlertDialog {
            return builder.show()
        }

        fun setCloseButton(
            @StringRes resId: Int = R.string.label_close,
            negative: (
                dialog: DialogInterface, witch: Int,
            ) -> Unit = { dialog, _ -> dialog.dismiss() },
        ): Builder {
            builder.setNegativeButton(resId) { dialog, witch ->
                negative(dialog, witch)
            }
            return this
        }
    }
}