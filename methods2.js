let refTable = document.createElement("table");

function showRecord(name, price, publish_Date) {

   
        
    let refRow = document.createElement("tr")
        
     let refTd1 = document.createElement("td")
    let  refTd2 = document.createElement("td")
     let refTd3 = document.createElement("td")

    refTd1.innerHTML = name
    refTd2.innerHTML = price
    refTd3.innerHTML = publish_Date


    refRow.appendChild(refTd1);
    refRow.appendChild(refTd2);
    refRow.appendChild(refTd3);

    refTable.appendChild(refRow)
    document.body.appendChild(refTable)
}


function getAll() {
    fetch('http://localhost:8080/getAll')
        .then((response) => {
            if (response.status !== 200) {
                console.log(`getAll does not work.Status Code: ${response.status}`);
                return;
            }
            response.json()
                .then(res => {
                    console.log(res);
                    refTable.innerHTML=""
                    
                    refTable.classList.add("table", "table-primary");
                    let refRow = document.createElement("tr")
                    let refTd1 = document.createElement("td")
                    let refTd2 = document.createElement("td")
                    let refTd3 = document.createElement("td")
                    
            
                    refTd1.innerHTML="Book"
                    refTd2.innerHTML="Price"
                    refTd3.innerHTML="Publish year"
                   
                    
                    refRow.appendChild(refTd1)
                    refRow.appendChild(refTd2)
                    refRow.appendChild(refTd3)
                 
                    
                    refTable.appendChild(refRow)
                    for (let i = 0; i < res.length; i++) {
                        showRecord(res[i].name, res[i].price, res[i].publish_date)
                    }
                })
                .catch(err => console.error(`Fetch Error :-S ${err}`));
        }
        )
}

function get() {
    let Book_id = document.getElementById("BookID").value
    fetch('http://localhost:8080/get/'+Book_id)
        .then((response) => {
            if (response.status !== 200) {
                console.log(`get does not work.Status Code: ${response.status}`);
                return;
            }
            response.json()
                .then(data => {
                    console.log(data);

                    refTable = document.createElement("table");
                    refTable.border = 1
                    refTable.classList.add("table");
                    showRecord(data.name, data.price, data.publish_date)

                })
                .catch(err => console.error(`Fetch Error :-S ${err}`));

        })
}


function create(){

    fetch("http://localhost:8080/create", {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
                "name": Bookname.value,
                "price": Price.value,
                "publish_date": PublishDate.value
            }
        )
        
    })
    .then(res => res.json())
    .then((data) => console.log(`Request successful with JSON response ${data}`))
    .catch((error) => console.log(`Request failed ${error}`))
//});

}


function update(){


      fetch("http://localhost:8080/replace/", {
        method: 'put',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {

                "book_id": BookIDU.value,
                "name": BookNameU.value,
                "price": PriceU.value,
                "publish_date": PublishDateU.value
            }
        )
        
    })
    .then(res => res.json())
    .then((data) => console.log(`Request successful with JSON response ${data}`))
    .catch((error) => console.log(`Request failed ${error}`))

}


function deleteOpt(){

    let Book_id = document.getElementById("BookID").value
    fetch("http://localhost:8080/remove/"+Book_id, {
      method: 'delete',
      headers: {
          "Content-type": "application/json"
      }}
      )

  .then((data) => getAll())
  .catch((error) => console.log(`Request failed ${error}`))

}

function deleteByBookName(){

    let BookName = document.getElementById("BookName").value
    fetch("http://localhost:8080/remove/"+BookName, {
      method: 'delete',
      headers: {
          "Content-type": "application/json"
      }}
      )

  .then((data) => getAll())
  .catch((error) => console.log(`Request failed ${error}`))

}
