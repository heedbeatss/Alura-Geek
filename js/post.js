document.addEventListener('DOMContentLoaded', () => {
    // Carregar produtos do localStorage ou do arquivo JSON
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Função para carregar os produtos do localStorage e do JSON
    async function fetchProducts() {
        try {
            // Se não houver produtos no localStorage, busca do arquivo JSON
            if (products.length === 0) {
                const response = await fetch('./produtos.json');
                if (!response.ok) {
                    throw new Error('Não foi possível carregar os produtos. Código de status: ' + response.status);
                }
                const data = await response.json();
                products = data.products;
                localStorage.setItem('products', JSON.stringify(products));
            }
            atualizarListaDeProdutos(products);
        } catch (error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    }

    // Atualiza a lista de produtos na página
    function atualizarListaDeProdutos(products) {
        const produtosContainer = document.querySelector('.main__left__produtos');
        produtosContainer.innerHTML = ''; // Limpar o container de produtos
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
    }

    // Chama o fetch para carregar produtos
    fetchProducts();
});
