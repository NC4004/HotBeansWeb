let obj = {};
let textarea;

const contactForm = document.getElementById("contact-us-form");

contactForm &&
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    for (const pair of formData.entries()) {
      if (pair[0] === "textarea") {
        textarea = pair[1];
      }
      obj = {
        ...obj,
        firstName: document.getElementById("firstName").value,
		surname: document.getElementById("surname").value,
		homeAddress: document.getElementById("homeAddress").value,
		tel: document.getElementById("tel").value, 
        email: document.getElementById("email").value,
      };
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var my_awesome_script = document.createElement("script");

    my_awesome_script.setAttribute("src", "https://cdn.jsdelivr.net/npm/sweetalert2@11");

    document.head.appendChild(my_awesome_script);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(obj),
      redirect: "follow",
    };

    let emailText = document.getElementById("email").value;
    let pattern =
      /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;
    let result = pattern.test(emailText);

    if (result) {
      fetch("https://681b16f417018fe50579ea59.mockapi.io/api/v1/Form", requestOptions)
        .then((response) => response.text())
        .then(() =>
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your form has been submitted",
            showConfirmButton: false,
            timer: 1500,
          })
        )
        .then(() => window.location.reload());
    }
  });// JavaScript Document