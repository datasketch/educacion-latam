// const storiesTabs = document.querySelector('.stories__tabs')
// const md = window.markdownit()
// const moveTo = new MoveTo({ tolerance: 80 })
// const trigger0 = document.querySelector('.trigger-0')
// const trigger1 = document.querySelector('.trigger-1')
// const reviews = document.querySelector('.reviews')
// const storyAuthor = document.querySelector('.story__author')
// const storyContent = document.querySelector('.story__content')
// const switchGroup = document.querySelector('.switch__group')
// let activeTab = document.querySelector('.story__tab.active')
// let activeSummary = document.querySelector('.summary.active')
// let activeTabImage = document.querySelector('.stories__image img.active')
// moveTo.registerTrigger(trigger0)
// moveTo.registerTrigger(trigger1)
//
// /* HTTP Request */
// let fragments, groupedByTopic, groupedByCountry
//
// const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=79Ia8mDeo7lk0sWEJpBJw6tyGuvJQUkUVcfvjLQbXHi2i78DJjFHkdmZYiKYBlBuZ77Ym3NSHhnSjqwHZP1BL_HhvxuXxCHOm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO5TP6P1atSil3q_UWrC1RQe9X5qJvnULZ2dOrtr7XUcUmz1W6NUhUl55XSsDR2KzhdIug5zkO6q&lib=MxhMmKBkjPDtlD3NjonVw0YzQbgHhzg3Z'
//
// const request = new XMLHttpRequest()
//
// request.onreadystatechange = () => {
//   if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
//     fragments = JSON.parse(request.responseText)
//     groupedByTopic = groupBy(fragments.data, 'tema')
//     groupedByTopic.key = "topics"
//     groupedByCountry = groupBy(fragments.data, 'país')
//     groupedByCountry.key = "countries"
//     appendReviewToDOM(groupedByTopic)
//   }
// }
//
// // Handles the stories tabs interactivity
// storiesTabs.addEventListener('click', event => {
//   const element = event.target
//   if (!element.matches('.story__tab') || element === activeTab) {
//     return
//   }
//   // Update active tab
//   activeTab.classList.toggle('active')
//   activeTab = element
//   activeTab.classList.toggle('active')
//
//   // Get summary text
//   const dataSummary = activeTab.dataset.summary
//   const summaryId = 'summary-' + dataSummary
//   const summary = document.getElementById(summaryId)
//
//   // Get image
//   activeTabImage.classList.remove('active')
//   const dataImage = activeTab.dataset.image
//   activeTabImage = document.getElementById(dataImage)
//   activeTabImage.classList.add('active')
//
//   // Update active summary
//   activeSummary.classList.toggle('active')
//   activeSummary = summary
//   activeSummary.classList.toggle('active')
// })
//
// // Handles the reviews interactivity
// function showReviewByTopic (button) {
//   if (button.classList.contains('active')) {
//     return
//   }
//   reviews.innerHTML = ''
//   reviews.removeEventListener('click', handleBullets)
//   document.querySelector('.switch.active').classList.remove('active')
//   button.classList.add('active')
//   appendReviewToDOM(groupedByTopic)
// }
//
// function showReviewByCountry (button) {
//   if (button.classList.contains('active')) {
//     return
//   }
//   reviews.innerHTML = ''
//   reviews.removeEventListener('click', handleBullets)
//   document.querySelector('.switch.active').classList.remove('active')
//   button.classList.add('active')
//   appendReviewToDOM(groupedByCountry)
// }
//
// function humanize (str) {
//   return str.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()).join(' ')
// }
//
// function groupBy (array, field) {
//   return array.reduce((group, item) => {
//     group[item[field]] = group[item[field]] || []
//     group[item[field]].push(item)
//     return group
//   }, {})
// }
//
// function appendReviewToDOM (object) {
//   reviewsTemplate(object).forEach(template => reviews.appendChild(template))
//   templateListener(object)
// }
//
// // Made for request a country flag properly
// function createCountriesDictionary (object) {
//   let dictionary = {}
//   for (const key in object) {
//     if (object.hasOwnProperty(key)) {
//       object[key].reduce((table, item) => {
//         table[item['país']] = item.iso.toLowerCase()
//         return table
//       }, dictionary)
//     }
//   }
//   return dictionary
// }
//
// function makeRequest () {
//   request.open('GET', url)
//   request.send()
// }
//
// // Build reviews template
// function reviewsTemplate (object) {
//   const dictionary = createCountriesDictionary(fragments)
//   const templates = []
//   let keysSorted
//   if (object.key === 'topics') {
//     keysSorted = Object.keys(object).filter(key => Array.isArray(object[key])).sort();
//     for (const key of keysSorted) {
//       const review = document.createElement('div')
//       review.classList.add('review')
//
//       const reviewTitle = document.createElement('p')
//       reviewTitle.classList.add('review__title')
//       reviewTitle.textContent = humanize(key)
//
//       const reviewFragments = document.createElement('ul')
//       reviewFragments.classList.add('review__fragments')
//
//       object[key].forEach(function (item) {
//         const reviewBullet = document.createElement('li')
//         reviewBullet.classList.add('review__bullet')
//         reviewBullet.dataset.id = item.id
//         reviewBullet.dataset.key = key
//         reviewFragments.appendChild(reviewBullet)
//       })
//
//       const reviewImage = document.createElement('div')
//       reviewImage.classList.add('review__image')
//
//       const image = document.createElement('img')
//
//       if (object.key === 'countries') {
//         image.setAttribute('src', `https://www.countryflags.io/${dictionary[key]}/flat/64.png`)
//       } else {
//         image.setAttribute('src', `images/${key}.png`)
//       }
//
//       reviewImage.appendChild(image)
//
//       review.appendChild(reviewTitle)
//       review.appendChild(reviewFragments)
//       review.appendChild(reviewImage)
//
//       templates.push(review)
//     }
//   } else {
//     for (const key in object) {
//       if (object.hasOwnProperty(key) && key !== "" && Array.isArray(object[key])) {
//         const review = document.createElement('div')
//         review.classList.add('review')
//
//         const reviewTitle = document.createElement('p')
//         reviewTitle.classList.add('review__title')
//         reviewTitle.textContent = humanize(key)
//
//         const reviewFragments = document.createElement('ul')
//         reviewFragments.classList.add('review__fragments')
//
//         object[key].forEach(function (item) {
//           const reviewBullet = document.createElement('li')
//           reviewBullet.classList.add('review__bullet')
//           reviewBullet.dataset.id = item.id
//           reviewBullet.dataset.key = key
//           reviewFragments.appendChild(reviewBullet)
//         })
//
//         const reviewImage = document.createElement('div')
//         reviewImage.classList.add('review__image')
//
//         const image = document.createElement('img')
//
//         if (object.key === 'countries') {
//           image.setAttribute('src', `https://www.countryflags.io/${dictionary[key]}/flat/64.png`)
//         } else {
//           image.setAttribute('src', `images/${key}.png`)
//         }
//
//         reviewImage.appendChild(image)
//
//         review.appendChild(reviewTitle)
//         review.appendChild(reviewFragments)
//         review.appendChild(reviewImage)
//
//         templates.push(review)
//       }
//     }
//   }
//   return templates
// }
//
// // Handles interactivity within the review template
// let activeBullet, key, item, actualObject
//
// function templateListener (object) {
//   actualObject = object
//   // Set active bullet
//   activeBullet = document.querySelector('.review__bullet')
//   key = activeBullet.dataset.key
//   item = object[key].find(item => item.id === +activeBullet.dataset.id)
//   activeBullet.classList.add('active')
//   storyAuthor.textContent = item.autor
//   storyContent.innerHTML = md.render(item.texto)
//
//   reviews.addEventListener('click', handleBullets)
// }
//
// function handleBullets (event) {
//   const element = event.target
//   if (!element.matches('.review__bullet') || element === activeBullet) {
//     return
//   }
//   // Update active bullet
//   activeBullet.classList.toggle('active')
//   activeBullet = element
//   activeBullet.classList.toggle('active')
//
//   key = activeBullet.dataset.key
//   item = actualObject[key].find(item => item.id === +activeBullet.dataset.id)
//   storyAuthor.textContent = item.autor
//   storyContent.innerHTML = md.render(item.texto)
// }
//
//
// makeRequest()

