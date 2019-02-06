document.addEventListener('DOMContentLoaded', () => {
  console.log('ADD UR CODE HERE!')

 let userUrl = 'http://localhost:3000/api/v1/users/1'
 let noteUrl = 'http://localhost:3000/api/v1/notes'
 const noteList = document.querySelector("#note-list")
 const noteTitle = document.querySelector("#title")
 const noteBody = document.querySelector("#note-body")
 const noteUser = document.querySelector("#user")
 const noteForm = document.querySelector('#create-form')
 const bigTitle = document.querySelector('#big-title')

 getNotes()

 //retrieves data from the source
 //going to get a list

 function getNotes(){
   fetch(noteUrl) //fetch it
   .then(res => res.json()) // parse it
   .then(notes => {
     notes.forEach(note => { //retrieve each
       makeNote(note) //send each note into make note, to do do something with it
       bigTitle.dataset.id = note.user.id

     })
   })
 }

// where are are we going to put our data
// what and how do I want to put it in (image or li or element)
//1)create element
//2) add className for groups of elements
//3) dataset.id = whatever.id this makes it uniq and not random thus easier to select if necessary
// grap parent and apend created child to  it
// summary: creates item, gives id, appends to parent
 function makeNote(note) {
   let noteLi = document.createElement("li")
   noteLi.innerText = note.title
   noteLi.className= 'note-li'
   noteLi.dataset.id = note.id
   noteList.append(noteLi)

 //How to crete delete button
   let delBtn = document.createElement("button")
   delBtn.innerText = "delete"
   delBtn.className = "del-btn"
   delBtn.dataset.id = note.id
   noteLi.append(delBtn)
 }

 //*Delegation
 // creates listener on the for children and put a callback for response to click
 noteList.addEventListener('click', makeSelection)

//pass in an event = (e)
//conditional to match classname to target 'note-li
//to reach individual fetch from showpage /${e.target.dataset.id}
// connect information to given element placed in variable via querySelect (.innerText or .src)
function makeSelection(e){
  if(e.target.className === 'note-li') {
    fetch(noteUrl + `/${e.target.dataset.id}`)
    .then(res => res.json())
    .then(note => {
      noteTitle.innerText = note.title
      noteBody.innerText = note.body
      noteUser.innerText = note.user.name
    })
  }
}

// create or find form
// forms have submit not click
// Always use .preventDefault()
//e.target[] = fields, store in a variable
// POST and PATCH and DELETE require 2nd argument which object
//method: , headers:,
//remeber to find out what body is expecting (body, title, user_id)
 // stringfy to capture data
 // initial optimistic rndering
 // to do pessimistic take response and create aother promise and initial create function
 noteForm.addEventListener('submit', addnote)



  function addnote(e) {
      e.preventDefault()

    let noteName = (e.target[0].value)
    let noteContent = (e.target[1].value)
    fetch(noteUrl,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        body:noteContent ,
        title: noteName ,
        user_id: bigTitle.dataset.id,
      })

    }).then(res => res.json())
    .then(data =>{
      makeNote(data)
    })
 }

 noteList.addEventListener("click", deleteNote)

function deleteNote(e){
  console.log(e.target)
  if(e.target.className === "del-btn") {
    // console.log(e.target.dataset.id)
    //optimistic
    //e.target.parentNode.remove()
    fetch(noteUrl + `/${e.target.dataset.id}`, {
      method: 'DELETE',
    }).then(res => res.json())
    .then(data =>{
      e.target.parentNode.remove()
    })

  }

}




  })














// console.dir(e.target.parentNode)
// console.log(e.target.dataset.id)
