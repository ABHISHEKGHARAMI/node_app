console.log('client side javascript');

fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})



const weatherfrom = document.querySelector('form') ;
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');

messageOne.textContent = '';

messageTwo.textContent = '';

messageThree.textContent = '';

messageFour.textContent = '';

weatherfrom.addEventListener('submit',(e)=>{

    e.preventDefault()

    const location = search.value ;

    messageOne.textContent = 'Loading.......';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error;
        }
        else{
            messageOne.textContent = 'Temp :'+ data.temp;
            messageTwo.textContent = 'Feels Temp :' + data.feels_temp;
            messageThree.textContent = 'Description :'+data.des;
            messageFour.textContent ='Location :'+data.placename;
            
        }
    })
})
})