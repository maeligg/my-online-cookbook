const searchHomeInput = document.querySelector('.js-search-home-input');
const searchHomeResultsWrapper = document.querySelector('.js-search-home-results');

let searchResults;

const clearChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const highlightText = (text, match) => {
    const index = text.toLowerCase().indexOf(match.toLowerCase());
    if (index === -1) return text;
    return text.substring(0, index) + '<span class="u-highlight">' + text.substring(index, index + match.length) + '</span>' + text.substring(index + match.length);
}

if (searchHomeInput) {
    // Fetch all recipes data when the user is about to search
    searchHomeInput.addEventListener('focus', () => {
        if (!searchResults) {
            fetch('/search.json').then(res => res.json()).then(res => {
                searchResults = res;
            });
        };
    });
    
    searchHomeInput.addEventListener('input', (e) => {
        const searchInput = e.target.value.toLowerCase();
        const results = [];
    
        clearChildNodes(searchHomeResultsWrapper);
    
        // For lower letter counts, results are unlikely to be relevant. So we don't show anything yet
        if (searchInput.length < 3) { return };
    
        searchResults.forEach(recipe => {
            // We search on both recipe titles and ingredients. This could easily be extended to include the recipe tags, body, etc
            const matchTitle = recipe.title.toLowerCase().includes(searchInput);
            const matchIngredients = recipe.ingredients.filter(ingredient => ingredient.toLowerCase().includes(searchInput));
    
            if (!matchTitle && !matchIngredients.length) { return };
    
            const match = {...recipe};
            if (matchTitle) { match.matchTitle = matchTitle };
            if (matchIngredients.length) { match.matchIngredients = matchIngredients };
    
            results.push(match)
        });
    
        // Now we have the search results, we just need to display them on the page
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.classList.add('c-search-block__search-result-title');
            const link = document.createElement('a');
            link.innerHTML = highlightText(result.title, searchInput);
            link.setAttribute('href', result.url);
            listItem.appendChild(link);
    
            if (result.matchIngredients) {
                const paragraph = document.createElement('p');
                paragraph.classList.add('c-search-block__search-result-ingredients');
                paragraph.innerHTML = 'Contains : ' + highlightText(result.matchIngredients.join(', '), searchInput);
                listItem.appendChild(paragraph);
            }
    
            searchHomeResultsWrapper.appendChild(listItem);
        });
    });
}
