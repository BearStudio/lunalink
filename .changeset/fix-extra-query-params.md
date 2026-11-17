---
"@bearstudio/lunalink": patch
---

fix: append extra params to an existing query string with `&` instead of a second `?`, insert them before the `#fragment`, and drop the trailing `?` when there are no extra params to add. In `ExtractParams`, a `?query` or `#fragment` following a param is no longer read as part of its name (e.g. `/users/:id#top` now expects `id` instead of `id#top`).
