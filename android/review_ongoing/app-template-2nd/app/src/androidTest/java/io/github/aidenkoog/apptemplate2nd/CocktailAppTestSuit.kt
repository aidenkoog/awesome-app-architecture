package io.github.aidenkoog.apptemplate2nd

import io.github.aidenkoog.apptemplate2nd.data.local.AppDatabaseTest
import io.github.aidenkoog.apptemplate2nd.data.local.CocktailDaoTest
import org.junit.runner.RunWith
import org.junit.runners.Suite

@RunWith(Suite::class)
@Suite.SuiteClasses(
    ExampleInstrumentedTest::class,
    AppDatabaseTest::class,
    CocktailDaoTest::class
)
class CocktailAppTestSuit