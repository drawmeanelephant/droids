# Licensing

Use this site's software as a starting point for your own product-review
blog. You can copy it, change it, publish your own site, and use it
commercially under the [MIT licence](LICENSE). Keep the copyright and
permission notices. You do not have to retain this site's name, prose,
footer links, or verdicts.

This is a **mixed-licence repository**, not a grant of MIT rights to every
file in the checkout:

| Material | Terms |
|---|---|
| Original theme code and layouts, favicon, build configuration, workflows, tests, tools, developer documentation, and `examples/` | MIT, except the separately identified material below |
| `content/` and `static/`, including articles, drafts, receipts, images, and site-specific prose | Not covered by MIT; replace with your own content. No additional reuse licence is granted here. |
| `manila/assets/fonts/Geist*.woff2` | SIL Open Font License 1.1; retain `manila/assets/fonts/OFL.txt`. |
| `manila/assets/fonts/Virelai*.woff2` | Proprietary, all rights reserved except the owner's specific site/repository permission. See `manila/assets/fonts/VIRELAI-NOTICE.txt`. |
| `manila/assets/icons/*.svg`, including Oliver, the Filed robot, and Sexiburger | Proprietary mascot artwork, excluded from MIT. The same Virelai notice applies; provenance and permissions are recorded in `manila/assets/icons/README.md`. |
| `boris-agent-kit/` and other third-party software | Retain their upstream terms; this repository does not relicense them. |

The MIT licence for the font-conversion **code** does not license its
input fonts or generated font/artwork assets. Publicly downloadable files
are not automatically open-licensed.

## Before deploying a fork

Boris copies all theme assets to the output, including unused fonts and
SVGs. Removing an icon from a page is **not** enough to stop distributing
the asset.

Remove or replace the two `Virelai*.woff2` files and the three mascot SVGs
before deploying another site, unless you obtain separate permission.
Remove their `@font-face` rules and `data-mascot` markup, or replace them
with assets you are entitled to use. Update the mascot-specific manifest,
tests, converter, and CI font-verification step to match your fork.
Geist can remain with its OFL notice.

The MIT licence does not grant rights to third-party trademarks or imply
endorsement by this site's author, Factory, or the products being reviewed.
