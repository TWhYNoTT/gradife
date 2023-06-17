const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent default form submission behavior

    // construct request body from form data
    const requestBody = {
        studentName: form.elements.studentName.value,
        activityName: form.elements.activityName.value,
        addressDuringStudy: form.elements.addressDuringStudy.value,
        addressDuringVacation: form.elements.addressDuringVacation.value,
        phoneNumber: form.elements.phoneNumber.value,
        level: form.elements.level.value,
        activities: []
    };


    // iterate over all checkbox inputs with the name "activities" and add their values to the request body
    form.querySelectorAll('input[name="activities[]"]:checked').forEach(activity => {
        requestBody.activities.push(activity.value);
    });

    // send request body to server using fetch API
    fetch('https://graduations.onrender.com/api/activity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(async response => {
            // handle server response
            const res = await response.json();
            if (response.ok) {
                window.location.href = `/activityCheck.html?id=${res.id}`;
            } else {
                alert('حدث خطأ أثناء تسجيل النشاط .');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('حدث خطأ أثناء تسجيل النشاط .');
        });
});