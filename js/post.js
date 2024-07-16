document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const preco = document.getElementById('preco').value;
        const imagem = document.getElementById('imagem').value;
        const alt = "Capa do jogo " + document.getElementById('nome').value;

        const novoProduto = {
            name: nome,
            price: parseFloat(preco),
            image: imagem,
            alt: alt
        };

        // Faz a requisição POST para o servidor JSON local
        const response = await fetch('http://localhost:3000/produtos.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoProduto),
        });

        if (!response.ok) {
            console.error('Erro ao adicionar produto:', response.statusText);
            return;
        }

        console.log('Produto adicionado com sucesso!');
        // Aqui você pode fazer o que quiser após adicionar o produto
    });
});
