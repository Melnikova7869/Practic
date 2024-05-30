const ingredientsInput = document.getElementById('ingredientsInput');
const addPizzaButton = document.getElementById('addPizzaButton');
const orderPizzasButton = document.getElementById('orderPizzasButton');
const pizzaList = document.getElementById('pizzaList');
const errorMessage = document.getElementById('pizzasInput');

let pizzas = [];

function addPizza() {
  const ingredientsString = ingredientsInput.value.trim();
  const ingredients = ingredientsString.split(',');

  if (ingredients.length === 0) {
    errorMessage.textContent = 'Введите ингредиенты!';
    return;
  }

  for (const ingredient of ingredients) {
    if (typeof ingredient !== 'string' || !isNaN(ingredient.trim())) {
      errorMessage.textContent = 'Неправильный формат ингредиентов!';
      return;
    }
  }

  pizzas.push(ingredients);
  updatePizzaList();
  updateOrderButton();
}

function makePizza(ingredients) {
  const cookingTime = ingredients.length * 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      const pizzaDescription = `Пицца с ${ingredients.join(', ')} готова!`;
      resolve(pizzaDescription);
    }, cookingTime);
  });
}

function orderPizzas() {
  if (!pizzas.length) {
    errorMessage.textContent = 'В заказе нет пицц!';
    return;
  }

  orderPizzasButton.textContent = 'Заказ в работе';
  orderPizzasButton.disabled = true;
  const pizzaPromises = pizzas.map((ingredients) => makePizza(ingredients));

  Promise.all(pizzaPromises)
    .then((pizzaDescriptions) => {
      pizzaList.innerHTML = '';
      pizzas = [];
      updateOrderButton();
      pizzaList.textContent = 'Ваш заказ готов!:';

      for (const piz of pizzaDescriptions) {
        const listIn = document.createElement('li');
        listIn.textContent = piz;
        pizzaList.appendChild(listIn);
      }
    })
    .finally(() => {
      orderPizzasButton.textContent = 'Заказать n пицц';
      orderPizzasButton.disabled = false;
    });
};


function updatePizzaList() {
  pizzaList.innerHTML = '';

  for (const ingredients of pizzas) {
    const listItem = document.createElement('li');
    listItem.textContent = ingredients.join(', ');
    pizzaList.appendChild(listItem);
  }
}

function updateOrderButton() {
  orderPizzasButton.textContent = `Заказать ${pizzas.length} пицц`;
}

addPizzaButton.addEventListener('click', addPizza);
orderPizzasButton.addEventListener('click', orderPizzas);
