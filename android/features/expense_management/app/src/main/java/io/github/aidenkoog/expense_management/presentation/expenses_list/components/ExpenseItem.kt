package io.github.aidenkoog.expense_management.presentation.expenses_list.components

import android.net.Uri
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.google.gson.Gson
import io.github.aidenkoog.expense_management.R
import io.github.aidenkoog.expense_management.common.Constants.DEMO_IMAGE_URL
import io.github.aidenkoog.expense_management.domain.model.Expense
import io.github.aidenkoog.expense_management.presentation.Screen
import io.github.aidenkoog.expense_management.presentation.expenses_list.components.style.ButtonBlue
import io.github.aidenkoog.expense_management.presentation.expenses_list.components.style.sourceTextColor
import io.github.aidenkoog.expense_management.presentation.expenses_list.components.style.sourceTextColorDark
import java.text.SimpleDateFormat
import java.util.*


@Composable
fun ExpenseRow(navController: NavController, expense: Expense, onClick: () -> Unit) {

    val json = Uri.encode(Gson().toJson(expense))

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(15.dp),
        elevation = 10.dp
    ) {
    Column(modifier = Modifier.clickable(onClick = {
        navController.navigate(Screen.ExpenseDetailsScreen.route + "/$json")
    }).padding(10.dp)
    ) {

        Row(
            modifier = Modifier

        ) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier
                    .size(25.dp)
                    .clip(CircleShape)
                    .background(ButtonBlue)
                    .padding(5.dp)
            ) {


            Icon(
                painter = painterResource(id = R.drawable.ic_profile),
                contentDescription = "Profile",
                tint = Color.White,
                modifier = Modifier.size(25.dp)
            )
            }
             WidthSpacer(value = 10.dp)

            expense.expenseVenueTitle?.let {
                Text(
                    modifier = Modifier
                        .fillMaxHeight()
                        .padding(start = 4.dp),
                    text = it,
                    color = sourceTextColor,
                    fontSize = 15.sp

                )
            }

            Spacer(Modifier.weight(1f))
            Column (

                horizontalAlignment = Alignment.End
            )  {


                expense.date?.let {
                    Text(
                        text = it.extDateFormatter(),
                        color = sourceTextColorDark,
                        fontSize = 10.sp

                    )
                }

                expense.amount.toString().let {
                    Text(
                        text = "$$it",
                        color = sourceTextColor,
                        fontSize = 16.sp,
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
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier
                .padding(0.dp)
                .clip(RoundedCornerShape(10.dp))
                .padding(horizontal = 0.dp, vertical = 8.dp)
                .fillMaxWidth()
        ) {

            OutlinedButton(onClick = { },
                modifier= Modifier.wrapContentSize(),
                shape = RoundedCornerShape(10.dp),
                border= BorderStroke(1.dp, Color.Blue),
                contentPadding = PaddingValues(0.dp),
                colors = ButtonDefaults.outlinedButtonColors(contentColor =  Color.Blue)
            ) {


                expense?.tripBudgetCategory.toString().let {
                    Text(
                        text = it,
                        color = Color.Blue,
                        fontSize = 10.sp

                    )
                }

            }

            RemoteImage(
                url = DEMO_IMAGE_URL,
                modifier = Modifier.requiredSize(30.dp)
            )

        }
    }
    }
}

@Composable
fun ExpenseList(navController: NavController, expenses: List<Expense>) {
    LazyColumn {
        items(expenses) { expense ->
            ExpenseRow(
                navController = navController,
                expense = expense,
                onClick = {}
            )
        }
    }
}

fun String.extDateFormatter(): String {
    val parser = SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH)
    val formatter = SimpleDateFormat("MMM dd", Locale.ENGLISH)

    return formatter.format(parser.parse(this)!!)
}

