document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');

    // Função para enviar dados do formulário para a API
    async function enviarProduto(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const nome = document.getElementById('nome').value;
        const preco = parseFloat(document.getElementById('preco').value);
        const imagemURL = document.getElementById('imagem-url').value; // O URL da imagem que foi inserido

        // Verifica se a URL da imagem não está vazia
        if (!imagemURL) {
            console.error('URL da imagem não fornecida.');
            return;
        }

        // Obtém o último produto para gerar um novo ID
        let novoId = 1; // Valor padrão para o novo ID

        try {
            const response = await fetch('http://localhost:3000/products');
            if (!response.ok) {
                throw new Error('Não foi possível obter os produtos. Código de status: ' + response.status);
            }

            const produtos = await response.json();
            if (produtos.length > 0) {
                const ultimoProduto = produtos[produtos.length - 1];
                novoId = Number(ultimoProduto.id) + 1; // Converte para número e incrementa
            }
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
        }

        const produto = {
            id: novoId, // Adiciona o novo ID
            name: nome,
            price: preco,
            image: imagemURL, // Usa a URL da imagem
            alt: `Capa do produto ${nome}`
        };

        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto),
            });

            if (!response.ok) {
                throw new Error('Não foi possível adicionar o produto. Código de status: ' + response.status);
            }

            // Atualiza a lista de produtos
            fetchProducts(); 

            // Limpa o formulário
            form.reset();
        } catch (error) {
            console.error('Erro ao enviar o produto:', error);
        }
    }

    // Adiciona o evento de envio ao formulário
    form.addEventListener('submit', enviarProduto);
});
