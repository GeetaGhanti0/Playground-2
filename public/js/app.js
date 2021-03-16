//client side Java script 




const weather_form = document.querySelector('form')
const address_input = document.querySelector('input')
const p1 = document.querySelector('#message-1')
const p2 = document.querySelector('#message-2')

p2.textContent =''
p1.textContent =''

weather_form.addEventListener('submit', (e) => {
    e.preventDefault()

    p1.textContent='Loading...'
    p2.textContent = ''

    const location =  address_input.value

    if(location !== undefined &&  location !== ''){

        fetch('/weather?address='+location).then((response) => {
            console.log(response);
        response.json().then((data) => {
            if(!data.error){
                p1.textContent = data.address 
                p2.textContent = data.forecast 
                
            }
                else{
                    p2.textContent = ''
                    p1.textContent = data.error
                
            }

            })

})

} else {
    p2.textContent = ''
    p1.textContent = 'Location cannot be empty'

}

})