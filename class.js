var tasks = [] // array holding every task
const daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

class Task{ // class for each task
    constructor(title, description, category, due, done, pinned){
        this.title = title
        this.description = description
        this.category = category
        this.due = due
        this.done = done
        this.pinned = pinned

        if(this.due != undefined){
            this.dueDaysDiff = this.getDueDaysDiff()
        } else{
            this.dueDaysDiff = -Infinity
        }
    }

    getDueDaysDiff(){ // returns difference in days from due date
        var today = new Date()
        var due = new Date(this.due.dateobj) //this.due.month + "/" + this.due.day + "/" + this.due.year OR this.due.dateobj
        var msDiff = due - today
        return Math.ceil(msDiff / (1000 * 60 * 60 * 24))
    }

    getDueText(){ // returns easily readable string for when due
        var daysDiff

        try {
            daysDiff = this.getDueDaysDiff()
        } catch (error) {
            if(this.category != "Uncatagorized"){
                return this.category
            } else{
                return ""
            }
        }

        var result = " "

        if(daysDiff == 0){
            result =  "Today"
        } else if(daysDiff < 0){

            if(daysDiff == -1){
                result = "Yesterday"
            } else if(daysDiff > -7){
                result = Math.abs(daysDiff) + " days ago"
            } else{
                result = Math.round(Math.abs(daysDiff / 7)) + " weeks ago"
            }

        } else if(daysDiff > 0){

            if(daysDiff == 1){
                result = "Tommorow"
            } else if(daysDiff < 7){
                result = "In " + daysDiff + " days"
            } else{
                result = "In " + Math.round((daysDiff / 7)) + " weeks" 
            } 
        }

        var dayofweek = daysofweek[this.due.dayofweek]
        result += " (" + dayofweek + " " + this.due.month + "/" + this.due.day + "/" + this.due.year + ")"

        if(this.category != "Uncatagorized"){
            result += " " + this.category
        }
        return result
    }
}