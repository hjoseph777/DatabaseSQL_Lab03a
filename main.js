document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');

    // Handle image button clicks
    document.querySelectorAll('.view-image-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const questionCard = btn.closest('.question-card');
            const questionNum = questionCard.dataset.question;
            const imgPath = `/Question${questionNum}_lab03.png`;
            
            modalContent.innerHTML = `
                <div class="content-wrapper relative bg-white p-4 rounded-lg">
                    <button class="close-btn absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl">&times;</button>
                    <img src="${imgPath}" alt="Question ${questionNum}" class="w-full">
                </div>
            `;
            modal.classList.remove('hidden');
        });
    });

    // Handle SQL button clicks
    document.querySelectorAll('.view-sql-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const questionCard = btn.closest('.question-card');
            const questionNum = questionCard.dataset.question;
            const sqlFilePath = `/Question${questionNum}_Lab03.txt`;

            try {
                const response = await fetch(sqlFilePath);
                const sqlCode = await response.text();
                modalContent.innerHTML = `
                    <div class="content-wrapper relative bg-white p-4 rounded-lg">
                        <button class="close-btn absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl">&times;</button>
                        <h3 class="text-xl mb-4">SQL Query - Question ${questionNum}</h3>
                        <pre><code class="language-sql">${sqlCode}</code></pre>
                    </div>
                `;
                hljs.highlightAll();
                modal.classList.remove('hidden');
            } catch (error) {
                console.error('Error:', error);
                modalContent.innerHTML = `
                    <div class="content-wrapper relative bg-white p-4 rounded-lg">
                        <button class="close-btn absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl">&times;</button>
                        <div class="text-red-600">Error displaying SQL: ${error.message}</div>
                    </div>
                `;
                modal.classList.remove('hidden');
            }
        });
    });

    // Add event delegation for close buttons
    modalContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-btn')) {
            modal.classList.add('hidden');
        }
    });

    // Close modal handlers
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // Keyboard escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.classList.add('hidden');
    });
});
