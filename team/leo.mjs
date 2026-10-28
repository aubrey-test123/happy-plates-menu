// Leo's changes for this weekend's menu (see MENU-NOTES.md). The "Bring in Leo's branch" Action runs this once.
// Leo is a made-up teammate. Like any teammate, he can make mistakes, and a reviewer checks his work against the notes.
import { readFileSync, writeFileSync } from 'node:fs';

let html = readFileSync('index.html', 'utf8');
const swap = (from, to) => {
  if (!html.includes(from)) {
    console.log(`::error::Leo's changes need the starting menu, but index.html on main has changed (couldn't find: ${from.trim().split('\n')[0]}). Ask an instructor in the virtual office.`);
    process.exit(1);
  }
  html = html.replace(from, to);
};

// New Pad Thai price
swap('<p class="price">$13.50</p>', '<p class="price">$14.05</p>');

// Garden Veggie Chili block
swap(`      <article class="dish">
        <img src="photos/veggie-chili.jpg" alt="A bowl of three-bean chili with corn, peppers and sour cream">
        <h3>Garden Veggie Chili</h3>
        <p class="desc">Three beans, sweet corn and peppers, slow-cooked with smoked paprika.</p>
        <p class="price">$11.50</p>
      </article>

`, '');

// The New this week line
swap('<p class="new">New this week: Teriyaki Salmon</p>', '<p class="new">New this week: Crispy Tofu Ramen and Chicken Satay Skewers</p>');

// The two weekend specials, in their own section after Mains
swap('    <h2>Desserts</h2>', `    <h2>Weekend specials</h2>
    <section class="menu">

      <article class="dish">
        <img src="photos/tofu-ramen.jpg" alt="A bowl of ramen with crispy tofu, a soft egg and bok choy">
        <h3>Crispy Tofu Ramen</h3>
        <p class="desc">Crispy tofu, noodles, a soft egg and bok choy in a ginger broth.</p>
        <p class="price">$15.50</p>
      </article>

      <article class="dish">
        <img src="photos/satay-skewers.jpg" alt="A bowl of ramen with crispy tofu, a soft egg and bok choy">
        <h3>Chicken Satay Skewers</h3>
        <p class="desc">Grilled chicken skewers with satay sauce and a cucumber salad.</p>
        <p class="price">$12.50</p>
      </article>

    </section>

    <h2>Desserts</h2>`);

// New dessert name
swap('<h3>Mango Sticky Rice</h3>', '<h3>Mango Cocnut Sticky Rice</h3>');

writeFileSync('index.html', html);
console.log("Leo's changes are in index.html.");
