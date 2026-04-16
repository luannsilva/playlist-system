# Theme detection

How to decide between **playlist** and **smartdesk** when the user doesn't explicitly state it.

## Signals for **playlist**

- User mentions "Playlist" by name
- Requests a colorful SaaS/CRM, indigo, purple, vibrant
- Inspiration cited: Notion, Asana, Monday, Hubspot, Intercom
- Keywords: "clean SaaS", "colorful dashboard", "vibrant theme", "friendly"
- Screenshots/mocks with saturated colors and light backgrounds

## Signals for **smartdesk**

- User mentions "SmartDesk" by name
- Requests something monochromatic, black and white, minimalist
- Inspiration cited: Linear, Vercel, Stripe dashboard, Superhuman, Apple design
- Keywords: "monochromatic", "minimalist", "pro", "enterprise serious", "dark sidebar"
- Screenshots/mocks predominantly neutral, without accent colors

## Ambiguous → ask

If there's no clear signal, ask the user with `AskUserQuestion`:

> Which theme to use?
> - **playlist** — vibrant indigo, DM Sans, ideal for colorful SaaS
> - **smartdesk** — monochromatic black/white, Averta, ideal for pro/enterprise apps

Don't guess. The theme is a brand decision, not an implementation detail.

## The themes side by side

| Aspect               | playlist                     | smartdesk                         |
| -------------------- | ---------------------------- | --------------------------------- |
| Primary              | `#4F46E5` (indigo)           | `#0A0A0A` (near-black)            |
| Background default   | `#F5F6F8` (very light gray)  | `#FAFAFA`                         |
| Sidebar              | Light, same as background    | **Dark** `#0F1114`                |
| Font family          | DM Sans                      | Averta (fallback Albert Sans)     |
| Border radius base   | 8px                          | 8px                               |
| Feeling              | Friendly, energetic          | Serious, precise, minimal         |
| Accent usage         | Heavy (buttons, nav, charts) | Sparse (mostly neutrals)          |
