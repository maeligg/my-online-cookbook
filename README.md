![My Online Cookbook logo](https://raw.githubusercontent.com/maeligg/my-online-cookbook/main/github-readme.svg)

# My Online Cookbook

My Online Cookbook is a starter kit to create your own website of recipes, using [Eleventy](https://11ty.io) and [Netlify CMS](https://www.netlifycms.org/). It is meant to be both highly accessible (including to non-developers), as well as fully customisable should you want to use it as a starting off point.

Presentation & set-up instructions : https://myonlinecookbook.xyz/

Demo (this is what you get out of the box) : [https://myonlinecookbook.netlify.app/](https://myonlinecookbook.netlify.app/)

Get started now by forking the project or deploy to Netlify : [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/maeligg/my-online-cookbook&stack=cms)

## Features

### 📘 Optimised for recipes
Unlike other general-purpose templates and website builders, My Online Cookbook is optimised for writing, reading and easily finding back your recipes. Quickly visualise which ingredients you need, navigate between recipes in the same categories, and automatically adapt quantities based on the number of servings.

### 💪 Powerful search
The kit includes a powerful live search system offering a UX on-par with third-party services like [Algolia](https://www.algolia.com/), without needing any external dependency or subscription service.


### 🧰 Lightweight & easily extendable
Easily customise the theme color and other site attributes using the global data files, or dive into the code and change anything. The CSS is authored using [Sass](https://sass-lang.com/) and following the [BEM](https://en.bem.info/) naming convention. JavaScript is added where needed using [Alpine](https://github.com/alpinejs/alpine) and following a component-based approach. Images are processed and optimised at build-time using the [Eleventy image plugin](https://www.11ty.dev/docs/plugins/image/). Apart from Alpine, there are no run-time dependencies, making the site both extremely lightweight and easy to pick up and modify.


## Running the site locally
1. `npm install` to install all dependencies
2. `npm run dev` to serve the site locally
3. `npm run build` to build the site for production


## Access the CMS admin interface
Go to `/admin` to access the admin interface (this also works locally). You'll need to configure a user with [Netlify Identity](https://docs.netlify.com/visitor-access/identity/) to log in. For more information on how to use or configure Netlify CMS go to [their documentation](https://www.netlifycms.org/docs/intro/). In addition to recipes, all site settings (primary color, etc) as well as labels are editable from this interface.


## Directory structure
* `.eleventy.js` has all the custom configuration for [Eleventy](https://11ty.io), including collections, filters and shortcodes.
* `src/_data` contains nav and site settings, also editable from the CMS admin interface.
* `src/_includes` contains layouts and reusable components (including SVG icons).
* `src/admin` contains the configuration for editable fields in Netlify CMS.
* `src/img` contains all images. Note that only images placed in `src/img/recipes` are editable from the CMS admin interface.
* `src/recipes` is your main content, with each recipe saved as a markdown file.
* Each other page is located at the root of `src/` as its own markdown or nunjucks file.
