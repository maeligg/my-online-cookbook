---
pagination:
  data: collections
  size: 1
  alias: selectedTag
permalink: /tags/{{ selectedTag | noEmoji | slug }}/
layout: layouts/recipes-list.njk
title: recipes
eleventyComputed:
  metaTitle: All {{ selectedTag | noEmoji | lowercase }} recipes
---
