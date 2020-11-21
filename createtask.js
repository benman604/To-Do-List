$(function(){

    // if any, get and display saved tasks
    var savedtasks = JSON.parse(localStorage.getItem("tasks"))
    if(savedtasks != null){
        for(var i=0; i < savedtasks.length; i++){
            var newtask = new Task(savedtasks[i].title, savedtasks[i].description, savedtasks[i].category, savedtasks[i].due, savedtasks[i].done, savedtasks[i].pinned)
            newtask.createdate = savedtasks[i].createdate
            tasks.push(newtask)
        }

        $('#example').hide()

        tasks = reorder2()
        for(var i=0; i < tasks.length; i++){
            showTask(i)
        }
    }

    var duedate

    $("#datepicker").datepicker({ // due date input
        dateFormat: 'yy-m-d',
        inline: true,

        onSelect: function(dateText, inst) { // update duedate on change
            var date = $(this).datepicker('getDate')
            
            duedate = {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                dayofweek: date.getUTCDay(),
                dateobj: date
            }
        }
    })

    $('#sortby').on('change', function(e){ // on sorting method change
        reloadList()
    })

    $("#create").submit(function(e) { // on task create form submit
        e.preventDefault()

        if($('#datepicker').val() == ""){
            duedate = undefined
        }

        if($('#name').val() != "" || $('#desc').val() != ""){
            var newtask = new Task($("#name").val(), $("#desc").val(), $("#category").val(), duedate) // create task
            newtask.setCreateDate()
            tasks.push(newtask) 

            // clear input and example
            $('#name').val("")
            $('#desc').val("")
            $('#datepicker').val("")
            $('#example').hide()

            showTask(tasks.length - 1) // display newly created task
            localStorage.setItem("tasks", JSON.stringify(tasks))
            reloadList()
        }
    })
})