(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const listData = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const dataPanel = document.getElementById('data-panel')
  const listGroup = document.querySelector('[data-target="list"]')
  let currentGenres = Object.keys(listData)[0]

  //API撈資料回來
  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    getGenresData(data)
    renderList()
  }).catch((err) => console.log(err))

  //顯示電影卡片
  function displayDataList(data) {
    let htmlContent = ''
    let genres = ''
    data.forEach(item => {
      genres = getGenresHtml(item.genres)
      htmlContent += `
      <div class="col-sm-3">
        <div class="card mb-2 card-size">
          <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h6 class="card-title">${item.title}</h5>
             <div class="card-genres">${genres}</div>
          </div>
        </div>
      </div>
    `
    })
    dataPanel.innerHTML = htmlContent
  }

  //渲染左邊電影分類列表
  function renderList() {
    listGroup.innerHTML = Object.keys(listData).map((item, index) =>
      `<li class="list-group-item ${index === 0 ? 'active' : ''}" data-id="${item}" data-target="genres-li">${listData[item]}</li>`
    ).join('')
  }

  //組成分類標籤html
  function getGenresHtml(genresArray) {
    return genresArray.map(item =>
      `<p class="card-text genres-text"><small class="text-muted">${listData[item]}</small></p>`
    ).join('')
  }

  //篩選選擇之分類資料，並將資料顯示在畫面上
  function getGenresData(data) {
    const result = data.filter(item => item.genres.includes(parseInt(currentGenres, 10)))
    displayDataList(result)
  }

  //監控左邊電影分類列表
  listGroup.addEventListener('click', e => {
    if (e.target.nodeName === 'LI') {
      currentGenres = e.target.dataset.id
      getGenresData(data)
      setActiveCss(e.target)
    }
  })

  //重設左邊分類清單active
  function setActiveCss(target) {
    const genresLi = document.querySelectorAll('[data-target="genres-li"]')
    genresLi.forEach(item => item.classList.remove('active'))
    target.classList.add('active')
  }

})()