package io.github.aidenkoog.style1.viewholder;

import android.view.View;

import androidx.databinding.DataBindingUtil;
import androidx.databinding.ViewDataBinding;
import androidx.recyclerview.widget.RecyclerView;

public abstract class BaseViewHolder<T extends ViewDataBinding > extends RecyclerView.ViewHolder {
    private final T binding;
    public BaseViewHolder(View itemView) {
        super(itemView);
        this.binding =  DataBindingUtil.bind(itemView);
    }
    public T binding(){
        return binding;
    }

    abstract public void bind(Object object);
}
