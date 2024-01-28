/// <reference types="../@types/jquery" />
///////////////////open nav////////////////////
function openNav () {
    // console.log("hui");
    $(".nav").animate({left:"0px"},500)
    
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    
    for (let i = 0; i < 5; i++) {
        $(".menue  ul li ").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    } 
}
function closeNav() {
    let boxWidth = $(".menue").outerWidth()
    $(".nav").animate({left:-boxWidth},500)
    
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");

    for (let i = 0; i < 5; i++) {
        $(".menue  ul li ").eq(i).animate({
            top:"300px"
        }, (i + 5) * 100)
    
}}
$(" .open-close-icon").on("click",function () {
    

    if ($(".nav").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})
////////////////////////////////////////////////////////



let data=document.getElementById("data");
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
let search=document.getElementById("searchContainer")
let submit;

//////////////////////////////////
function displaymeal(arr) {
    let cartona=``
   for(let i=0;i<arr.length;i++){
    cartona+=`
    <div class="col-md-3">
    <div onclick="getmealdetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${arr[i].strMeal}</h3>
        </div>
    </div>
</div>
    
    `
   }
   data.innerHTML=cartona; 
}

async function getmealdetails(mealID) {
    data.innerHTML=""
    search.innerHTML=''
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    res = await res.json();
    displaymealdetails(res.meals[0])

    
}
function displaymealdetails(meal) {
    let ingredients = ``
    search.innerHTML=''

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} 
            ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    data.innerHTML = cartoona
    
}
/////////////////////categry////////////////////////
async function getcategry() {
    data.innerText="";
    search.innerHTML=''
    let res=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let finalres=await res.json()
    displaycategry(finalres.categories)
    
}
function displaycategry(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getcatmeal('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    data.innerHTML = cartoona
    
}
async function getcatmeal(category) {
    data.innerHTML=""
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let fres=await res.json()
    displaymeal(fres.meals.slice(0, 20))
    
}
///////////////////////area///////////////////////
async function getarea() {
    data.innerText="";
    search.innerHTML=''
    let res=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let finalres=await res.json()
    displayarea(finalres.meals)
    
}
function displayarea(arr) {
    let cartona='';
    for (let i = 0; i < arr.length; i++) {
        cartona+=`
        <div class="col-md-3">
        <div onclick="gatareameal('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer text-white">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${arr[i].strArea}</h3>
</div>
        </div>
        
        `
        
    }
    data.innerHTML=cartona
    
}
async function gatareameal( area) {
    data.innerHTML=""
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let fres=await res.json()
    displaymeal(fres.meals.slice(0, 20))

    
}

///////////////////////////////////ingedients////////
async function getingradients() {
    data.innerHTML="";
    search.innerHTML=''
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let fres=await res.json()
    displayingredients(fres.meals.slice(0, 20))
    
}
function displayingredients(arr) {
    let cartoona=""
    for (let i = 0; i < arr.length; i++) {
        cartoona+=`
        <div class="col-md-3 ">
                <div onclick="getingredientsmeal('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer text-white ">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        
        `
        
    }
    data.innerHTML=cartoona;
    
}
async function getingredientsmeal(ingredients) {
    data.innerHTML=""
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let fres=await res.json()
    displaymeal(fres.meals.slice(0, 20))

    
}
////////////////////////////////contact us////////////////////////
function contactus() {
    data.innerHTML=`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
submit=document.getElementById("submitBtn")
document.getElementById("nameInput").addEventListener("focus",function () {
    nameInputTouched=true
    
})
document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})
 
}
////////vaildation of inputs

function namevalidation() {
    let regex=/^[a-zA-Z ]+$/
    let text=document.getElementById("nameInput").value
    if(regex.test(text)==true){
        return true

    }
    
}
function emailvalidation() {
    let regex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let text=document.getElementById("emailInput").value
    if(regex.test(text)==true){
        return true

    }
    
}
function phonevalidation() {
    let regex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    let text=document.getElementById("phoneInput").value
    if(regex.test(text)==true){
        return true

    }
    
}
function agevalidation() {
    let regex=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    let text=document.getElementById("ageInput").value
    if(regex.test(text)==true){
        return true

    }
    
}
function passwordvalidation() {
    let regex=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    let text=document.getElementById("passwordInput").value
    if(regex.test(text)==true){
        return true

    }
    
}
function repasswordvalidation() {
    let text=document.getElementById("passwordInput").value
    let repassword=document.getElementById("repasswordInput").value
    if(text==repassword){
        return true

    }
    
}

function inputsValidation() {
    if (nameInputTouched) {
        if (namevalidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailvalidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phonevalidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (agevalidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordvalidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordvalidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (namevalidation() &&
    emailvalidation() &&
        phonevalidation() &&
        agevalidation() &&
        passwordvalidation() &&
        repasswordvalidation()) {
            submit.removeAttribute("disabled")
    } else {
        submit.setAttribute("disabled", true)
    }
}
/////////////////////////searcing//////////////////
function searchdata(){
    search.innerHTML=`
    
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchname(this.value)"class="form-control bg-transparent text-white search" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchfristletter(this.value)" maxlength="1" class="form-control bg-transparent text-white search" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    data.innerHTML = ""
    
    
}




async function searchname(term) {
    closeNav()
    data.innerHTML=""
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let fres=await res.json()
    fres.meals ? displaymeal(fres.meals) : displaymeal([])
    
}
async function searchfristletter(term) {
    closeNav()
    data.innerHTML=""
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let fres=await res.json()
    fres.meals ? displaymeal(fres.meals) : displaymeal([])
    
}



    /////////////////////////////loading screen/////////////////
    $(function () {
        searchname("").then(() => {
            $(".loader").fadeOut(1000,function () {
                $(".loading").fadeOut(500,function () {
                    $("body").css("overflow","visible")
                    $(".loading").remove()
                })
    
            })

  
        })
        
    })
  

