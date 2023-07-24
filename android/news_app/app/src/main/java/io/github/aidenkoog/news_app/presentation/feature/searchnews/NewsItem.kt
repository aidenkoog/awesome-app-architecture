package io.github.aidenkoog.news_app.presentation.feature.searchnews

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import coil.compose.AsyncImage
import io.github.aidenkoog.news_app.R
import io.github.aidenkoog.news_app.domain.model.News
import io.github.aidenkoog.news_app.presentation.theme.dimenLarge
import io.github.aidenkoog.news_app.presentation.theme.dimenMedium
import io.github.aidenkoog.news_app.presentation.theme.dimenXXLarge

@Preview(showBackground = true)
@Composable
fun NewsItemPreview() {
    NewsItem(
        news = News(
            author = "Main author",
            title = "This is a long looong looooong long looong looooong long looong looooong title",
            description = "",
            url = "",
            urlToImage = "",
            content = ""
        )
    ) {
        // no-op
    }
}

/**
 * News item layout.
 */
@Composable
fun NewsItem(
    news: News,
    onNewsClick: (News) -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable {
                onNewsClick(news)
            },
        // TODO Define spacing in a dimensions file
        shape = RoundedCornerShape(dimenLarge),
        elevation = CardDefaults.cardElevation(
            defaultElevation = dimenMedium
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = dimenMedium, vertical = dimenMedium)
        ) {
            AsyncImage(
                modifier = Modifier.size(dimenXXLarge),
                model = news.urlToImage,
                contentDescription = null,
                placeholder = painterResource(id = R.drawable.ic_news_placeholder),
                error = painterResource(id = R.drawable.ic_news_placeholder)
            )
            Text(
                modifier = Modifier.padding(start = dimenMedium),
                text = news.title,
                color = MaterialTheme.colorScheme.primary,
                style = MaterialTheme.typography.titleLarge,
                maxLines = 2
            )
        }
    }
}