'use strict';var storiesTabs=document.querySelector('.stories__tabs'),md=window.markdownit(),moveTo=new MoveTo({tolerance:80}),trigger0=document.querySelector('.trigger-0'),trigger1=document.querySelector('.trigger-1'),reviews=document.querySelector('.reviews'),storyAuthor=document.querySelector('.story__author'),storyContent=document.querySelector('.story__content'),switchGroup=document.querySelector('.switch__group'),activeTab=document.querySelector('.story__tab.active'),activeSummary=document.querySelector('.summary.active'),activeTabImage=document.querySelector('.stories__image img.active');moveTo.registerTrigger(trigger0),moveTo.registerTrigger(trigger1);var fragments,groupedByTopic,groupedByCountry,url='https://script.googleusercontent.com/macros/echo?user_content_key=79Ia8mDeo7lk0sWEJpBJw6tyGuvJQUkUVcfvjLQbXHi2i78DJjFHkdmZYiKYBlBuZ77Ym3NSHhnSjqwHZP1BL_HhvxuXxCHOm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO5TP6P1atSil3q_UWrC1RQe9X5qJvnULZ2dOrtr7XUcUmz1W6NUhUl55XSsDR2KzhdIug5zkO6q&lib=MxhMmKBkjPDtlD3NjonVw0YzQbgHhzg3Z',request=new XMLHttpRequest;request.onreadystatechange=function(){request.readyState===XMLHttpRequest.DONE&&200===request.status&&(fragments=JSON.parse(request.responseText),groupedByTopic=groupBy(fragments.data,'tema'),groupedByTopic.key='topics',groupedByCountry=groupBy(fragments.data,'pa\xEDs'),groupedByCountry.key='countries',appendReviewToDOM(groupedByTopic))},storiesTabs.addEventListener('click',function(a){var b=a.target;if(b.matches('.story__tab')&&b!==activeTab){activeTab.classList.toggle('active'),activeTab=b,activeTab.classList.toggle('active');var c=activeTab.dataset.summary,e=document.getElementById('summary-'+c);activeTabImage.classList.remove('active');var f=activeTab.dataset.image;activeTabImage=document.getElementById(f),activeTabImage.classList.add('active'),activeSummary.classList.toggle('active'),activeSummary=e,activeSummary.classList.toggle('active')}});function showReviewByTopic(a){a.classList.contains('active')||(reviews.innerHTML='',reviews.removeEventListener('click',handleBullets),document.querySelector('.switch.active').classList.remove('active'),a.classList.add('active'),appendReviewToDOM(groupedByTopic))}function showReviewByCountry(a){a.classList.contains('active')||(reviews.innerHTML='',reviews.removeEventListener('click',handleBullets),document.querySelector('.switch.active').classList.remove('active'),a.classList.add('active'),appendReviewToDOM(groupedByCountry))}function humanize(a){return a.replace(/-/g,' ').split(' ').map(function(b){return b.charAt(0).toUpperCase()+b.substr(1).toLowerCase()}).join(' ')}function groupBy(a,b){return a.reduce(function(c,d){return c[d[b]]=c[d[b]]||[],c[d[b]].push(d),c},{})}function appendReviewToDOM(a){reviewsTemplate(a).forEach(function(b){return reviews.appendChild(b)}),templateListener(a)}function createCountriesDictionary(a){var b={};for(var c in a)a.hasOwnProperty(c)&&a[c].reduce(function(d,e){return d[e.país]=e.iso.toLowerCase(),d},b);return b}function makeRequest(){request.open('GET',url),request.send()}function reviewsTemplate(a){var b=createCountriesDictionary(fragments),c=[],d;if('topics'===a.key){d=Object.keys(a).filter(function(h){return Array.isArray(a[h])}).sort();var _loop=function(h){var i=document.createElement('div');i.classList.add('review');var j=document.createElement('p');j.classList.add('review__title'),j.textContent=humanize(h);var k=document.createElement('ul');k.classList.add('review__fragments'),a[h].forEach(function(n){var o=document.createElement('li');o.classList.add('review__bullet'),o.dataset.id=n.id,o.dataset.key=h,k.appendChild(o)});var l=document.createElement('div');l.classList.add('review__image');var m=document.createElement('img');'countries'===a.key?m.setAttribute('src','https://www.countryflags.io/'+b[h]+'/flat/64.png'):m.setAttribute('src','images/'+h+'.png'),l.appendChild(m),i.appendChild(j),i.appendChild(k),i.appendChild(l),c.push(i)},_iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var f,h,e=d[Symbol.iterator]();!(_iteratorNormalCompletion=(f=e.next()).done);_iteratorNormalCompletion=!0)h=f.value,_loop(h)}catch(h){_didIteratorError=!0,_iteratorError=h}finally{try{!_iteratorNormalCompletion&&e.return&&e.return()}finally{if(_didIteratorError)throw _iteratorError}}}else{var _loop2=function(h){if(a.hasOwnProperty(h)&&''!==h&&Array.isArray(a[h])){var i=document.createElement('div');i.classList.add('review');var j=document.createElement('p');j.classList.add('review__title'),j.textContent=humanize(h);var k=document.createElement('ul');k.classList.add('review__fragments'),a[h].forEach(function(n){var o=document.createElement('li');o.classList.add('review__bullet'),o.dataset.id=n.id,o.dataset.key=h,k.appendChild(o)});var l=document.createElement('div');l.classList.add('review__image');var m=document.createElement('img');'countries'===a.key?m.setAttribute('src','https://www.countryflags.io/'+b[h]+'/flat/64.png'):m.setAttribute('src','images/'+h+'.png'),l.appendChild(m),i.appendChild(j),i.appendChild(k),i.appendChild(l),c.push(i)}};for(var h in a)_loop2(h)}return c}var activeBullet=void 0,key=void 0,item=void 0,actualObject=void 0;function templateListener(a){actualObject=a,activeBullet=document.querySelector('.review__bullet'),key=activeBullet.dataset.key,item=a[key].find(function(b){return b.id===+activeBullet.dataset.id}),activeBullet.classList.add('active'),storyAuthor.textContent=item.autor,storyContent.innerHTML=md.render(item.texto),reviews.addEventListener('click',handleBullets)}function handleBullets(a){var b=a.target;b.matches('.review__bullet')&&b!==activeBullet&&(activeBullet.classList.toggle('active'),activeBullet=b,activeBullet.classList.toggle('active'),key=activeBullet.dataset.key,item=actualObject[key].find(function(c){return c.id===+activeBullet.dataset.id}),storyAuthor.textContent=item.autor,storyContent.innerHTML=md.render(item.texto))}makeRequest();
