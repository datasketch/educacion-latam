const storiesTabs = document.querySelector('.stories__tabs')
const stages = document.querySelector('.stages')
const storyAuthor = document.querySelector('.story__author')
const storyContent = document.querySelector('.story__content')
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
    groupedByCountry = groupBy(fragments.data, 'país')
    // stagesTemplate(groupedByTopic).forEach(template => stages.appendChild(template))
    // templateListener(groupedByTopic)
    countriesTemplate(groupedByCountry).forEach(template => stages.appendChild(template))
    templateListener(groupedByCountry)
  }
}

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

function humanize (str) {
  return str.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()).join(' ')
}

function dehumanize (str) {
  return str.replace(/\s/g, '-').split(' ').map(w => w.toLowerCase()).join('-')
}

function groupBy (array, field) {
  return array.reduce((group, item) => {
    group[item[field]] = group[item[field]] || []
    group[item[field]].push(item)
    return group
  }, {})
}

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

function stagesTemplate (object) {
  const templates = []
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const stage = document.createElement('div')
      stage.classList.add('stage')

      const stageTitle = document.createElement('p')
      stageTitle.classList.add('stage__title')
      stageTitle.textContent = humanize(key)

      const stageFragments = document.createElement('ul')
      stageFragments.classList.add('stage__fragments')

      object[key].forEach(function (item) {
        const stageBullet = document.createElement('li')
        stageBullet.classList.add('stage__bullet')
        stageBullet.dataset.id = item.id
        stageBullet.dataset.key = key
        stageFragments.appendChild(stageBullet)
      })

      const stageImage = document.createElement('div')
      stageImage.classList.add('stage__image')

      const image = document.createElement('img')
      image.setAttribute('src', `images/${key}.png`)

      stageImage.appendChild(image)

      stage.appendChild(stageTitle)
      stage.appendChild(stageFragments)
      stage.appendChild(stageImage)

      templates.push(stage)
    }
  }
  return templates
}

function templateListener (object) {
  // Set active bullet
  let activeBullet = document.querySelector('.stage__bullet')
  let key = activeBullet.dataset.key
  let item = object[key].find(item => item.id === +activeBullet.dataset.id)
  activeBullet.classList.add('active')
  storyAuthor.textContent = item.autor
  storyContent.textContent = item.texto

  stages.addEventListener('click', event => {
    const element = event.target
    if (!element.matches('.stage__bullet')) {
      return
    }
    // Update active bullet
    activeBullet.classList.toggle('active')
    activeBullet = element
    activeBullet.classList.toggle('active')

    key = activeBullet.dataset.key
    item = object[key].find(item => item.id === +activeBullet.dataset.id)
    storyAuthor.textContent = item.autor
    storyContent.textContent = item.texto
  })
}

function countriesTemplate (object) {
  const dictionary = createCountriesDictionary(fragments)
  const templates = []
  for (const key in object) {
    if (object.hasOwnProperty(key) && key !== "") {
      const stage = document.createElement('div')
      stage.classList.add('stage')

      const stageTitle = document.createElement('p')
      stageTitle.classList.add('stage__title')
      stageTitle.textContent = humanize(key)

      const stageFragments = document.createElement('ul')
      stageFragments.classList.add('stage__fragments')

      object[key].forEach(function (item) {
        const stageBullet = document.createElement('li')
        stageBullet.classList.add('stage__bullet')
        stageBullet.dataset.id = item.id
        stageBullet.dataset.key = key
        stageFragments.appendChild(stageBullet)
      })

      const stageImage = document.createElement('div')
      stageImage.classList.add('stage__image')

      const image = document.createElement('img')
      image.setAttribute('src', `https://www.countryflags.io/${dictionary[key]}/flat/64.png`)

      stageImage.appendChild(image)

      stage.appendChild(stageTitle)
      stage.appendChild(stageFragments)
      stage.appendChild(stageImage)

      templates.push(stage)
    }
  }
  return templates
}

makeRequest()
