async function loadBooks (){
    let response = await fetch("http://localhost:3000/books");

    console.log(response.status);
    console.log(response.statusText);

    if (response.status === 200){
        let data = await response.text();
        console.log(data);
        const books = JSON.parse(data);

        const{
            title,
            author,
            publisher,
            publish_date,
            numOfPages,
        } = books;

        document.getElementById('isbn').value = isbn;
        document.getElementById('title').value = title;
        document.getElementById('author').value = author;
        document.getElementById('publisher').value = publisher;
        document.getElementById('publish_date').value = publish_date;
        document.getElementById('numOfPages').value = numOfPages;

        document.getElementById('editForm').action = 'http://localhost:3000/book/${isbn}';


        for (let book of books){
            const x = `
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                            <div>Author: ${book.author}</div>
                            <div>Publisher: ${book.publisher}</div>
                            <div>Number of Pages: ${book.numOfPages}</div>

                            <hr>

                            <button type="button" class="btn btn-danger">Delete</button>
                            <button types="button" class="btn btn-primary" data-toggle="modal"
                                data-target="#editBookModal" onclick="setEditModal(${book.isbn})">
                                Edit
                            </button>
                            <script>
                                const deleteButton = document.getElementById('deleteButton');
                                deleteButton.addEventListener('click', deleteBook);
                                function deleteBook(){
                                    const isbn = ${book.isbn};
                                    const deleteRequest = new XMLHttpRequest();
                                    deleteRequest.open('DELETE', '/books/' + isbn);
                                    deleteRequest.onreadystatechange = function () {
                                        if (deleteRequest.readyState === 4 && deleteRequest.status === 200) {
                                            // Book deleted successfully, you can update the UI as needed
                                            console.log('Book deleted');
                                        } else {
                                            console.log('Error deleting book');
                                        }
                                    };
                                    deleteRequest.send();
                                }
                            </script>
                        </div>
                    </div>
                </div>
            `

            document.getElementById("books").innerHTML = document.getElementById("books").innerHTML + x;
        }

        const deleteButtons = document.getElementsByClassName("delete-button");
        for (let deleteButton of deleteButtons) {
            deleteButton.addEventListener("click", deleteBook);
        }
    }
}

async function deleteBook() {
    const isbn = this.dataset.isbn;

    try {
        const response = await fetch(`http://localhost:3000/book/${isbn}`, {
            method: "DELETE"
        });

        if (response.status === 200) {
            console.log("Book deleted");
            // Refresh the book list
            loadBooks();
        } else {
            console.log("Error deleting book");
        }
    } catch (error) {
        console.log("Error deleting book:", error);
    }
}


loadBooks();