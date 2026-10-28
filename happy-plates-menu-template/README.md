# Happy Plates menu

The menu website for **Happy Plates**, a made-up meal kit company. This repo is a practice repo for the Starter School **Pull Request Challenge**.

The live site is built from the **main** branch. So nobody edits main directly. Every change goes on its own branch, then through a pull request, where 3 automatic checks and a teammate look at it before it's merged.

## Add a dish

1. Make a branch called `add-dish-` plus your first name, like `add-dish-aaron`.
2. Open `index.html` and click the pencil (Edit this file). Check that the branch button says your branch, not `main`.
3. Paste this block right above the line `<!-- END OF MAINS: add new mains above this line -->`:

```html
      <article class="dish">
        <img src="photos/PHOTO-FILE.jpg">
        <h3>DISH NAME</h3>
        <p class="desc">ONE SENTENCE ABOUT THE DISH.</p>
        <p class="price">$0.00</p>
      </article>

```

4. Replace the 4 parts in capitals and the price. Leave one empty line under your block.
5. At the top of the file, change the **New this week** line to your dish's name, like `<p class="new">New this week: Crunchy Fish Tacos</p>`.
6. Click **Commit changes...**, write a message that says what changed, keep **Commit directly to the add-dish-... branch**, and click **Commit changes**.

### Photos you can use

Pick one for your dish. Type the file name exactly, like `photos/fish-tacos.jpg`.

| File | What's in the photo |
|---|---|
| `fish-tacos.jpg` | three fish tacos with purple slaw and lime |
| `cheeseburger.jpg` | a cheeseburger with potato wedges |
| `garden-salad.jpg` | greens, tomatoes, cucumber, avocado and feta |
| `dumplings.jpg` | six pan-fried dumplings with soy sauce |
| `pancakes.jpg` | three pancakes with berries and syrup |
| `smoothie-bowl.jpg` | an acai bowl with banana, granola and berries |
| `veggie-curry.jpg` | vegetable coconut curry with rice |
| `margherita-pizza.jpg` | a small margherita pizza with basil |
| `sushi-rolls.jpg` | eight salmon and avocado rolls |
| `burrito-bowl.jpg` | rice, beans, chicken, salsa and guacamole |

## The 3 automatic checks

GitHub runs these on every pull request (`.github/workflows/menu-checks.yml`). Each one shows a green check or a red X.

| Check | What it tests | Passes | Fails |
|---|---|---|---|
| Prices look like $12.50 | every price is a dollar sign, dollars, a dot and 2 cents digits, from $5.00 to $25.00 | `$12.50` | `12.50`, `$12.5`, `$0.00` |
| Every photo has alt text | every `<img>` has `alt="..."` with at least 3 words | `alt="Three fish tacos with lime"` | no alt, `alt="photo"` |
| Every photo file exists | every photo is a real file in the `photos` folder | `photos/fish-tacos.jpg` | `photos/fish-taco.jpg` |

When a check fails, click **Details** to see the line number and how to fix it.

## When two people change the same line

That's a merge conflict. Git won't guess which version is right, so GitHub shows both versions between marker lines:

```
<<<<<<< your-branch
(your version of the line)
=======
(the version on main)
>>>>>>> main
```

**Our rule: don't throw away a teammate's change.** Write one line that keeps both changes, then delete the 3 marker lines. Then click **Mark as resolved** and **Commit merge**.

## Team

- **Maya** (operations) writes `MENU-NOTES.md`: the prices and the rules.
- **Leo** makes menu changes on his own branch. To bring in his branch, go to **Actions**, click **Bring in Leo's branch**, then **Run workflow**.
- **You** add a dish and review Leo's pull request.

Questions? Walk over to an instructor in the Starter School virtual office.
