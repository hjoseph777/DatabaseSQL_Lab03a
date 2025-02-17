document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');

    document.querySelectorAll('.view-image-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const imgSrc = event.target.closest('.question-card').querySelector('.preview-image').src;
            modalContent.innerHTML = `<img src="${imgSrc}" class="w-full h-auto rounded-lg">`;
            modal.classList.remove('hidden');
        });
    });

    document.querySelectorAll('.view-sql-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const questionNumber = event.target.closest('.question-card').dataset.question;
            const sqlFilePath = `Question${questionNumber}_Lab03.txt`;
            modalContent.innerHTML = ''; // Clear previous content
            fetch(sqlFilePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Cannot fetch file: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => {
                    modalContent.innerHTML = `<pre><code class="sql">${data}</code></pre>`;
                    hljs.highlightAll();
                    modal.classList.remove('hidden');
                })
                .catch(error => {
                    modalContent.innerHTML = `<p class="text-red-600">Failed to fetch SQL file: ${error.message}</p>`;
                    modal.classList.remove('hidden');
                });
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
