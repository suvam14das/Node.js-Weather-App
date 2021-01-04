//console.log("Client side javascript loaded !!!")

let weatherform = document.getElementById("weatherform") 

weatherform.addEventListener("submit", (e) => {
    e.preventDefault()
    let location = document.getElementById("location")
    console.log(location.value) 

    result.style.color = "black" 
    result.innerHTML = 'Loading....' 

    if(location.value.toUpperCase() === "SUNETRA") 
        return result.innerHTML =  'Location : In mao\'s heart<br />Weather : Its very steamy with temperatures upto 69*C'

    fetch('/weather?address='+location.value).then( (response) => {
    response.json().then((data) =>{
        console.log(data)
        let result = document.getElementById("result") 
        if(data.error)
        {
            console.log("Error : "+ data.error)
            result.style.color = "red" 
            result.innerHTML = 'Error : '+data.error

        } else{
            console.log(data.name) 
            console.log(data.condition) 
            result.style.color = "green" 
            result.innerHTML =  'Location : '+data.name+'<br />Weather : '+ data.condition       
        }        
    })
    
})
})

