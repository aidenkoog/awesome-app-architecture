package io.github.aidenkoog.expense_management.presentation.expense_details

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import io.github.aidenkoog.expense_management.R
import io.github.aidenkoog.expense_management.common.Constants.DEMO_IMAGE_URL
import io.github.aidenkoog.expense_management.domain.model.Expense
import io.github.aidenkoog.expense_management.presentation.expenses_list.components.TopAppBar
import io.github.aidenkoog.expense_management.presentation.expenses_list.components.HeightSpacer
import io.github.aidenkoog.expense_management.presentation.expenses_list.components.RemoteImage
import io.github.aidenkoog.expense_management.presentation.expenses_list.components.style.sourceTextColor
import io.github.aidenkoog.expense_management.presentation.expenses_list.components.style.sourceTextColorDark
import java.text.SimpleDateFormat
import java.util.*


@Composable
fun ExpenseDetailsScreen(expense: Expense,  navHostController: NavHostController) {

    val stringRes = R.string.expense_details
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colors.primary
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            TopAppBar(stringRes)

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color.White)
                    .padding(20.dp)
                    .verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.Top
            ) {

                Row(
                    modifier = Modifier.padding(top = 20.dp, start = 20.dp, end = 20.dp, bottom = 10.dp)
                ) {

                    Column (
                        horizontalAlignment = Alignment.Start
                    )  {

                        Text(
                            text = stringResource(
                                id = R.string.merchant),
                            color = sourceTextColorDark,
                            fontSize = 12.sp

                        )


                        expense?.expenseVenueTitle?.toString()?.let {
                            Text(
                                text = it,
                                color = sourceTextColor,
                                fontSize = 18.sp,

                                )
                        }

                    }

                    Spacer(Modifier.weight(1f))

                    RemoteImage(
                        url = DEMO_IMAGE_URL,
                        modifier = Modifier.requiredSize(30.dp)
                    )


                }

                HeightSpacer(value = 5.dp)
                Divider(
                    color = sourceTextColorDark,
                    thickness = 0.2.dp

                )

                Row(
                    modifier = Modifier.padding(top = 20.dp, start = 20.dp, end = 20.dp, bottom = 10.dp)
                ) {

                    Column (
                        horizontalAlignment = Alignment.Start
                    )  {

                        Text(
                            text = stringResource(
                                id = R.string.total),
                            color = sourceTextColorDark,
                            fontSize = 12.sp

                        )

                        expense?.amount?.toString()?.let {
                            Text(
                                text = "$$it",
                                color = sourceTextColor,
                                fontSize = 20.sp,

                                )
                        }

                    }

                    Spacer(Modifier.weight(1f))


                    OutlinedButton(onClick = { },
                        modifier= Modifier.wrapContentSize(),
                        shape = RoundedCornerShape(10.dp),
                        border= BorderStroke(1.dp, Color.Blue),
                        contentPadding = PaddingValues(0.dp),
                        colors = ButtonDefaults.outlinedButtonColors(contentColor =  Color.Blue)
                    ) {

                        expense?.currencyCode?.let {
                            Text(
                                text = it,
                                color = Color.Blue,
                                fontSize = 14.sp

                            )
                        }

                    }


                }

                HeightSpacer(value = 5.dp)
                Divider(
                    color = sourceTextColorDark,
                    thickness = 0.2.dp

                )


                Row(
                    modifier = Modifier.padding(top = 20.dp, start = 20.dp, end = 20.dp, bottom = 10.dp),
                    verticalAlignment = Alignment.CenterVertically

                ) {

                    Column (
                        horizontalAlignment = Alignment.Start
                    )  {

                        Text(
                            text = stringResource(
                                id = R.string.date),
                            color = sourceTextColorDark,
                            fontSize = 12.sp

                        )


                        expense?.date?.let {
                            Text(
                                text = it.extDateFormatterFull(),
                                color = sourceTextColorDark,
                                fontSize = 16.sp

                            )
                        }

                    }

                    Column (
                        horizontalAlignment = Alignment.Start,
                        modifier = Modifier.padding(start = 50.dp)
                    )  {

                        Text(
                            text = stringResource(
                                id = R.string.category),
                            color = sourceTextColorDark,
                            fontSize = 12.sp

                        )

                        expense?.tripBudgetCategory?.let {
                            Text(
                                text = it,
                                color = sourceTextColorDark,
                                fontSize = 16.sp

                            )
                        }


                    }

                }

                HeightSpacer(value = 5.dp)
                Divider(
                    color = sourceTextColorDark,
                    thickness = 0.2.dp

                )


                Box(
                    Modifier
                        .fillMaxWidth()
                        .height(200.dp)
                        .padding(top = 30.dp)
                        .background(Color.LightGray)
                        .clip(CircleShape)

                ) {

                    expense?.description?.let {
                        Text(
                            text = it,
                            color = sourceTextColorDark,
                            fontSize = 16.sp

                        )
                    }
                }
            }


        }
    }


}



fun String.extDateFormatterFull(): String {
    val parser = SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH)
    val formatter = SimpleDateFormat("MMM dd, yyyy", Locale.ENGLISH)

    return formatter.format(parser.parse(this)!!)
}