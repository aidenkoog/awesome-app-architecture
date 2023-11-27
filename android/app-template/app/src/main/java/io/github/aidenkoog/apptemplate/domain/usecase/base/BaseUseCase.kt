package io.github.aidenkoog.apptemplate.domain.usecase.base

/**
 * Refs.
 * only allow Result<DataType> as parameter.
 */
abstract class UseCase<out Type, in Params> where Type : Any {
    abstract suspend operator fun invoke(params: Params): Type?
}

abstract class ResultUseCase<out DataType, in Param> : UseCase<Result<DataType>, Param>()