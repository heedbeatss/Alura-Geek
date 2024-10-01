// Função fetch para buscar (get) produtos da lista API

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products'); // Caminho para a API REST
        if (!response.ok) {
            throw new Error('Não foi possível carregar os produtos. Código de status: ' + response.status);
        }
        const products = await response.json();  // A resposta já é um array de produtos

        // Manipulação do DOM

        const produtosContainer = document.querySelector('.main__left__produtos');
        if (!produtosContainer) {
            throw new Error('Elemento .main__left__produtos não encontrado no DOM.');
        }

        produtosContainer.innerHTML = ''; // Limpa o conteúdo atual

        // Exibir Produtos

        products.forEach(product => {
            const card = `
                <div class="card">
                    <img src="${product.image}" alt="${product.alt}">
                    <div class="card__container__info">
                        <p class="card__container__value">${product.name}</p>
                        <div class="card__container__svalue">
                            <p>R$ ${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            `;
            produtosContainer.insertAdjacentHTML('beforeend', card);
        });
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

// Chama a função para carregar os produtos ao carregar a página
document.addEventListener('DOMContentLoaded', fetchProducts);
