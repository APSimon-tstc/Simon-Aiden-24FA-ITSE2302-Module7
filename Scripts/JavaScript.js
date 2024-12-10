//VARIABLES
var orderForm = document.querySelector("#tshirtOrderForm");
var orderSummary = document.getElementById("orderSummary");
// define constants and variables to reduce work and make it easier to call them
//CONSTANTS
const schoolName = document.getElementById("schoolName");
const customerName = document.getElementById("customerName");
const email = document.getElementById("email");
const shirtQuantity = document.getElementById("shirtQuantity");
const shirtSelect = document.getElementById("shirtSelect");

// get references to the image
const image = document.getElementById("shirtImg");

// add an event listener to detect changes in the dropdown
shirtSelect.addEventListener("change", function () {
  // change the image source to the selected options value
  const selectedValue = shirtSelect.value;
  image.src = "Images/" + selectedValue + ".png"; //change image source (image source name matches with value)
});

//EVENT LISTENER
orderForm.addEventListener("submit", function (event) {
  //event listener to preform functions when submit button is pressed
  event.preventDefault(); // prevent reset on refresh
  // put all input values into seperate constant so i am able to call them later on
  const schoolNameValue = schoolName.value;
  const customerNameValue = customerName.value;
  const emailValue = email.value;
  const shirtQuantityValue = shirtQuantity.value;
  const shirtSelectValue = shirtSelect.value;

  if (
    validateForm(
      schoolNameValue,
      customerNameValue,
      emailValue,
      shirtQuantityValue,
      shirtSelectValue
    )
  ) {
    displayOrderSummary(
      schoolNameValue,
      customerNameValue,
      emailValue,
      shirtQuantityValue,
      shirtSelectValue
    );
  }
});

orderForm.addEventListener("reset", function () {
  orderSummary.innerHTML = "";
}); //reset

function validateForm( //validate the form to make sure that all fields have at least one input
  schoolNameValue,
  customerNameValue,
  emailValue,
  shirtQuantityValue
) {
  //turn all the radios and checkboxes into constants to use in later switch statement
  const feature4 = document.querySelector(
    "input[name='feature'][id='feature4']"
  ).checked;
  const feature1 = document.querySelector(
    "input[name='feature'][id='feature1']"
  ).checked;
  const feature2 = document.querySelector(
    "input[name='feature'][id='feature2']"
  ).checked;
  const feature3 = document.querySelector(
    "input[name='feature'][id='feature3']"
  ).checked;

  const standardShipping = document.querySelector(
    "input[name='Shipping'][id='standShip']"
  ).checked;
  const expressShipping = document.querySelector(
    "input[name='Shipping'][id='expShip']"
  ).checked;

  //BOOLEAN
  //SWITCH
  switch (
    true //switch statement to validate all the fields
  ) {
    case !schoolNameValue:
      alert("School name is required!");
      schoolName.focus();
      return false;

    case !customerNameValue:
      alert("Customer name is required!");
      customerName.focus();
      return false;

    case !emailValue || !(emailValue.includes("@") && emailValue.includes(".")):
      alert("Please enter a valid email address!");
      email.focus();
      return false;

    case !shirtQuantityValue || shirtQuantityValue < 1:
      alert("Please enter the amount of shirts you wish to purchase");
      shirtQuantity.focus();
      return false;

    case !(feature1 || feature2 || feature3 || feature4):
      alert("You need at least one feature!");
      return false;

    case !standardShipping && !expressShipping:
      alert("Please select a shipping option");
      return false;

    default:
      return true; // return true if all is true
  }
}

function displayOrderSummary( //function to display the order summary after all fields pass validation
  schoolNameValue,
  customerNameValue,
  emailValue,
  shirtQuantityValue,
  shirtSelectValue
) {
  //ARRAY
  const inputs = orderForm.querySelectorAll("input, select"); //select all the inputs into an array to be used to calculate the summary

  let summary = "<h3> Order Placed</h3>";
  let totalPrice = 0; //LET

  //ARITHMETIC OPERATORS
  totalPrice = shirtSelectValue * shirtQuantityValue; // put this before following statements, will not provide proper calculations otherwise
  inputs.forEach(function (input) {
    if (input.type === "checkbox" && input.checked) {
      summary += "<p>" + input.name + ": $" + input.value + "</p>"; // put value in summary
      totalPrice += parseInt(input.value); // add the value from the checkboxes to the total
    }

    if (input.type === "radio" && input.checked) {
      summary += "<p>" + input.name + ": $" + input.value + "</p>"; //put value in summary
      totalPrice += parseInt(input.value); // add the value from the radios to the total
    }

    if (
      input.type === "text" ||
      input.type === "email" ||
      input.type === "number"
    ) {
      // put all the other input types into the summary
      summary += "<p>" + input.name + ": " + input.value + "</p>";
    }

    if (input.type === "select-one") {
      if (input.id === "shirtSelect") {
        summary +=
          "<p>Selected T-shirt Design: " +
          input.options[input.selectedIndex].text +
          "</p>"; // add the dropdown to the summary
      } else if (input.id === "shirtQuantity") {
        //IF AND ELSE
        summary += "<p>Quantity: " + input.value + " Shirts</p>"; // put quantity into summary
      }
    }
  });

  summary += "<p><strong>Total Price:</strong> $" + totalPrice + "</p>"; // put total price into summary with emphisis
  orderSummary.innerHTML = summary; // puts whole summary into the html

  orderSummary.style.display = "block"; // changes the display type for the summary to appear on submit
}
