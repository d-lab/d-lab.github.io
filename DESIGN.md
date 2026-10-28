# Design System

## Direction

The site blends a research website with an organisation website. It should feel as credible as an academic lab page, with publications, people, and evidence leading the content, and as confident and welcoming as a well-run organisation's site, with a strong first impression, clear offers, and visible momentum.

The research half sets the substance: real publications, named people, precise facts, and plain language. The organisation half sets the presentation: an image-led hero, bold brand surfaces, scannable feature sections, and clear calls to action.

Keep the lab's identity: the deep indigo of the navigation bar, the gold accent, and real group photography. Use them generously on identity surfaces such as the hero, page headers, call-to-action bands, and footer, and keep reading content calm and white. Avoid decoration that carries no information, such as blurred colour blobs, glassmorphism, and glowing gradients.

## Typography

The lab site uses the same type system as Stefano Civelli's personal site.

- Primary family: Geist Sans across headings, navigation, and body copy. Quicksand is retired, and body text is no longer set in Inconsolata.
- Metadata family: Inconsolata, reserved for dates, venues, roles, years, and compact eyebrows.
- Body text begins at 1rem with relaxed leading and a maximum measure of 65 characters.
- Headings: the homepage hero title reaches 3.5rem on wide screens; page titles reach 3rem in page header bands; section headings are 1.875 to 2.25rem; card titles are 1.125rem.
- Uppercase tracked labels are used for eyebrows only.

## Color

A white foundation carries reading content. The lab indigo carries identity surfaces. Gold marks emphasis on indigo and links in the dark theme.

- Background: white in the light theme; distinct indigo-charcoal surface levels in the dark theme.
- Foreground: dark indigo-charcoal, never pure black.
- Muted text: medium blue-gray with WCAG AA contrast.
- Brand surface: deep indigo (`#231e52`), used for the navigation bar, page header bands, call-to-action bands, and footer.
- Tinted surface: a very light indigo tint for alternating homepage sections and cards in the light theme.
- Accent: deep indigo-blue for links and focus in the light theme; gold (`#d8b84f` family) for links and focus in the dark theme and on indigo surfaces.
- Gold also marks eyebrows, figure rules, and active states on indigo. It is never used for body text on a white background.
- The homepage hero photograph carries a light, even indigo tint (about 22 percent) that softens it and ties it to the brand. Stronger overlays use an indigo-to-transparent gradient only where text sits, to guarantee contrast; they never cover people's faces. No other gradients.
- The site follows the visitor's system theme by default and keeps a manual theme switch.

## Logo

The lab's only logo is the favicon in `app/favicon.ico`: a gold "DL" monogram above a small "DLab" wordmark on a dark navy square. It exists only at 16, 32, and 48px.

- Use it as the favicon and browser icon. Do not upscale it for larger placements; it will blur.
- The navigation bar uses the text wordmark "DLab" set in Geist Sans rather than the image.
- The logo's gold (about `#c89c00`) and navy (about `#01012f`) differ slightly from the site's gold and indigo. Do not adjust site colours to match the small icon; a future vector redraw should align the logo with the site palette instead.
- Any larger use, such as a social card or structured-data logo, needs a vector or high-resolution redraw first.

## Spacing and Layout

- Use a 4px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, and 128px.
- All content aligns to a 72rem frame with a 16px gutter on small screens.
- The homepage is a sequence of full-width sections that alternate between white and tinted backgrounds, with 80 to 128px of vertical padding on desktop.
- Interior pages open with a full-width indigo page header band, then continue on white.
- Reading pages (About, Visiting, Now, blog posts) use a 46rem reading column with an optional facts rail on wide screens.
- Collection pages (People, Publications, Gallery, Sponsors) use the full 72rem frame.
- Every layout collapses to one column on small screens.
- Use cards for scannable groups (research areas, news, engagement routes) and for items that are a single interactive target. Keep long reading content and publication lists free of boxes.

## Components

- **Navigation** sits on indigo with text links, a gold active underline, and 44px minimum targets. Desktop and mobile menus come from one shared list of routes.
- **Homepage hero** is a full-width group photograph shown at its natural 2:1 shape (between 600 and 880px tall on wide screens), cropped to keep everyone's heads in frame. A light, even indigo tint covers the whole photo; beyond that, faces stay clear. The text sits in the lower part, over the group's torsos, on an indigo gradient that rises from the bottom edge and fades out below the faces. It carries a gold eyebrow, the mission as the title, one supporting sentence, a solid primary action, and an outlined secondary action. On narrow screens, where the photo is too short to hold the text, the photo is shown whole with only the light tint and the text follows it on indigo. No blurred blobs or translucent panels.
- **Research areas** are cards with an icon, title, one-sentence description, and a shared link to learn more.
- **News cards** show a lead image, date, author, and title for the latest blog posts.
- **Publication entries** use typographic grouping and generous gaps rather than boxes. On the homepage, the venue is pulled out as an Inconsolata label above each citation when it can be detected.
- **Sponsor strip** shows current and past funder logos at consistent visual weight on white tiles.
- **Life at DLab** shows a short row of gallery photographs leading to the gallery.
- **Call-to-action band** is a full-width indigo section with the engagement routes (study, visit, collaborate), each naming the audience, the offer, and the contact route.
- **Page header bands** are indigo, with a gold eyebrow, the page title, and an optional one-sentence description.
- **Primary actions** are compact solid buttons: white on indigo or photography, indigo-charcoal on white. Secondary actions are outlined buttons or text links. A section has at most one primary action.
- **People** appear in a portrait grid in natural colour with name, role, and optional focus. A person with a website is linked through a real anchor on their name. Alumni are listed separately.
- **Blog posts** show title, author, and date in the page header band before the body. Multi-image rows remain a grid that collapses on mobile.
- **Gallery** uses an image-led masonry layout with descriptive alternative text for each photograph.
- **Image viewer**: on screens 1024px and wider, gallery and blog post photos open in a full-screen viewer on a near-black backdrop, using the same web-sized copy the page already loaded. It shows only the photo and, when there is more than one, its position (for example, 3 / 41); the alt text stays on the image for screen readers but is not shown as a caption. It moves between photos with arrow buttons or the arrow keys, and closes with Escape, the close button, or a click outside the photo, returning focus to the photo. On smaller screens photos are not interactive, since they already fill the width.
- **Sponsors page** shows logos on white tiles, current sponsors before past sponsors.
- The footer is a compact indigo band on every page with contact, location, and primary routes.

## Motion

- Interface feedback: 120 to 180ms.
- Menus and state changes: 180 to 240ms.
- Hero and section entrances: up to 600ms with a capped stagger, used on the homepage only.
- Interactive cards may lift by 2px and gain a soft shadow on hover.
- Content is visible by default. Entrance effects must never leave content hidden if animations or scripts fail.
- Use ease-out quart or quint curves. Avoid bounce and layout-property animation. Images may scale by at most 3 percent on hover inside a clipped frame.
- Reduced motion removes spatial movement and preserves immediate state feedback.

## Accessibility

- Target WCAG 2.2 AA.
- Text over photography must meet contrast requirements over the darkest and lightest parts of the image; the overlay is sized to guarantee it.
- Maintain visible focus, semantic landmarks, logical heading order, 44px targets, keyboard operation, screen-reader labels, reduced motion, and robust light and dark themes.
- Every image has alternative text that describes its content. Decorative icons are hidden from assistive technology.
- Layout must reflow at 320px and remain usable at 200 percent text zoom.
