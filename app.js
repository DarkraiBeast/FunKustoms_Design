// function calculatePrice() {
//     const apparelType = document.getElementById('apparelType').value;
//     const apparelPrice = parseFloat(document.getElementById('apparelPrice').value);
//     const designSize = document.getElementById('designSize').value;
//     const designPrice = parseFloat(document.getElementById('designPrice').value);
//     const discount = parseFloat(document.getElementById('discount').value) || 0;
//     const gst = parseFloat(document.getElementById('gst').value);
 
//     const designDimensions = designSize.split('x');
//     const designArea = parseFloat(designDimensions[0]) * parseFloat(designDimensions[1]);
//     const designTotalPrice = designArea * designPrice;

//     const totalPrice = apparelPrice + designTotalPrice;
//     const discountAmount = (discount / 100) * totalPrice;
//     const gstAmount = (gst / 100) * totalPrice;
//     const finalPrice = totalPrice + gstAmount - discountAmount;

//     const resultText = `Type of Apparel: ${apparelType}\nFinal Price: $${finalPrice.toFixed(2)}`;

//     document.getElementById('finalPrice').innerText = resultText;
//     $('#resultModal').modal('show');
// }

var price=0;
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


var selectedTabs = {}; // Object to keep track of selected tabs


function saveDimensions(tab, heightInputId, widthInputId) {
    // Get the input values
    if (!selectedTabs[tab]) {
        // Get the input values
        var heightValue = document.getElementById(heightInputId).value;
        var widthValue = document.getElementById(widthInputId).value;
  
        // Create a new div to display the selected dimensions
        var selectedDimensionsDiv = document.createElement('div');
        selectedDimensionsDiv.textContent = tab + ' => Height: ' + heightValue + ', Width: ' + widthValue;
  
        // Create a delete button with a trash icon from Font Awesome
        var deleteButton = document.createElement('span');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt deleteButton"></i>';
        deleteButton.onclick = function() {
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
    
  

    // Append the new div to the "List Selected" container
    document.getElementById('listSelected').appendChild(selectedDimensionsDiv);
}
// -------------------------------
// function calculatePrice() {
//     // Calculate the total area for each tab
//     var totalArea = 0;
  
//     // Iterate through selected tabs and calculate total area
//     for (var tab in selectedTabs) {
//       if (selectedTabs[tab]) {

//         var tabWithoutSpaces = tab.replace(" ", '').toLowerCase();

//         var heightInputId = tabWithoutSpaces + 'HeightInput';
//       var widthInputId = tabWithoutSpaces + 'WidthInput';

  
//         console.log('Checking IDs for tab: ' + tab);
//         console.log('Height input ID: ' + heightInputId);
//         console.log('Width input ID: ' + widthInputId);
  
//         // Dynamically check if the input fields exist
//         var heightInput = document.getElementById(heightInputId);
//         var widthInput = document.getElementById(widthInputId);
  
//         if (heightInput && widthInput) {
//           var heightValue = parseFloat(heightInput.value) || 0;
//           var widthValue = parseFloat(widthInput.value) || 0;
  
//           totalArea += heightValue * widthValue;
//           var grandtotal = totalArea + price
//         } else {
//           console.error('Input fields not found for ' + tab);
//         }
//       }

      
//     }
  
//     // Display the result in the modal
//     document.getElementById('resultArea').textContent = 'Total Area: ' + grandtotal.toFixed(2) + ' square units';
  
//     // Show the modal
//     $('#resultModal').modal('show');
//   }

  function calculatePrice() {
    // Calculate the total area for each tab
    var totalArea = 0;
  
    // Iterate through selected tabs and calculate total area
    for (var tab in selectedTabs) {
        if (selectedTabs[tab]) {
            var tabWithoutSpaces = tab.replace(" ", '').toLowerCase();
            var heightInputId = tabWithoutSpaces + 'HeightInput';
            var widthInputId = tabWithoutSpaces + 'WidthInput';
    
            console.log('Checking IDs for tab: ' + tab);
            console.log('Height input ID: ' + heightInputId);
            console.log('Width input ID: ' + widthInputId);
    
            // Dynamically check if the input fields exist
            var heightInput = document.getElementById(heightInputId);
            var widthInput = document.getElementById(widthInputId);
    
            if (heightInput && widthInput) {
                var heightValue = parseFloat(heightInput.value) || 0;
                var widthValue = parseFloat(widthInput.value) || 0;
    
                totalArea += heightValue * widthValue;
            } else {
                console.error('Input fields not found for ' + tab);
            }
        }
    }
  
    // Calculate grandtotal without discount
    var grandtotal = totalArea + price;

    // Check if a discount is selected
    var discountSelect = document.getElementById('discount');
    if (discountSelect.value === '10') {
        // Apply a 10% discount
        var discountAmount = (10 / 100) * grandtotal;
        grandtotal -= discountAmount;
    }
  
    // Display the result in the modal
    document.getElementById('resultArea').textContent = 'Total Price: ' + grandtotal.toFixed(2) + ' /-';
  
    // Show the modal
    $('#resultModal').modal('show');
}
