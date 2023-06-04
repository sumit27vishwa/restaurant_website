// Function to get the menu
function getMenu() {
  if (document.body.classList.contains('menu')) {
    const ele = document.getElementsByClassName("menu");
    ele.remove();
  } else {
    fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
      .then(response => response.json())
      .then(data => {
        // Display the menu items on the webpage
        const menuDiv = document.createElement('div');
        menuDiv.setAttribute('id', 'menu');
        data.forEach(item => {
          const menuItem = document.createElement('p');
          menuItem.textContent = item.name + ' - $' + item.price;
          menuDiv.appendChild(menuItem);
        });
        const box = document.getElementsByClassName("dynamic-display");
        box.appendTo(menuDiv);
      })
      .catch(error => {
        console.log('Error fetching menu:', error);
      });
  }

}

// Function to take the order
function takeOrder() {
  return new Promise(resolve => {
    setTimeout(() => {
      const order = {
        burgers: ['Burger 1', 'Burger 2', 'Burger 3']
      };
      resolve(order);
    }, 2500);
  });
}

// Function for order preparation
function orderPrep() {
  return new Promise(resolve => {
    setTimeout(() => {
      const orderStatus = {
        order_status: true,
        paid: false
      };
      resolve(orderStatus);
    }, 1500);
  });
}

// Function for payment
function payOrder() {
  return new Promise(resolve => {
    setTimeout(() => {
      const orderStatus = {
        order_status: true,
        paid: true
      };
      resolve(orderStatus);
    }, 1000);
  });
}

// Function to display the thank you message
function thankYou() {
  alert('Thank you for eating with us today!');
}

// Event listeners for the buttons
document.getElementById('menuButton').addEventListener('Click', getMenu);
document.getElementById('orderButton').addEventListener('Click', () => {
  takeOrder()
    .then(order => {
      console.log('Order:', order);
      return orderPrep();
    })
    .then(orderStatus => {
      console.log('Order status:', orderStatus);
      return payOrder();
    })
    .then(orderStatus => {
      console.log('Order status:', orderStatus);
      if (orderStatus.paid) {
        thankYou();
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
});
document.getElementById('payButton').addEventListener('Click', payOrder);
