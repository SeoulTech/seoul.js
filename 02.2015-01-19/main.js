var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
var todos = $('.js-list')
var remainingLength = todos.children.length
var input = $('.js-field')

// initialize counters
$('.js-remaining').innerHTML = remainingLength
$('.js-all').innerHTML = remainingLength

// checkbox on change event -> checkbox value
var checked = function() {
  return Rx.Observable
    .fromEvent($$('.js-checkbox'), 'change')
    .pluck('target')
    .pluck('checked')
}

// subsription for checkbox value that modifies remaining counter
var checkedSub = function(x) {
  var remaining = $('.js-remaining')
  remaining.innerHTML = +remaining.innerHTML + (x? -1 : 1)
}
var chSub = checked().subscribe(checkedSub)

Rx.Observable.fromEvent(todos, 'DOMNodeInserted')
  .pluck('target')
  .pluck('parentNode')
  .pluck('children')
  .pluck('length')
  .subscribe(function(x) {
    var remaining = $('.js-remaining')
    remaining.innerHTML = +remaining.innerHTML + 1
    $('.js-all').innerHTML = x

    // dispose pervious instance of the subscription
    // and resubscribe, because new checkboxes were added
    chSub.dispose()
    chSub = checked().subscribe(checkedSub)
  })



Rx.Observable
  .fromEvent(input, 'change')
  .pluck('target')
  .pluck('value')
  .subscribe(function(x) {
    var li = document.createElement('li')
    var input = document.createElement('input')
    input.type = 'checkbox'
    input.className = 'js-checkbox'

    var span = document.createElement('span')
    span.innerHTML = x

    li.appendChild(input)
    li.appendChild(span)
    todos.appendChild(li)
    $('.js-field').value = ''
  })
