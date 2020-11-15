$(function(){

    // if any, get and display saved tasks
    var savedtasks = JSON.parse(localStorage.getItem("tasks"))
    if(savedtasks != null){
        for(var i=0; i < savedtasks.length; i++){
            var newtask = new Task(savedtasks[i].title, savedtasks[i].description, savedtasks[i].category, savedtasks[i].due, savedtasks[i].done, savedtasks[i].pinned)
            tasks.push(newtask)
            //showTask(i)
        }

        $('#example').hide()

        tasks = reorder()
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

    $("#create").submit(function(e) { // on task create form submit
        e.preventDefault()

        if($('#datepicker').val() == ""){
            duedate = undefined
        }

        if($('#name').val() != "" || $('#desc').val() != ""){
            var newtask = new Task($("#name").val(), $("#desc").val(), $("#category").val(), duedate) // create task
            tasks.push(newtask) 

            // clear input and example
            $('#name').val("")
            $('#desc').val("")
            $('#datepicker').val("")
            $('#example').hide()

            showTask(tasks.length - 1) // display newly created task
            localStorage.setItem("tasks", JSON.stringify(tasks))
        }
    })

    $('.x1').click(function(e){  // toggle task done/checked
        var id = (e.currentTarget.id.charAt(e.currentTarget.id.length - 1))
        tasks[id].done = !tasks[id].done
        if(tasks[id].done && tasks[id].pinned){
            tasks[id].pinned = false
        }
        setcolor(id)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    })

    $('.x2').click(function(e){ // toggle task pinned
        var id = (e.currentTarget.id.charAt(e.currentTarget.id.length - 1))
        tasks[id].pinned = !tasks[id].pinned
        if(tasks[id].done && tasks[id].pinned){
            tasks[id].done = false
        }
        setcolor(id)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    })

    function reorder(){
        var pinnedTasksPos = []
        var pinnedTasksNeg = []
        var regularTasksPos = []
        var regularTasksNeg = []
        var finishedTasksPos = []
        var finishedTasksNeg = []
        
        for (e=0; e<tasks.length; e++){
            let i = tasks[e]
            console.log(i)
            if(i.pinned){
                if(i.dueDaysDiff >= 0) {
                    pinnedTasksPos.push(i)
                } else{
                    pinnedTasksNeg.push(i)
                }
            } else if(i.done){
                if(i.dueDaysDiff >= 0) {
                    finishedTasksPos.push(i)
                } else{
                    finishedTasksNeg.push(i)
                }
            } else{
                if(i.dueDaysDiff >= 0) {
                    regularTasksPos.push(i)
                } else{
                    regularTasksNeg.push(i)
                }
            }
        }
    
        pinnedTasksPos.sort(compare)
        pinnedTasksNeg.sort(compare).reverse()
        regularTasksPos.sort(compare)
        regularTasksNeg.sort(compare).reverse()
        finishedTasksPos.sort(compare)
        finishedTasksNeg.sort(compare).reverse()
    
        var newarr = [...pinnedTasksPos, ...pinnedTasksNeg, ...regularTasksPos, ...regularTasksNeg, ...finishedTasksPos, ...finishedTasksNeg]
        return(newarr.reverse())
    }

    function compare(a, b){
        if(a.dueDaysDiff < b.dueDaysDiff){
            return -1
        }
        if(a.dueDaysDiff > b.dueDaysDiff){
            return 1
        }
        return 0
    }
})