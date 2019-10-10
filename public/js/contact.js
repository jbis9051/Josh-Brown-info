const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');

document.querySelector('#validate_form_button').addEventListener("click", () => {
    document.querySelectorAll('.form-error').forEach(e => e.remove());
    let submit = true;
    if (!validateName(nameInput.value)) {
        nameInput.parentNode.insertBefore(createErrorNode('Please fill in a valid name'), nameInput);
        submit = false;
    }
    if (!validateEmail(emailInput.value)) {
        emailInput.parentNode.insertBefore(createErrorNode('Please fill in a email address'), emailInput);
        submit = false;
    }
    if (submit) {
        submitForm()
    }
});

function validateName(name) {
    const re = /^[a-zA-Z.&, ']*$/;
    return re.test(String(name)) && name.length > 0;
}

function validateEmail(email) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

function createErrorNode(msg) {
    const el = document.createElement("span");
    el.classList.add("form-error");
    el.innerText = msg;
    return el;
}

function submitForm() {
    document.querySelector('.contact_tab').setAttribute("submitted", "true");
    const data = new URLSearchParams(new FormData(document.querySelector('#contact_form')));
    fetch('/submit-contact', {
        method: 'POST',
        body: data
    }).then(res => res.json()).then(json => {
        if (json.status !== "success") {
            alert(`Error(s): ${json.errors.join(", ")}`);
        }
    }).catch(e => {
        console.error(e);
        alert("An unknown error occurred with your form submission. Please try again.")
    });
}
