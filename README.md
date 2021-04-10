# Muvie - The Movie Database

A simple movie searching app. Uses [TMDB](https://www.themoviedb.org/) to query for various movie titles. 🎥

Site: [https://ceci21.github.io/muvie](https://ceci21.github.io/muvie)

---
## Table of Contents

- [Setup](#setup)
- [Post-Assignment Thoughts](#post-assignment-thoughts)

---
## Setup

To start the app, in the project directory, run

```
npm install && npm start
```

or with yarn,
```
yarn && yarn start
```
and view it in http://localhost:3000.

---
## Post-assignment thoughts

I picked create-react-app with a redux template for the starter to get off the ground quickly. I used Bulma for a CSS framework as I'm a big fan with how it looks, but I ended up only needing styles for several of the components. With more time, I would go back and remove the extra CSS that I'm not using, and just import the files that I need directly.

For searching, I added a debounce that waits a second after the user finishes typing to make a query. This was to prevent excessive API calls.

I implemented the site with mobile-first in mind. The number of cards per row changes depending on the screen size, which means the size of the cards shrinks once it reaches a breakpoint and increases til the next breakpoint. That decision introduces new problems such as dealing with how much space the description takes up on the screen, which was an interesting problem. If the description of the cards is too long, my solution was to cut off the description string, shorten the height of the description element, and add a "read more"/"read less" link to expand/contract the description. If the width of the screen changes, the number of characters that fits in the slimmed down preview changes. I also added a CSS transition so it expands smoothly. The amount of characters that fits in the "preview" was arbitrarily picked, so with more time I would have adjusted my solution to be a little less arbitrary and more eloquent.

The CSS animations for the titles was fun! At first, I went for a simple text shadow for the title, then had an idea for some groovy stripes animation. But the CSS animation grew and grew until it became too long. SASS provides @for's and @if's, so I would go back and refactor using that logic to reduce the amount of code written to that file. Something I really liked making was the shadows for the subtitle. It's very subtle, but the text shadow for "The Movie Database" changes based on whether it's located under "Muvie", and to the right of it.

I ran lighthouse scores. The desktop performance scored fairly well, but the mobile could have been better. I knew it had to do with the CSS animations and the extra CSS bloat from Bulma, which as said before, I would certainly slim down. Accessibility scores from lighthouse was a 98, with the contrast ratio being the only issue. Though lighthouse scores are helpful for gauging general accessibility of your site, it doesn't test everything so it's good to test it out with actual assistive technologies. With more time, I would have loved to spend more time testing it with a screen reader.

For testing, I just used simple react testing library and tested basic pieces of each component. With extra time, I would expand on it with integration testing.

Other stuff I added:
- floating action button in the corner to send you to the top that appears on mobile and tablet sizes
- image resolution is different depending on mobile or desktop
- an empty state (you can see it if you enter some random characters)
- you can click on card to go to the entry on TMDB

This was a fun project! Now have my own personal movie database app.

![Stephen Colbert eating popcorn with 3D glasses on, saying "This is getting good!"](https://media1.tenor.com/images/e886f7c71bb4664a97aa35f67ea636fd/tenor.gif?itemid=17602628)
