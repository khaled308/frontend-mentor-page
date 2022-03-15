const menu = document.querySelector('ul')
const toggleMenu = document.querySelector('nav .toggle')
const closeMenu = document.querySelector('.close')

const links = document.querySelectorAll('a')

links.forEach(link=>{
    link.addEventListener('click',(e)=>{
        reset(links,'active-link')
        e.target.classList.add('active-link')
    })
})

toggleMenu.addEventListener('click',(e)=>{
    menu.classList.add('appear-links')
    e.target.style.display = 'none'
    closeMenu.style.display = 'block'
})

closeMenu.addEventListener('click',e=>{
    menu.classList.remove('appear-links')
    e.target.style.display = 'none'
    toggleMenu.style.display = 'block'
})

if(location.href != '/'){
    const request = new Request('../js/data.json')
    fetch(request)
    .then(res=>res.json())
    .then(data=>{
        if(location.href.includes('destination')){
            if(location.search.includes('destination')){
                const destination = location.search.slice(location.search.indexOf('=') + 1)
                switch(destination){
                    case 'moon' :
                        setDestination(data,0)
                        break
                    case 'mars' :
                        setDestination(data,1)
                        break
                    case 'europa' :
                        setDestination(data,2)  
                        break
                    case 'titan' :
                        setDestination(data,3)   
                }
            }
            else setDestination(data)
        }
        else if(location.href.includes('crew')){
            setCrew(data,0)
            const bubles = document.querySelectorAll('.crew .bubles span')
            bubles.forEach((buble,index)=>{
                buble.addEventListener('click',(e)=>{
                    reset(bubles,'active')
                    setCrew(data,index)
                    e.target.classList.add('active')
                })
            })
        }
        else if(location.href.includes('technology')){
            setTechnology(data,0)
            const bubles = document.querySelectorAll('.technology .bubles span')
            bubles.forEach((buble)=>{
                buble.addEventListener('click',(e)=>{
                    reset(bubles,'active')
                    setTechnology(data,+e.target.textContent - 1)
                    e.target.classList.add('active')
                })
            })
        }

    })
}

function setDestination(data,index = 0){
    const destinationHeading = document.querySelector('.destination h2')
    const destinationDescription = document.querySelector('.destination .txt p')
    const destinace = document.querySelector('.destination .details .destinace')
    const time = document.querySelector('.destination .details .time')
    const destinationImg = document.querySelector('.destination-img')
    
    destinationHeading.textContent = data.destinations[index].name
    destinationDescription.textContent = data.destinations[index].description
    destinace.textContent = data.destinations[index].distance
    time.textContent = data.destinations[index].travel
    destinationImg.setAttribute('src','.' + data.destinations[index].images.png)
}

function setCrew(data,index){
    const title = document.querySelector('.left .title')
    const name = document.querySelector('.left .name')
    const bio = document.querySelector('.left .bio')
    const crewImg = document.querySelector('.crew img')

    title.textContent = data.crew[index].role
    name.textContent = data.crew[index].name
    bio.textContent = data.crew[index].bio
    crewImg.setAttribute('src','.' + data.crew[index].images.png)
}

function setTechnology(data,index){
    const name = document.querySelector('.left h3')
    const description = document.querySelector('.left p')
    const technologyImg = document.querySelector('.technology img')

    name.textContent = data.technology[index].name
    description.textContent = data.technology[index].description
    technologyImg.setAttribute('src','.' + data.technology[index].images.portrait)
}

function reset(arr,className){
    arr.forEach(el=>{
        el.classList.remove(className)
    })
}