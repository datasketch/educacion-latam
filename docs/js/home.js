const storiesTabs = document.querySelector('.stories__tabs')
let activeTab = document.querySelector('.storie__tab.active')
let activeSummary = document.querySelector('.summary.active')

storiesTabs.addEventListener('click', function (event) {
  const element = event.target
  if (!element.matches('.storie__tab') || element === activeTab) {
    return
  }
  // Change active tab
  activeTab.classList.toggle('active')
  activeTab = element
  activeTab.classList.toggle('active')

  // Get summary text
  const dataSummary = activeTab.dataset.summary
  const summaryId = 'summary-' + dataSummary
  const summary = document.getElementById(summaryId)

  // Change summary
  activeSummary.classList.toggle('active')
  activeSummary = summary
  activeSummary.classList.toggle('active')
})
