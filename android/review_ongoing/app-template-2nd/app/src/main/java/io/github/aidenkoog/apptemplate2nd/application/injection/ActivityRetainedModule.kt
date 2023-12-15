package io.github.aidenkoog.apptemplate2nd.application.injection

import io.github.aidenkoog.apptemplate2nd.domain.CocktailRepository
import io.github.aidenkoog.apptemplate2nd.domain.DefaultCocktailRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ActivityRetainedComponent
import kotlinx.coroutines.ExperimentalCoroutinesApi

@Module
@InstallIn(ActivityRetainedComponent::class)
abstract class ActivityRetainedModule {
    @OptIn(ExperimentalCoroutinesApi::class)
    @Binds
    abstract fun dataSource(impl: DefaultCocktailRepository): CocktailRepository
}