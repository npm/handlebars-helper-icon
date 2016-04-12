handlebars-helper-icon
======================

A helper to inline svg icons efficiently

Use
----

Register this module as a handlebars helper, and then you can load SVG icons
from packages.

In your template:

```
<div class='thing'>
    {{icon "somepackage/test.svg" width="109"}}
</div>
<div class='someotherplace'>
    {{icon "somepackage/test.svg" width="22"}}
</div>
```

The SVG will be inlined as a symbol, and all further uses on a page will only
have a small `<use>` element referring to the definition.

This module only works for server-side rendering, though contributions to add
browser support are welcome.
