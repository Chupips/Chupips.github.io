// js/script.js

// Comentário: Adiciona um listener que espera o conteúdo da página carregar completamente.
// Isso garante que o formulário já existe quando o script tentar acessá-lo.
document.addEventListener('DOMContentLoaded', function() {

    // Comentário: Seleciona os elementos do formulário que serão manipulados.
    const contactForm = document.getElementById('contactForm');
    const feedbackDiv = document.getElementById('form-feedback');

    // Comentário: Verifica se estamos na página de contato antes de adicionar o listener.
    // Isso evita erros em outras páginas que não possuem o formulário.
    if (contactForm) {
        
        // Comentário: Adiciona um listener para o evento 'submit' do formulário.
        contactForm.addEventListener('submit', function(event) {
            // Previne o comportamento padrão do formulário (que é recarregar a página).
            event.preventDefault();

            // Comentário: Coleta os valores dos campos do formulário, removendo espaços em branco.
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            let errors = []; // Array para armazenar as mensagens de erro.

            // --- INÍCIO DA VALIDAÇÃO ---

            // 1. Verifica se todos os campos estão preenchidos.
            if (name === '' || email === '' || subject === '' || message === '') {
                errors.push('Todos os campos são obrigatórios.');
            }

            // 2. Verifica o formato do e-mail usando uma expressão regular (Regex).
            // Este padrão verifica se o texto tem o formato "texto@texto.texto".
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email !== '' && !emailPattern.test(email)) {
                errors.push('O formato do e-mail é inválido.');
            }

            // 3. Verifica se a mensagem tem no mínimo 20 caracteres.
            if (message.length > 0 && message.length < 20) {
                errors.push('A mensagem deve ter no mínimo 20 caracteres.');
            }

            // --- FIM DA VALIDAÇÃO ---


            // Comentário: Limpa qualquer feedback anterior.
            feedbackDiv.innerHTML = '';
            feedbackDiv.className = ''; // Remove classes de estilo anteriores.

            // Comentário: Exibe as mensagens de feedback.
            if (errors.length > 0) {
                // Se houver erros, exibe a mensagem de erro.
                feedbackDiv.classList.add('feedback-error');
                
                // Cria uma lista de erros para exibir.
                let errorList = '<ul>';
                errors.forEach(function(error) {
                    errorList += `<li>${error}</li>`;
                });
                errorList += '</ul>';
                feedbackDiv.innerHTML = errorList;

            } else {
                // Se não houver erros, exibe a mensagem de sucesso.
                feedbackDiv.classList.add('feedback-success');
                feedbackDiv.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
                
                // Limpa o formulário após o envio bem-sucedido.
                contactForm.reset();
            }
        });
    }
});