// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require("daisyui")
  ],
}

const loadLessons =()=>{
    
    fetch("https://openapi.programming-hero.com/api/categories")

    
    

    .then((res)=>res.json())
    .then((data)=>{
        displaylesson(data.categories);
        
    })
}

let cart =[];
let total=0;


const loadLevelWord = () => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  // console.log(url);

  fetch(url)
    .then((res) => res.json()) 
    .then((data) => {
      // console.log(data.plants); 
      displayLevelWord(data.plants); 
    });
};


const loadFoodDetails=(id)=>{
  
  const url =`https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
  .then((res) => res.json()) 
    .then((data) => {
      displayModal(data.plants); 
       
    });



};



const displayLevelWord = (words) => { 
  const WordContainer = document.getElementById('word-container');
  WordContainer.innerHTML = "";

  for (let word of words) {
    // console.log(word);
    const card=document.createElement("div")
    card.innerHTML=`

    <div class=" space-y-2 bg-white rounded-2xl p-2">

         <div><img class=" md:w-[300px] md:h-[190px] rounded-lg" src="${word.image}" alt=""></div>
                <h3 onclick="loadFoodDetails(${word.id})" class="font-bold text-[20px] plant-title">${word.name}</h3>
                <p class="text-[#1F2937] ">${word.description}</p>
                
                <div class="flex justify-between items-center">
                    <button class="bg-[#caebd6] text-[#15803D] p-2 rounded-xl">${word.category}</button>
                    <p>৳<span class="plant-price">${word.price}</span></p>
                </div>
                <button onclick="addtoCart(this)" class="bg-[#15803D] text-white w-full rounded-xl p-2">Add to Cart</button>


    </div>

    
    
    
    `;
    WordContainer.append(card);
   
  }
};



const loadPlant=(id) =>{

  
  const url =`https://openapi.programming-hero.com/api/category/${id}`

  // 1 no kaj
  const btns = document.querySelectorAll(".levelClass")
  btns.forEach(btn=>{
    btn.classList?.remove("active")
  })

  //  2 no kaj
  const currentBtn=document.getElementById(`lesson_btn_${id}`)
  
  currentBtn.classList?.add("active")

  
  fetch(url)

  .then((res)=>res.json())
    .then((data)=>{
        displayLevelWord(data.plants);
        
    })
  

}



const displaylesson = (lessons) =>{
    const levelContainer = document.getElementById("level-container");
    // console.log(levelContainer)
    levelContainer.innerHTML="";
    for(let lesson of lessons){
        // console.log(lesson)
        const btnDiv=document.createElement("div")
        btnDiv.innerHTML=`

        
                
                 <button id="lesson_btn_${lesson.id}" onclick="loadPlant(${lesson.id})" onclick="loadLevelWord('${lesson.category_name}')" class="levelClass justify-start  text-left w-full btn btn-soft hover:bg-green-700 hover:text-white ">${lesson.category_name}</button>
                
        
        
        
        `;
        levelContainer.append(btnDiv);
        // hover:bg-[#166534] hover:text-[white]

    }

}

const displayModal=(food)=>{
  
  const detailContainer = document.getElementById('detailsContainer')
  detailContainer.innerHTML=`

  <div class="space-y-2">
       <h1 class="font-extrabold text-[20px]">${food.name}</h1>
        <div class="rounded-xl">
            <img class="w-full h-1/2" src="${food.image}" alt="">
        </div>
        <p><span class="font-bold">category:</span> ${food.category}</p>
        <p><span class="font-bold">price:</span>৳ ${food.price}</p>
        <p><span class="font-bold">description:</span> ${food.description}</p>
  
  </div>

  
  
  `;
  document.getElementById("my_modal_5").showModal()


}


loadLessons()
loadLevelWord()



const addtoCart =(btn )=>{
  
  // console.log('adddddddddddddddddddddddddddd',btn)
  const card =btn.parentNode.parentNode;
  const plantTitle = card.querySelector(".plant-title").innerText;
  const plantPrice=card.querySelector('.plant-price').innerText;
  const plantPriceNum=Number(plantPrice)
  // console.log(plantTitle , plantPriceNum)

  const selectedItem ={
    plantTitle:plantTitle,
    plantPrice:plantPriceNum

  };
  cart.push(selectedItem);
  total = total + plantPriceNum;
  displayCart(cart)
  displayTotal(total)
}

const displayTotal =(val)=>{
  document.getElementById("cart-total").innerHTML=val ;
}

displayCart=(cart)=>{
  const cartContainer= document.getElementById("cart-container");
  cartContainer.innerHTML="";
  for(let item of cart){
    const newItem=document.createElement("div");
    newItem.innerHTML=`
          
                <div class="flex justify-between items-center bg-[#F0FDF4] p-3 rounded-lg mb-3 ">
                    <div class="space-y-1">
                        <p class="plant-tittle font-bold">${item.plantTitle}</p>
                        <p class= "text-gray-500">৳ <span class="item-price"> ${item.plantPrice}</span></p>
                    </div>
                    <div onclick="removeCart(this)">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
                
    
    `;
    cartContainer.append(newItem);
  }

}

    setTimeout(() => {
      document.getElementById('spinner').classList.add('hidden');
     
     
     
      document.getElementById('content').classList.remove('hidden');
    }, 3000);
    

    const removeCart=(btn)=>{
      const item =btn.parentNode;
      const plantTittle =item.querySelector('.plant-tittle').innerText
      const itemPrice =Number(item.querySelector(".item-price").innerText)
      
      cart =cart.filter(item=>item.plantTitle != plantTittle)
      // total = total - itemPrice;
      total=0;
      cart.forEach(item=> total += item.plantPrice)
      displayCart(cart)
      displayTotal(total)

    }



   