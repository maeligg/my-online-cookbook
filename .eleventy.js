const Image = require('@11ty/eleventy-img');
const util = require('util');

const emojiRegex = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug

module.exports = config => {
    config.setUseGitIgnore(false);
    config.addWatchTarget("./src/_includes/css/main.css");
    
    config.addPassthroughCopy({ public: './' });
    config.addPassthroughCopy('src/img');
    config.addPassthroughCopy('src/fonts');
    config.addPassthroughCopy('src/admin');


    /* Collections */
    config.addCollection('recipes', collection => {
        return [...collection.getFilteredByGlob('./src/recipes/*.md')];
    });

    config.addCollection('tagList', collection => {
        const tagsSet = new Set();
        collection.getAll().forEach(item => {
          if (!item.data.tags) return;
          item.data.tags
            .filter(tag => !['recipes'].includes(tag))
            .forEach(tag => tagsSet.add(tag));
        });
        return Array.from(tagsSet).sort((first, second) => {
            const firstStartingLetter = first.replace(emojiRegex, '').trim()[0].toLowerCase();
            const secondStartingLetter = second.replace(emojiRegex, '').trim()[0].toLowerCase();

            if(firstStartingLetter < secondStartingLetter) { return -1; }
            if(firstStartingLetter > secondStartingLetter) { return 1; }
            return 0;
        });
    });


    /* Filters */
    config.addFilter('console', function(value) {
        return util.inspect(value);
    });

    config.addFilter('noEmoji', function(value) {
        return value.replace(emojiRegex, '').trim();
    });

    config.addFilter('onlyEmoji', function(value) {
        let match = value.match(emojiRegex);
        // If the string doesn't contain any emoji, instead we output the first letter wrapped in some custom styles
        if (!match) {
            match = `<span class="c-card__tag-first-letter">${value.charAt(0)}</span>`
        }
        return Array.isArray(match) ? match.join('') : match;
    });

    config.addFilter('limit', (arr, limit) => arr.slice(0, limit));

    config.addFilter('lowercase', function(value) {
        return value.toLowerCase();
    });

    // This workaround is needed so we can transform it back into an array with Alpine (we can't split on "," as it can be included within the items)
    config.addFilter('arrayToString', function(value) {
        return value.join('£');
    });

    /* Shortcodes */
    const imageShortcode = async (src, className, alt, sizes) => {
        let metadata = await Image(src.includes('http') ? src : `./src/${src}`, {
            widths: [600, 1500, 3000],
            formats: ['webp', 'jpeg'],
            outputDir: './_site/img/recipes',
            urlPath: '/img/recipes/'
        });
    
        let imageAttributes = {
            class: className,
            alt,
            sizes,
            loading: "lazy",
            decoding: "async"
        };
    
        return Image.generateHTML(metadata, imageAttributes);
    }

    config.addNunjucksAsyncShortcode('recipeimage', imageShortcode);
    config.addShortcode('year', () => `${new Date().getFullYear()}`);

    return {
        dir: {
            input: 'src',
            output: '_site',
            includes: '_includes',
            data: '_data'
        },
        passthroughFileCopy: true
    }
};