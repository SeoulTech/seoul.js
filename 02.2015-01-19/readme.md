#Agenda
Reactive programming and RxJS.

Created a simple todo-list with RxJS and direct DOM maipulation.

This is suboptimal in many ways, mostly due to tight-coupling with the DOM and
reliance on low-level DOM manipulation (such as `.innerHTML`). For example,
when a new item is added, we have to dispose existing subscription to
checkboxes and reinitialize it to take into account newer checkboxes.
