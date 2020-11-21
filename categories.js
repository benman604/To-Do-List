var categories = ['Homework', 'Test', 'Club', 'Birthday', 'Event']
var showCategories = "All"

var savedcategories = JSON.parse(localStorage.getItem("categories"))
if(savedcategories != null){
    categories = savedcategories
}

$('#show').on('change', function(e){
    showCategories = $('#show').val()
    reloadList()
})

function updateCategories(){

    var categoriesListOptions = []
    for(i of categories){
        var option = document.createElement('option')
        option.innerHTML = i
        option.value = i
        categoriesListOptions.push(option)
    }

    $('#category').empty()
    $('#show').empty()
    $('#category').append("<option value=\"Uncatagorized\">Uncatagorized</option>")
    $('#show').append("<option>All</option>")

    for(i of categoriesListOptions){
        const a = i.cloneNode(true)
        $('#category').append(i)
        $('#show').append(a)
    }
}

function editCategories(){
    $('#modalCategory').show()

    let str = ""
    for(i of categories){
        str += (i + "\n")
    }
    $('#categories').val(str)
}

function saveCategories(){
    var lines = $('#categories').val().split('\n')
    for (var j = 0; j < lines.length; j++) {
        if(lines[j] != ""){
            categories[j] = lines[j]
        }
    }
    updateCategories()
    localStorage.setItem("categories", JSON.stringify(categories))
}

updateCategories()