const onClickAdd = () => {
	const inputText = document.getElementById("add-text").value;
	if (inputText) {
		document.getElementById("add-text").value = "";
		incompleteTodo(inputText);
	}
}

const completeTodo = (doneBtn) => {
	const doneButton = doneBtn;
	doneButton.innerText = "Done";
	doneButton.addEventListener("click", () => {
		const moveTarget = doneButton.closest("li");
		doneButton.nextElementSibling.remove();
		doneButton.remove();

		const restoreButton = document.createElement("button");
		restoreButton.innerText = "Restore";
		restoreButton.addEventListener("click", () => {
			const todoText = restoreButton.previousElementSibling.innerText;
			incompleteTodo(todoText);
			restoreButton.closest("li").remove();
		});

		const deleteButton = document.createElement("button");
		deleteTodo(deleteButton, "complete-list");

		moveTarget.firstElementChild.appendChild(restoreButton);
		moveTarget.firstElementChild.appendChild(deleteButton);

		document.getElementById("complete-list").appendChild(moveTarget);
	});
	return doneButton;
}

const deleteTodo = (delBtn, listName) => {
	const deleteButton = delBtn;
	deleteButton.innerText = "Delete";
	deleteButton.addEventListener("click", () => {
		const deleteTarget = deleteButton.closest("li");
		document.getElementById(listName).removeChild(deleteTarget);
	});
}

const incompleteTodo = (newTodo) => {
	const li = document.createElement("li");

	const div = document.createElement("div");
	div.className = "list-row";

	const inputText = newTodo;

	const p = document.createElement("p");
	p.className = "todo-item";
	p.innerText = inputText;

	const doneButton = document.createElement("button");
	const deleteButton = document.createElement("button");

	completeTodo(doneButton);
	deleteTodo(deleteButton, "incomplete-list");

	div.appendChild(p);
	div.appendChild(doneButton);
	div.appendChild(deleteButton);
	li.appendChild(div);
	document.getElementById("incomplete-list").appendChild(li);
}

document.body.addEventListener('keydown', (e) => {
	const inputText = document.getElementById("add-text").value;
	if(e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
		if (inputText) {
			document.getElementById("add-btn").click();
		}
	}
});

document.getElementById("add-btn").addEventListener("click", onClickAdd);
