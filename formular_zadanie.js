document.addEventListener("DOMContentLoaded", () => {
    // 3.d. Отримання елементів за допомогою document.getElementById()
    const form = document.getElementById("registrationForm");
    
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const phoneInput = document.getElementById("phoneInput");
    const birthdateInput = document.getElementById("birthdateInput");
    const courseSelect = document.getElementById("courseSelect");
    const noteInput = document.getElementById("noteInput");

    // Елементи живого перегляду
    const previewName = document.getElementById("previewName");
    const previewEmail = document.getElementById("previewEmail");
    const previewPhone = document.getElementById("previewPhone");
    const previewBirthdate = document.getElementById("previewBirthdate");
    const previewCourse = document.getElementById("previewCourse");
    const previewLevel = document.getElementById("previewLevel");
    const previewNote = document.getElementById("previewNote");

    // Отримання радіокнопок рівня
    const levelRadios = document.querySelectorAll('input[name="level"]');

    // 3.c, 3.e. Функція оновлення живого нагляду на основі введення та подій input/change
    function updatePreview() {
        previewName.textContent = nameInput.value ? nameInput.value : "-";
        previewEmail.textContent = emailInput.value ? emailInput.value : "-";
        previewPhone.textContent = phoneInput.value ? phoneInput.value : "-";
        previewBirthdate.textContent = birthdateInput.value ? birthdateInput.value : "-";
        previewCourse.textContent = courseSelect.value;
        
        // Знаходимо вибраний радіобатон рівня
        let selectedLevel = "Beginner";
        levelRadios.forEach(radio => {
            if (radio.checked) {
                selectedLevel = radio.value;
            }
        });
        previewLevel.textContent = selectedLevel;

        previewNote.textContent = noteInput.value ? noteInput.value : "-";
    }

    // Прив'язка слухачів подій input та change для текстових полів і випадаючих списків
    nameInput.addEventListener("input", updatePreview);
    emailInput.addEventListener("input", updatePreview);
    phoneInput.addEventListener("input", updatePreview);
    birthdateInput.addEventListener("input", updatePreview);
    courseSelect.addEventListener("change", updatePreview);
    noteInput.addEventListener("input", updatePreview);

    // Прив'язка події change до радіокнопок вибору рівня
    levelRadios.forEach(radio => {
        radio.addEventListener("change", updatePreview);
    });

    // 4. Симуляція відправки форми через JavaScript
    form.addEventListener("submit", (event) => {
        // 4.b. Запобігання реальному відправленню та оновленню сторінки
        event.preventDefault();

        // 4.c. Приховування всього формуляра
        form.style.display = "none";

        // 4.d. Виведення повідомлення про успішне відправлення
        alert("Formulár bol úspešne odoslaný.");
    });
});