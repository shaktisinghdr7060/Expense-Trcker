function clearText() {
    document.getElementById("editor").value = "";
}

function saveText() {
    var content = document.getElementById("editor").value;
    if (content.trim() !== "") {
        // Retrieve existing saved items from localStorage
        var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

        // Add the new content to the list of saved items
        savedItems.push({ content: content, timestamp: new Date().toLocaleString() });

        // Save the updated list back to localStorage
        localStorage.setItem("savedItems", JSON.stringify(savedItems));

        // Update the dropdown with saved items
        updateSavedItemsDropdown(savedItems);

        alert("Content saved!");
    } else {
        alert("Cannot save empty content.");
    }
}

function updateSavedItemsDropdown(savedItems) {
    var dropdownContent = document.getElementById("savedItemsDropdown");
    dropdownContent.innerHTML = "";

    savedItems.forEach(function (item, index) {
        var a = document.createElement("a");
        a.href = "javascript:void(0);";
        a.textContent = "Item " + (index + 1) + " - " + item.timestamp;
        a.onclick = function () {
            loadSavedItem(item.content);
        };

        dropdownContent.appendChild(a);
    });
}

function loadSavedItem(content) {
    document.getElementById("editor").value = content;
}
