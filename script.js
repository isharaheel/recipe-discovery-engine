document.addEventListener('DOMContentLoaded' , function(){
   const navbar = document.getElementById("navbar");
   const spacer = document.getElementById("spacer");
   const mainNav = document.querySelector(".mainNav");
   const searchBar = document.getElementById('searchInput');
   const foodContainer = document.getElementById('foodContainer');

fetchDataFromApi()
searchBar.addEventListener('input', fetchDataFromApi);

   function fetchDataFromApi() {
    const term = searchBar.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=` + term)
      .then(res => res.json())
      .then(data => displayData(data.meals));
  }





  function displayData(data) {
    foodContainer.innerHTML = '';
  data.forEach(obj => {

  let foodDiv = document.createElement('div');
    foodDiv.className = 'foodDiv';
    foodContainer.appendChild(foodDiv);

    let foodImageDiv = document.createElement('div');
    foodImageDiv.className = 'foodImgDiv'; 
    foodDiv.appendChild(foodImageDiv);

    let foodImage = document.createElement('img');
    foodImage.className = 'foodImg';
    foodImage.src = obj.strMealThumb; 
    foodImage.alt = obj.strMeal;
    foodImageDiv.appendChild(foodImage);
   
    
    let foodInfo = document.createElement('div')
    foodInfo.className = 'foodInfo'
    foodDiv.appendChild(foodInfo)

    let foodTitle = document.createElement('p')
    foodTitle.className = 'foodTitle'
    foodTitle.innerText = obj.strMeal
    foodInfo.appendChild(foodTitle)

    let foodSubtitle = document.createElement('p')
    foodSubtitle.className = 'foodSubtitle'
    foodSubtitle.innerText = obj.strArea + "  " + 'Recpie'
    foodInfo.appendChild(foodSubtitle)

    let foodDescription = document.createElement('p')
    foodDescription.className = 'foodDescription'
    foodDescription.innerText = 'Please click here to see Details...'
    foodInfo.appendChild(foodDescription)

    let clickBtn = document.createElement('button')
    clickBtn.className = 'clickBtn'
    clickBtn.innerText = 'Click Here'
    foodInfo.appendChild(clickBtn)

  


     clickBtn.addEventListener('click', () => {
  const overlay = document.createElement('div');
  overlay.className = 'recipeOverlay';

  const overlayContent = document.createElement('div');
  overlayContent.className = 'overlayContent';

  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.className = 'closeBtn';
  closeBtn.addEventListener('click', () => {
    overlay.remove();
  });

  const leftSection = document.createElement('div');
  leftSection.className = 'leftSection';
  const image = document.createElement('img');
  image.src = obj.strMealThumb;
  image.alt = obj.strMeal;
  leftSection.appendChild(image);

  const rightSection = document.createElement('div');
  rightSection.className = 'rightSection';

  const title = document.createElement('h2');
  title.innerHTML = `<strong>Recipe Name:</strong> ${obj.strMeal}`;

  const area = document.createElement('h3');
  area.innerHTML = `<strong>Country:</strong> ${obj.strArea} Recipe`;

  const instructionsTitle = document.createElement('h3');
  instructionsTitle.innerHTML = `<strong>Instructions:</strong>`;

  const instructions = document.createElement('p');
  instructions.innerText = obj.strInstructions;

  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.innerHTML = `<strong>Ingredients:</strong>`;

  const ingredientsGrid = document.createElement('div');
  ingredientsGrid.className = 'ingredientsGrid';

  for (let i = 1; i <= 20; i++) {
    const ingredient = obj[`strIngredient${i}`];
    const measure = obj[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      const item = document.createElement('div');
      item.innerText = `${ingredient}`;
      ingredientsGrid.appendChild(item);
    }
  }

  rightSection.appendChild(title);
  rightSection.appendChild(area);
  rightSection.appendChild(instructionsTitle);
  rightSection.appendChild(instructions);
  rightSection.appendChild(ingredientsTitle);
  rightSection.appendChild(ingredientsGrid);

  overlayContent.appendChild(closeBtn);
  overlayContent.appendChild(leftSection);
  overlayContent.appendChild(rightSection);
  overlay.appendChild(overlayContent);
  document.body.appendChild(overlay);
});
});
}
})