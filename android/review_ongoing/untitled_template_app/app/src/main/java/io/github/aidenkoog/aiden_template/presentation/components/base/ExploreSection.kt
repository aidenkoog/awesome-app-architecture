/*
 * Copyright 2020 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.github.aidenkoog.aiden_template.presentation.components.base

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.windowInsetsBottomHeight
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.staggeredgrid.LazyVerticalStaggeredGrid
import androidx.compose.foundation.lazy.staggeredgrid.StaggeredGridCells
import androidx.compose.foundation.lazy.staggeredgrid.StaggeredGridItemSpan
import androidx.compose.foundation.lazy.staggeredgrid.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.material3.windowsizeclass.WindowWidthSizeClass
import androidx.compose.runtime.Composable
import androidx.compose.samples.crane.data.ExploreModel
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import io.github.aidenkoog.aiden_template.presentation.theme.DarkBackground
import io.github.aidenkoog.aiden_template.presentation.theme.DarkThemeLightTextColor
import io.github.aidenkoog.aiden_template.presentation.theme.LightBackground
import io.github.aidenkoog.aiden_template.presentation.theme.LightThemeDarkTextColor
import io.github.aidenkoog.aiden_template.presentation.theme.crane_caption
import io.github.aidenkoog.aiden_template.presentation.ui.dashboard.OnExploreItemClicked

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun ExploreSection(
    darkTheme: Boolean,
    widthSize: WindowWidthSizeClass,
    modifier: Modifier = Modifier,
    title: String,
    exploreList: List<ExploreModel>,
    onItemClicked: OnExploreItemClicked
) {
    Surface(modifier = modifier.fillMaxSize()
        , color = if(darkTheme) DarkBackground else LightBackground
    ) {
        Column(modifier = Modifier.padding(start = 24.dp, top = 20.dp, end = 24.dp)) {
            Text(
                text = title,
                style = MaterialTheme.typography.h3.copy(color = if (darkTheme) DarkThemeLightTextColor else LightThemeDarkTextColor )
            )

            Spacer(Modifier.height(8.dp))

            LazyVerticalStaggeredGrid(
                columns = StaggeredGridCells.Adaptive(200.dp),
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                content = {
                    itemsIndexed(exploreList) { _, exploreItem ->
                        when (widthSize) {
                            WindowWidthSizeClass.Medium, WindowWidthSizeClass.Expanded -> {
                                ExploreItemColumn(
                                    modifier = Modifier.fillMaxWidth(),
                                    item = exploreItem,
                                    onItemClicked = onItemClicked,
                                    darkTheme = darkTheme
                                )
                            }
                            else -> {
                                ExploreItemRow(
                                    modifier = Modifier.fillMaxWidth(),
                                    item = exploreItem,
                                    onItemClicked = onItemClicked
                                )
                            }
                        }
                    }
                    item(span = StaggeredGridItemSpan.FullLine) {
                        Spacer(
                            modifier = Modifier
                                .windowInsetsBottomHeight(WindowInsets.navigationBars)
                        )
                    }
                }
            )
        }
    }
}

/**
 * Composable with large image card and text underneath.
 */
@Composable
private fun ExploreItemColumn(
    darkTheme: Boolean,
    modifier: Modifier = Modifier,
    item: ExploreModel,
    onItemClicked: OnExploreItemClicked
) {
    Column(
        modifier = modifier
            .clickable { onItemClicked(item) }
            .padding(top = 12.dp, bottom = 12.dp)
    ) {
        ExploreImageContainer(modifier = Modifier.fillMaxWidth()) {
            ExploreImage(item)
        }
        Spacer(Modifier.height(8.dp))
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight()
        ) {
            Text(
                modifier = Modifier.fillMaxWidth(),
                text = item.city.nameToDisplay,
                style = MaterialTheme.typography.h2
            )
            Spacer(Modifier.height(4.dp))
            Text(
                modifier = Modifier.fillMaxWidth(),
                text = item.description,
                style = MaterialTheme.typography.caption.copy(color  = if (darkTheme) DarkThemeLightTextColor else LightThemeDarkTextColor)
            )
        }
    }
}

@Composable
private fun ExploreItemRow(
    modifier: Modifier = Modifier,
    item: ExploreModel,
    onItemClicked: OnExploreItemClicked
) {
    Row(
        modifier = modifier
            .clickable { onItemClicked(item) }
            .padding(top = 12.dp, bottom = 12.dp)
    ) {
        ExploreImageContainer(modifier = Modifier.size(64.dp)) {
            ExploreImage(item)
        }
        Spacer(Modifier.width(24.dp))
        Column(modifier = Modifier.fillMaxWidth()) {
            Text(
                text = item.city.nameToDisplay,
                style = MaterialTheme.typography.h3.copy(fontSize = 16.sp)
            )
            Spacer(Modifier.height(4.dp))
            Text(
                text = item.description,
                style = MaterialTheme.typography.h4.copy(fontSize = 14.sp)
            )
        }
    }
}

@Composable
private fun ExploreImage(item: ExploreModel) {
    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data(item.imageUrl)
            .crossfade(true)
            .build(),
        contentDescription = null,
        contentScale = ContentScale.Crop,
        modifier = Modifier.fillMaxSize(),
    )
}

@Composable
private fun ExploreImageContainer(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Surface(modifier.wrapContentHeight().fillMaxWidth(), RoundedCornerShape(4.dp)) {
        content()
    }
}
