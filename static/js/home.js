const storiesTabs = document.querySelector('.stories__tabs')
const reviews = document.querySelector('.reviews')
const storyAuthor = document.querySelector('.story__author')
const storyContent = document.querySelector('.story__content')
const switchGroup = document.querySelector('.switch__group')
let activeTab = document.querySelector('.story__tab.active')
let activeSummary = document.querySelector('.summary.active')

/* HTTP Request */
let fragments, groupedByTopic, groupedByCountry

const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=79Ia8mDeo7lk0sWEJpBJw6tyGuvJQUkUVcfvjLQbXHi2i78DJjFHkdmZYiKYBlBuZ77Ym3NSHhnSjqwHZP1BL_HhvxuXxCHOm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO5TP6P1atSil3q_UWrC1RQe9X5qJvnULZ2dOrtr7XUcUmz1W6NUhUl55XSsDR2KzhdIug5zkO6q&lib=MxhMmKBkjPDtlD3NjonVw0YzQbgHhzg3Z'

const request = new XMLHttpRequest()

request.onreadystatechange = () => {
  if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
    fragments = JSON.parse(request.responseText)
    groupedByTopic = groupBy(fragments.data, 'tema')
    groupedByTopic.key = "topics"
    groupedByCountry = groupBy(fragments.data, 'país')
    groupedByCountry.key = "countries"
    appendReviewToDOM(groupedByTopic)
  }
}

// Handles the stories tabs interactivity
storiesTabs.addEventListener('click', event => {
  const element = event.target
  if (!element.matches('.story__tab') || element === activeTab) {
    return
  }
  // Update active tab
  activeTab.classList.toggle('active')
  activeTab = element
  activeTab.classList.toggle('active')

  // Get summary text
  const dataSummary = activeTab.dataset.summary
  const summaryId = 'summary-' + dataSummary
  const summary = document.getElementById(summaryId)

  // Update active summary
  activeSummary.classList.toggle('active')
  activeSummary = summary
  activeSummary.classList.toggle('active')
})

// Handles the reviews interactivity
function showReviewByTopic (button) {
  if (button.classList.contains('active')) {
    return
  }
  reviews.innerHTML = ''
  reviews.removeEventListener('click', handleBullets)
  document.querySelector('.switch.active').classList.remove('active')
  button.classList.add('active')
  appendReviewToDOM(groupedByTopic)
}

function showReviewByCountry (button) {
  if (button.classList.contains('active')) {
    return
  }
  reviews.innerHTML = ''
  reviews.removeEventListener('click', handleBullets)
  document.querySelector('.switch.active').classList.remove('active')
  button.classList.add('active')
  appendReviewToDOM(groupedByCountry)
}

function humanize (str) {
  return str.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()).join(' ')
}

function groupBy (array, field) {
  return array.reduce((group, item) => {
    group[item[field]] = group[item[field]] || []
    group[item[field]].push(item)
    return group
  }, {})
}

function appendReviewToDOM (object) {
  reviewsTemplate(object).forEach(template => reviews.appendChild(template))
  templateListener(object)
}

// Made for request a country flag properly
function createCountriesDictionary (object) {
  let dictionary = {}
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      object[key].reduce((table, item) => {
        table[item['país']] = item.iso.toLowerCase()
        return table
      }, dictionary)
    }
  }
  return dictionary
}

function makeRequest () {
  request.open('GET', url)
  request.send()
}

// Build reviews template
function reviewsTemplate (object) {
  const dictionary = createCountriesDictionary(fragments)
  const templates = []
  for (const key in object) {
    if (object.hasOwnProperty(key) && key !== "" && Array.isArray(object[key])) {
      const review = document.createElement('div')
      review.classList.add('review')

      const reviewTitle = document.createElement('p')
      reviewTitle.classList.add('review__title')
      reviewTitle.textContent = humanize(key)

      const reviewFragments = document.createElement('ul')
      reviewFragments.classList.add('review__fragments')

      object[key].forEach(function (item) {
        const reviewBullet = document.createElement('li')
        reviewBullet.classList.add('review__bullet')
        reviewBullet.dataset.id = item.id
        reviewBullet.dataset.key = key
        reviewFragments.appendChild(reviewBullet)
      })

      const reviewImage = document.createElement('div')
      reviewImage.classList.add('review__image')

      const image = document.createElement('img')
      
      if (object.key === 'countries') {
        image.setAttribute('src', `https://www.countryflags.io/${dictionary[key]}/flat/64.png`)
      } else {
        image.setAttribute('src', `images/${key}.png`)
      }

      reviewImage.appendChild(image)

      review.appendChild(reviewTitle)
      review.appendChild(reviewFragments)
      review.appendChild(reviewImage)

      templates.push(review)
    }
  }
  return templates
}

// Handles interactivity within the review template
let activeBullet, key, item, actualObject

function templateListener (object) {
  actualObject = object
  // Set active bullet
  activeBullet = document.querySelector('.review__bullet')
  key = activeBullet.dataset.key
  item = object[key].find(item => item.id === +activeBullet.dataset.id)
  activeBullet.classList.add('active')
  storyAuthor.textContent = item.autor
  storyContent.textContent = item.texto

  reviews.addEventListener('click', handleBullets)
}

function handleBullets (event) {
  const element = event.target
  if (!element.matches('.review__bullet') || element === activeBullet) {
    return
  }
  // Update active bullet
  activeBullet.classList.toggle('active')
  activeBullet = element
  activeBullet.classList.toggle('active')

  key = activeBullet.dataset.key
  item = actualObject[key].find(item => item.id === +activeBullet.dataset.id)
  storyAuthor.textContent = item.autor
  storyContent.textContent = item.texto
}


makeRequest()
