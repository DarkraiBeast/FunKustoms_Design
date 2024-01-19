var apparelPrice = document.getElementById('apparelPrice').value;
var price = 0;
function updatePrice() {
  // Get the selected option
  selectedOption = document.querySelector('select').value;

  // Set the price based on the selected option
  // var price = 0;
  switch (selectedOption) {
    case "Tshirts":
      price = 300; // Set the price for Normal Tshirt
      break;
    case "Over_Tshirts":
      price = 375; // Set the price for Normal Tshirt
      break;
    case "PoloTshirt":
      price = 450; // Set the price for Normal Tshirt
      break;
    case "Sweatshirts":
      price = 555; // Set the price for Normal Tshirt
      break;
    case "Hoodies":
      price = 750; // Set the price for Normal Tshirt
      break;
    // Add cases for other options if needed

    default:
      // Default price if none of the specific cases match
      price = 0;
  }

  // Update the input field with the calculated price
  document.getElementById('apparelPrice').value = price;
}

function openDrawer() {
  document.getElementById("myDrawer").style.width = "250px";
}

function closeDrawer() {
  document.getElementById("myDrawer").style.width = "0";
}

function showDesign(design) {
  // Hide all content
  document.getElementById('frontContent').style.display = 'none';
  document.getElementById('backContent').style.display = 'none';
  document.getElementById('leftContent').style.display = 'none';
  document.getElementById('rightContent').style.display = 'none';

  // Show the selected content
  document.getElementById(`${design}Content`).style.display = 'block';

  // Remove active class from all tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Add active class to the clicked tab
  event.target.classList.add('active');

}
function updateLabels(design, selectElement) {
  // Get the selected option from the dropdown
  var selectedOption = selectElement.value;

  // Split the selected option into width and height
  var [width, height] = selectedOption.split(' x ');

  // Update the labels with the width and height values
  document.getElementById(`${design}WidthLabel`).textContent = width;
  document.getElementById(`${design}HeightLabel`).textContent = height;
}


function showSize(design, sizeType) {
  // Hide all content
  document.getElementById(`${design}DefaultTabfixed`).style.display = 'none';
  document.getElementById(`${design}DefaultTabcustom`).style.display = 'none';

  // Show the selected content
  document.getElementById(`${design}DefaultTab${sizeType}`).style.display = 'block';

  // Remove active class from all tabs
  document.querySelectorAll(`#${design} .defaultTab`).forEach(tab => {
    tab.classList.remove('active');
  });

  // Add active class to the clicked tab
  event.target.classList.add('active');
}
// function showSize(design) {
//   // Hide all content
//   document.getElementById('defaultTabfixed').style.display = 'none';
//   document.getElementById('defaultTabcustom').style.display = 'none';

//   // Show the selected content
//   document.getElementById(`defaultTab${design}`).style.display = 'block';

//   // Remove active class from all tabs
//   document.querySelectorAll('.defaultTab').forEach(tab => {
//     tab.classList.remove('active');
//   });

//   // Add active class to the clicked tab
//   event.target.classList.add('active');
// }




var selectedTabs = {}; // Object to keep track of selected tabs

var heightValue, widthValue;
function saveDimensions(tab, design) {

  var customTab = document.getElementById(`${design}DefaultTabcustom`);
  var fixedTab = document.getElementById(`${design}DefaultTabfixed`);

  if (customTab.style.display !== 'none') {
    // Use custom values
    heightValue = document.getElementById(`${design}designHeightInput`).value;
    widthValue = document.getElementById(`${design}designWidthInput`).value;
  } else if (fixedTab.style.display !== 'none') {
    // Use fixed values
    heightValue = parseFloat(document.getElementById(`${design}HeightLabel`).textContent) || 0;
    widthValue = parseFloat(document.getElementById(`${design}WidthLabel`).textContent) || 0;
  } else {
    // Handle the case when neither custom nor fixed tab is displayed
    return;
  }


  var selectedDimensions = {
    tab: tab,
    width: widthValue,
    height: heightValue
  };

  if (!selectedTabs[design]) {
    selectedTabs[design] = [];
  }

  selectedTabs[design].push(selectedDimensions);

  if (!selectedTabs[tab]) {
   
    var selectedDimensionsDiv = document.createElement('div');
    selectedDimensionsDiv.textContent = tab + ' => Width: ' + widthValue + ', Height: ' + heightValue;

    // Create a delete button with a trash icon from Font Awesome
    var deleteButton = document.createElement('span');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt deleteButton"></i>';
    deleteButton.onclick = function () {
      selectedDimensionsDiv.remove();
      selectedTabs[tab] = false; // Allow adding the same tab again after deleting
    };

    // Append the delete button to the dimensions div
    selectedDimensionsDiv.appendChild(deleteButton);

    // Append the new div to the "List Selected" container
    document.getElementById('listSelected').appendChild(selectedDimensionsDiv);

    selectedTabs[tab] = true; // Mark the tab as selected
  } else {
    alert('You have already added a dimension for ' + tab);
  }



}

function updateGST() {
  // Get the selected GST value
  var selectedGST = document.getElementById('gst').value;

  // Update the input field with the selected GST value
  document.getElementById('selectedGSTInput').value = selectedGST;

  // You can perform other price-related calculations or updates here if needed
}

function updateListSelectedUI() {
  console.log(selectedTabs);
}



function calculatePrice() {
  var totalArea = 0;

  // Iterate through selected tabs and calculate total area
  for (var design in selectedTabs) {
    if (selectedTabs.hasOwnProperty(design)) {
      // Iterate through selected dimensions for each design (front, back)
      for (var i = 0; i < selectedTabs[design].length; i++) {
        var dimensions = selectedTabs[design][i];
        var height = dimensions.height || 0;
        var width = dimensions.width || 0;

        totalArea += height * width;
      }
    }
  }

  // Get the value of the apparel price input
  var apparelPriceInput = document.getElementById('apparelPrice');
  var apparelPrice = parseFloat(apparelPriceInput.value) || 0;

  // Calculate grandtotal with the total area and apparel price
  var grandtotal = totalArea + apparelPrice;

  var discountSelect = document.getElementById('discount');
  if (discountSelect.value === '10') {
    // Apply a 10% discount
    var discountAmount = (10 / 100) * grandtotal;
    grandtotal -= discountAmount;
  }
  

  var selectedGSTInput = document.getElementById('selectedGSTInput');
  var selectedGST = parseFloat(selectedGSTInput.value) || 0;

  grandtotal += (selectedGST / 100) * grandtotal;


  grandtotal = Math.round(grandtotal / 5) * 5;
  // Display the result in the modal
  document.getElementById('resultArea').textContent = 'Total Price: ₹ ' + grandtotal.toFixed(2) + '/- ';

  // Show the modal
  $('#resultModal').modal('show');
}
