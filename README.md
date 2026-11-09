# Li Construction LLC website (mock)

A plain HTML, CSS and JavaScript site. No build step, no dependencies.
All content comes from one file, so you can fill it in from VS Code.

## Run it

Easiest: install the "Live Server" extension in VS Code, right-click
`index.html`, choose "Open with Live Server". You can also just double-click
`index.html`.

## Edit your content

Open `data/site-data.js`. Everything is in there:

| Section        | Key in the file         |
| -------------- | ----------------------- |
| Page title/SEO | `seo`                   |
| Phone, email, address, hours, license, service areas | `company` |
| Social links   | `social`                |
| Menu links     | `nav`                   |
| Top banner     | `hero`                  |
| Services       | `services.items`        |
| Projects       | `projects.items`        |
| About          | `about`                 |
| Numbers band   | `stats`                 |
| Process steps  | `process.steps`         |
| Reviews        | `reviews.items`         |
| Quote form     | `contact`               |

Rules of thumb:

- Set a value to `""` or `[]` and that part of the page hides itself.
- Everything in the file right now is SAMPLE content (numbers, reviews,
  descriptions). Replace or delete it before going live. The stats and
  reviews especially should only show real numbers and real quotes.
- Project categories are read from your projects, and the filter buttons
  build themselves. Add a project with a new `category` and a new button
  appears.

## Photos

1. Put images in `assets/img/`.
2. Point to them in the data file, for example `image: "assets/img/kitchen-1.jpg"`.
3. Projects can also have `gallery: ["assets/img/a.jpg", "assets/img/b.jpg"]`
   which shows in the project popup.
4. The hero accepts `hero.image` for a background photo (it gets a dark
   overlay so the text stays readable).

Empty `image` fields show a neutral placeholder.

## Quote form

By default the form opens the visitor's email app with the message filled in.
To have it submit in the background, create a form on a service such as
Formspree and paste the URL into `contact.formEndpoint`.

## Put it online with GitHub Pages (domain: liconstructiongroup.com)

Already set up in this folder: `CNAME` (your domain), `.nojekyll`,
`robots.txt`, `sitemap.xml`, and canonical and social tags in `index.html`.

1. Create a new GitHub repo and push this folder to it yourself.
   Free GitHub Pages needs a public repo.
2. Repo Settings > Pages > Source: "Deploy from a branch", branch `main`,
   folder `/ (root)`.
3. Still in Pages, enter `liconstructiongroup.com` as the custom domain
   and save. Tick "Enforce HTTPS" once it becomes available.
4. At your registrar, open DNS and add these records. Delete any old
   parking or forwarding records for the domain first.

   | Type  | Host | Value                              |
   | ----- | ---- | ---------------------------------- |
   | A     | @    | 185.199.108.153                    |
   | A     | @    | 185.199.109.153                    |
   | A     | @    | 185.199.110.153                    |
   | A     | @    | 185.199.111.153                    |
   | CNAME | www  | `<your-github-username>.github.io` |

   Optional IPv6 (AAAA, host @): 2606:50c0:8000::153, 2606:50c0:8001::153,
   2606:50c0:8002::153, 2606:50c0:8003::153.
5. Wait for DNS (minutes to a few hours). GitHub then issues the HTTPS
   certificate on its own. With both records set, `www` redirects to the
   plain domain.
6. Optional but recommended: verify the domain in your GitHub account
   settings (Pages > Add a domain) so nobody else can claim it.

If you later change the domain, update `CNAME`, `robots.txt`, `sitemap.xml`
and the two URLs in `index.html`.

## Colors and fonts

Open `css/styles.css`. The palette is at the top in `:root`.

- Black `#0B0B0B` and gold `#DBA50F` come from the logo.
- Gold is used as text only on dark backgrounds (8.8:1 contrast).
- On light backgrounds, gold-colored text uses bronze `#8A6100` (5.5:1).
  Gold on white is only about 2.2:1 and fails accessibility checks.
- Font is Montserrat from Google Fonts (linked in `index.html`).

## Logo files

- `assets/logo-icon.svg` for dark backgrounds (white and gold)
- `assets/logo-icon-dark.svg` for light backgrounds (black and gold)
- `assets/favicon.svg` browser tab icon

These are redrawn as vectors from the logo image, so they stay sharp at any
size. If you have the original vector logo, swap them in with the same names.

## Files

```
index.html          page structure
css/styles.css      all styling
js/app.js           builds the page from the data file
data/site-data.js   YOUR CONTENT (edit this)
assets/             logo files and images
```
