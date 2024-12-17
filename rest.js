// Global Variables
const toggleButton = document.getElementById('header-btn');
const currentMode = localStorage.getItem('color-mode');
const headerBg = document.querySelector('.header-where');
const option = document.querySelector('.option');
const filterByRegion = document.getElementById('filterByRegion');
const searchBar = document.getElementById('searchBar');
const countryDetails = document.getElementById('countryDetails');
const mainCon = document.getElementById('mainCon');
const showCountry = document.getElementById('showCountry')
const searchedCountry = document.getElementById('searched-country')
const backBtn = document.getElementsByClassName('backBtn');
 

// Search Input
searchBar.addEventListener('keypress', (e) => {
    const selectOption = filterByRegion.options[filterByRegion.selectedIndex]
    const selectedOption = selectOption.text
    if (e.key === 'Enter' && selectOption) {
        e.preventDefault();
        const query = searchBar.value.trim()
        fetch('data.json').then(response => response.json()).then(data => {
            const dataArray = Object.values(data)
            const result = dataArray.filter(item => item.name.toLowerCase() === query.toLowerCase() && item.region.toLowerCase() === selectedOption.toLowerCase())
                //         const filteredResult = dataArray.filter(item=>  item.region===selectedOption)
                // const finalResult = data.includes(result && filteredResult)

            if (result) {
                mainCon.style.display= 'none'
                const searchReturn = document.createElement('div') 
                result.forEach(res=> {
                    searchReturn.innerHTML=`
                <div class='flagDetailContainer'>
            <div class='backBtn'>
            <button id='directBtn' onclick="location.reload();">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
            Back</button>
            </div>
            <div class='countryFlag-result'> 

            <div class='countryFlag'>
            <img src=${res.flag} alt=${res.name}>
            </div>
            <div class='countryName'> 
            <h1>${res.name} </h1>
            <div class='countryItemsCon'> 
            <div>
            <p> Native Name: ${res.nativeName} </p>
             <p> Population: ${res.population} </p>
              <p> Region: ${res.region} </p>
               <p> Sub Region:  ${res.subregion} </p>
                <p> Capital: ${res.capital} </p>
                </div>
                <div>
 <p> Top Level Domain: ${res.nativeName} </p>
  <p> Currencies: ${res.nativeName} </p>
   <p> Language: ${res.languages.map(lang =>  lang.name).join(' ')} </p>
                </div>
            </div>
            <div class='countryBorder'>
         ${res.borders.map(border => 

            `<button>${border}</button>`
           
            ).join('')}



                    </div> 
                    </div>

                    </div>
                     </div>

                    
                    `
                })
                
                searchedCountry.appendChild(searchReturn)


                console.log(result)
            } else {
                console.log('Country Does Not Exist')

            }



        })

    };
    //Filter By country
    // filterByRegion.addEventListener('click' , (e) => {
    //     const  selectOption = filterByRegion.options[filterByRegion.selectedIndex]
    //     const selectedOption = selectOption.text
    //     const query = searchBar.value.trim()

    //     if (selectOption) {
    //         const query = searchBar.value.trim()
    //         fetch('data.json').then(response=> response.json()).then(data=> {
    //          const dataArray = Object.values(data)
    //          const result = dataArray.filter(item=>  item.name===query)

    //          const filteredResult = dataArray.filter(item=>  item.region===selectedOption)
    //         if ((filteredResult)&&(result)) {
    //           console.log(filteredResult,result)
    //         }



    //        })


    //     }
    // }) 
})

// Country Details
fetch('data.json').then(response => response.json()).then(data => {
            const dataArray = Object.values(data)
            dataArray.forEach(item => {


                        const countryCon = document.createElement('div');
                        countryCon.addEventListener('click', (e) => {
                            console.log('works')
                            mainCon.style.display = 'none'
                            const showCountryDetails = document.createElement('div');
                            
                           
                            showCountryDetails.innerHTML = `
            <div class='flagDetailContainer'>
            <div class='backBtn'>
            <button id='directBtn' onclick="location.reload();">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
            Back</button>
            </div>
            <div class='countryFlag-name'> 

            <div class='countryFlag'>
            <img src=${item.flag} alt=${item.name}>
            </div>
            <div class='countryName'> 
            <h1>${item.name} </h1>
            <div class='countryItemsCon'> 
            <div>
            <p> Native Name: ${item.nativeName} </p>
             <p> Population: ${item.population} </p>
              <p> Region: ${item.region} </p>
               <p> Sub Region:  ${item.subregion} </p>
                <p> Capital: ${item.capital} </p>
                </div>
                <div>
 <p> Top Level Domain: ${item.nativeName} </p>
  <p> Currencies: ${item.nativeName} </p>
   <p> Language: ${item.languages.map(lang =>  lang.name).join(' ')} </p>
                </div>
            </div>
            <div class='countryBorder'>
         ${item.borders.map(border =>`<button>${border}</button>`).join('')}



                    </div> 
                    </div>

                    </div>
                     </div>

                    `
            showCountry.appendChild(showCountryDetails)
            console.log(item.borders)
        })
        countryCon.innerHTML = ` 
        <div class = 'flagComponent' id = 'flagComponents' >
                    <img src = '${item.flag}'
                    alt = '${item.name}' >
                    <div class = 'population' >
                    <p> <b> ${ item.name } </b> </p>
                    <div class = 'population-region' >
                    <span> <b> Population </b>: ${item.population}</span >
                    <span> <b> Region </b>: ${item.region}</span>
                    <span> <b> Capital </b>: ${item.capital}</span >
                    </div> 
                    </div>
</div>

                    `
        countryDetails.appendChild(countryCon)
    });
})
   // Dark Mode
    // Set initial mode based on saved preference
if (currentMode) {
    document.body.classList.add(currentMode);

}

toggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        headerBg.classList.remove('bg-color')
        toggleButton.classList.remove('dark-mode-color')
        filterByRegion.classList.remove('select-background')
        searchBar.classList.remove('input-background')

        
        localStorage.setItem('color-mode', 'light-mode');
    } else {
        toggleButton.classList.add('dark-mode-color')
        option.classList.add('option-style')
        searchBar.classList.add('input-background')
        filterByRegion.classList.add('select-background','backBtnChange')
        headerBg.classList.add('bg-color')
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }
});
