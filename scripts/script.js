let username = document.querySelector('#username');
let password = document.querySelector('#password');
let sequence = 0;

let addButton = document.querySelector('#add_button');;
let saveButton = document.querySelector('#save_button');

addButton.addEventListener('click', appendToTable);
saveButton.addEventListener('click', changeInTable);

editMode(false);

preAdd3Users();

function appendToTable(event) {
	event.preventDefault();

	if (username.value == '' || password.value == '') {
		alert('Пустое имя пользователя или пароль!');
		return;
	}

	sequence++;

	let td1 = document.createElement('td');
	td1.innerHTML = sequence;
	username.editId = sequence;

	let td2 = document.createElement('td');
	td2.innerHTML = username.value;
	
	let td3 = document.createElement('td');
	td3.innerHTML = password.value;

	let td4 = document.createElement('td');
	td4.appendChild( createChangeLink() );

	let td5 = document.createElement('td');
	td5.appendChild( createDeleteLink() );

	let tr = document.createElement('tr');
	tr.append(td1);
	tr.append(td2);
	tr.append(td3);
	tr.append(td4);
	tr.append(td5);

	let tbody = document.querySelector('#tbody');
	tbody.append(tr);

	clearInput();
}

function edit(event) {
	event.preventDefault();

	editMode(true);

	let changeLink = event.currentTarget;
	let changeTD = changeLink.parentNode;
	let changeTR = changeTD.parentNode;

	if (username.editId != undefined) {
		getRowById(username.editId).style.backgroundColor = '#ffffff';
	}

	username.editId = changeTR.cells[0].innerHTML;
	username.value = changeTR.cells[1].innerHTML;
	password.value = changeTR.cells[2].innerHTML;

	changeTR.style.backgroundColor = '#e5e5e5';
}

function changeInTable(event) {
	event.preventDefault();

	if (username.value == '' || password.value == '') {
		alert('Пустое имя пользователя или пароль!');
		return;
	}

	let editID = username.editId;
	getRowById(editID).cells[1].innerHTML = username.value;
	getRowById(editID).cells[2].innerHTML = password.value;

	getRowById(editID).style.backgroundColor = '';

	clearInput();

	editMode(false);
}

function deleteFromTable(event) {
	event.preventDefault();

	event.currentTarget.parentNode.parentNode.remove();

	clearInput();

	editMode(false);
}

function createChangeLink() {
	let changeLink = document.createElement('a');

	changeLink.href = '#';
	changeLink.innerHTML = 'Изменить';
	changeLink.addEventListener('click', edit);

	return changeLink;
}

function createDeleteLink() {
	let deleteLink = document.createElement('a');

	deleteLink.href = '#';
	deleteLink.innerHTML = 'Удалить';
	deleteLink.addEventListener('click', deleteFromTable);

	return deleteLink;
}

function editMode(isActive) {
	if (isActive) {
		saveButton.style.display = '';
		addButton.style.display = 'none';
	} else {
		addButton.style.display = '';
		saveButton.style.display = 'none';
	}
}

function getRowById(id) {
	let tbody = document.querySelector('#tbody');
	for (const row of tbody.children) {
		if (row.children[0].innerHTML == id) {
			return row;
		}
	}
}

function clearInput() {
	username.value = '';
	password.value = '';
}

function preAdd3Users() {
	username.value = 'Ivanov';
	password.value = 'pass1234';
	appendToTableDefault();

	username.value = 'Petrov';
	password.value = '1234password';
	appendToTableDefault();

	username.value = 'Sidorov';
	password.value = '88888888';
	appendToTableDefault();

	clearInput();

	function appendToTableDefault() {
		sequence++;
	
		let td1 = document.createElement('td');
		td1.innerHTML = sequence;
		username.editId = sequence;
	
		let td2 = document.createElement('td');
		td2.innerHTML = username.value;
	
		let td3 = document.createElement('td');
		td3.innerHTML = password.value;
	
		let td4 = document.createElement('td');
		td4.appendChild( createChangeLink() );
	
		let td5 = document.createElement('td');
		td5.appendChild( createDeleteLink() );
	
		let tr = document.createElement('tr');
		tr.append(td1);
		tr.append(td2);
		tr.append(td3);
		tr.append(td4);
		tr.append(td5);
	
		let tbody = document.querySelector('#tbody');
		tbody.append(tr);
	
		username.value = '';
		password.value = '';
	}
}