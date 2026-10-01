# Command-Delete conventions survey

Date: 2026-10-01. **Documentation and source inspection only. No Mac app behavior was tested.**

## Terms matter

On a Mac, the key normally labeled **Delete** is backward delete/Backspace, **⌫**. Forward Delete is **⌦**, or Fn-Delete on keyboards lacking it. Apple documents Fn-Delete as forward delete and puts Command-Delete → Move selected item to Trash under **Finder and system shortcuts**, not a universal text-editor contract: [Apple Mac keyboard shortcuts](https://support.apple.com/en-us/102650). An external PC keyboard's printed “Delete” must not be assumed to be that same backward-delete key.

Deleting **text**, deleting a **whole line**, closing a **document**, discarding its unsaved changes, and moving its **file** to Trash are distinct actions. “Delete the note” is not an unambiguous description of a text-key event.

## Official-source comparison

| Surface | What the official source actually says | What it does not establish / implication |
| --- | --- | --- |
| Apple Finder | Command-Delete moves the selected item to Trash. [Apple shortcuts](https://support.apple.com/en-us/102650). | Applies to file selection; does not mandate overriding a focused text view. |
| Cocoa/AppKit native text editing | Apple's archived [Text System Defaults and Key Bindings](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/EventOverview/TextDefaultsBindings/TextDefaultsBindings.html) explains text commands, customizable bindings, and `deleteToBeginningOfLine:` / kill buffer. Local standard dictionary maps Command + backward Delete to that selector; see receipt below. | The archive does not itself promise that every subclass or app preserves the mapping. Local dictionary inspection is not a TextEdit/BANAL test and does not account for personal remapping. |
| Apple Notes | [Shortcuts and gestures](https://support.apple.com/guide/notes/keyboard-shortcuts-and-gestures-apd46c25187e/mac) documents Return from list into note, Command-Return back to list, and a list swipe gesture for note deletion. [Delete a note](https://support.apple.com/guide/notes/delete-a-note-not5585d71a8/mac) documents selecting a note and using its context menu; on-Mac notes have Recently Deleted recovery for up to 30 days. | The retrieved shortcut page does **not** list Command-Delete. Cannot infer whether it deletes text or a note with editor focus. Recovery differs by account type; this is not BANAL's Finder Trash model. |
| Bear for macOS | [macOS Keyboard Shortcuts](https://bear.app/faq/mac-keyboard-shortcuts/) lists “⌘⌫ — Delete selected note” under Navigation, “⇧⌘R — Restore selected note,” and a separate Empty Trash chord. | Strong evidence of a note-level shortcut, but the page does not specify whether it wins inside the editor. Do not invent a focus test or use the Navigation heading as proof of responder scoping. |
| Ulysses for Mac | [Sheets & Groups](https://help.ulysses.app/the-library/567894-sheets-groups) describes right-clicking a sheet/group in the sheet list and choosing Move to Trash; it remains until manually emptied. Option + Erase is explicitly permanent. | The inspected passage does not supply a Command-Delete shortcut or editor-focus rule. Useful evidence for explicit collection actions and a separate permanent-delete path, not for this exact chord. |
| IntelliJ IDEA macOS keymap | [Predefined macOS keymap](https://www.jetbrains.com/help/idea/reference-keymap-mac-default.html) lists **⌘⌫ — Delete Line** under Basic editing, and **⌘⌦ — Safe Delete** under Refactorings. | Native-line-start deletion is not universal: this coding editor uses whole-line deletion. Safe Delete is a refactoring action, not Finder Trash. Both still distinguish editing/refactoring from deleting the note being viewed. |
| VS Code | [Keybindings docs](https://code.visualstudio.com/docs/getstarted/keybindings) explain `when` clauses and `textInputFocus`; absent a clause, a shortcut is globally available. [Version 1.29 release notes](https://code.visualstudio.com/updates/v1_29/) document Cmd+Backspace in the **integrated terminal**, sending Ctrl+U: bash deletes to start of line, zsh the whole line. | Terminal-specific, historical documentation; not evidence for VS Code's current text-editor or Explorer delete behavior. Supports context-sensitive dispatch and warns that even “line deletion” differs by surface. |
| Bare Bones TextWrangler / BBEdit | Historical [TextWrangler 4.5 notes](https://www.barebones.com/support/textwrangler/notes_tw45.html) describe Control-K as a synonym for Command-Delete, “clear field,” in **Live Search**. [BBEdit 16.0.2 notes](https://www.barebones.com/support/bbedit/notes-16.0.2.html) allow Command-delete for **Don't Save** in the close-confirmation alert. | Search-field clearing and a save alert are deliberately different scopes. Neither passage proves current editor line semantics. The BBEdit alert does not trash the document's file. |

### Local native-binding receipt

Read-only command, executed 2026-10-01:

```python
import hashlib, plistlib
p = "/System/Library/Frameworks/AppKit.framework/Resources/StandardKeyBinding.dict"
b = open(p, "rb").read()
d = plistlib.loads(b)
print(hashlib.sha256(b).hexdigest())
for k in ["\x7f", "\uf728", "@\x7f"]:
    print(repr(k), repr(d[k]))
```

Observed:

```text
500c1d3a0afb3f9bcca83a9ec20f128b5b802c699bd336634d20bebfecad0390
'\x7f' 'deleteBackward:'
'\uf728' 'deleteForward:'
'@\x7f' 'deleteToBeginningOfLine:'
```

Apple's archived binding documentation explains `@` as Command. This proves the **installed standard mapping**, not that a particular running app receives it. No editor was launched; no selection, undo, wrapped-line, input-method, or user-remap behavior was tested.

## Recommended BANAL policy matrix — unimplemented, owner decides

| Actual focus/context | Proposed ⌘⌫ behavior | Explicit file-trash path |
| --- | --- | --- |
| Body editor, title, tags, search, find/replace, rename text field | Preserve that text control's native/customized text deletion. With selected text, operate on text, never a file; verify exact native semantics rather than hand-writing a selection rule. | File → Move to Trash remains an explicit note action where appropriate; ⌘2 then ⌘⌫ is the existing note-list route to verify. |
| Note list, selected note | Move that selected note to Finder Trash; no note → disabled/no destructive action. | Same File/context-menu action. |
| Folder sidebar, selected real folder | Move that explicitly focused folder to Finder Trash, not a lingering selected note. | Folder context menu. Destructive target/scope must be apparent. |
| Sidebar virtual filter/tag | No filesystem trash target. | Explicit note selection in list. |
| Read view with no editable text | Owner must decide; default recommendation is require collection focus for the shortcut, while explicit note-trash menu remains available. | Same menu, or focus list first. |
| Settings, open panel, sheet, auxiliary window | Never shortcut-trash a remembered notes-window selection merely because `trackedModels.latest` exists. Native focused control/dialog owns its chord. | Owner explicitly decides which file menu actions remain available; safety exception must not undo #191's unrelated publishing/new-note fix. |
| Two notes windows | Resolve collection focus and target within the key notes window. | Explicit menu must identify the intended target. |

**Why this recommendation:** BANAL promises a native source editor and standard Mac text behavior ([repository policy](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/AGENTS.md)). Selection survives editing, so checking `selectedID != nil` alone cannot express the intended scope ([selection source](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/Sources/BANALApp/AppModel.swift#L113-L154)). Preserving text commands protects writing without removing keyboard filing. Bear is a documented counterexample to a universal “this chord cannot mean note trash” claim, not evidence that BANAL should make it global.

## Reversibility, accessibility, and keyboard checks

- **Text reversal:** inspect/test actual native ⌘Z after middle-of-line and selected-text deletions. BANAL sets `allowsUndo = true` ([source](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/Sources/BANALApp/Views/MarkdownTextView.swift#L76-L82)); that is configuration, not proof of the proposed scenarios.
- **File reversal:** Finder Trash storage is not an in-app undo guarantee. Note trash drops pending writes; before expanding editor access, verify restored bytes include the newest input and failures preserve the buffer ([source](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/Sources/BANALCore/NoteStore.swift#L478-L499)). No loss was reproduced here. A new permanent-delete feature is out of scope.
- **Key repeat:** current note trash selects the first remaining visible note ([source](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/Sources/BANALApp/AppModel.swift#L301-L309)); verify a held key cannot unexpectedly sweep multiple notes. This is an acceptance check, not an observed bug.
- **Accessibility:** retain discoverable File/context-menu actions and keyboard focus commands. Verify VoiceOver identifies note versus folder target, focus transitions, disabled states, result, and recovery. No VoiceOver failure is claimed. A raw global key monitor would need strong justification rather than being the default shortcut fix.
- **Keyboard ambiguity:** label ⌘⌫ as Command–backward Delete (Backspace); test ⌘⌦ separately. Include Fn-Delete, external PC keyboards, layout changes, remapping, and input-method marked text. Apple explicitly distinguishes forward Delete; Bear warns some shortcuts vary by localization/layout. Do not advertise Ctrl+Delete as an automatic non-Mac synonym.

## Evidence acquisition and limits

Dedicated WebSearch discovered the official sources. URL-only `agent-browser read` retrieved their relevant text without launching or attaching a browser. Pages were public and unauthenticated. A first Apple Notes URL with an incorrect identifier returned the guide landing page; it was discarded and the actual `apd46c25187e` page was read. Community posts were not used as authoritative shortcut evidence.

This is a convention survey, **not** comparative UI testing. Exact text-selection behavior, responder precedence, note-list shortcut delivery, menu clicks from editor focus, and recovery remain tests for the eventual owner-approved implementation. Documentation that omits focus cannot honestly settle it.
