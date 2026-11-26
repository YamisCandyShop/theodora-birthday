# For Theodora — Birthday Website

A responsive, single-page birthday surprise inspired by the supplied penguin-themed video. Built with plain HTML, CSS and JavaScript; no build tools or dependencies required.

## Preview locally

Open `index.html` in a browser. For best results, use a small local server or the GitHub Pages URL after publishing.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new **Public** repository, e.g. `theodora-birthday`.
2. Upload **all files and folders inside this project** (make sure `index.html` is at the repository root).
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then press **Save**.
6. Wait a minute or two. GitHub will show the public website URL in the Pages section.

## Personalize it

- The birthday message, signature and final note can be edited with **EDIT THIS SURPRISE** while previewing. Those edits are local to that browser until you also update the matching text in `index.html` and upload it to GitHub.
- On the birthday screen, use **Add a photo of you two** to preview a photo. To publish a photo for Theodora too, put the image in `assets/` and replace the photo placeholder in `index.html` with an image path such as `assets/us.jpg`.
- Change the name by searching for `THEODORA` / `Theodora` in `index.html`.

## Files

- `index.html` — page content
- `style.css` — design and responsive layout
- `script.js` — buttons, steps, penguin choices, photo preview and editor
- `assets/` — place your photos here

The photo picker previews a selected image only in the current browser session; it does not upload the photo to GitHub.
