import React, { useState, useRef } from 'react';
import './styles/style.css';

import iphone13 from './assets/iphone-13.jpg';
import iphone14 from './assets/iphone-14.jpg';
import iphone15 from './assets/iphone-15.jpg';
import iphone16 from './assets/iphone16.jpg';
import pelicula from './assets/pelicula.webp';
import peliculaCamera from './assets/pelicula-vidro.webp';
import capinha from './assets/capinha.jpg';
import carregador from './assets/carregador.webp';

const produtos = [
  { nome: 'Iphone 13', preco: 3329.41, imagem: iphone13 },
  { nome: 'Iphone 14', preco: 3733.99, imagem: iphone14 },
  { nome: 'Iphone 15', preco: 4271.62, imagem: iphone15 },
  { nome: 'Iphone 16', preco: 5129.10, imagem: iphone16 },
  { nome: 'Película de Vidro', preco: 59.99, imagem: pelicula },
  { nome: 'Película para Câmera', preco: 45.00, imagem: peliculaCamera },
  { nome: 'Capa de Silicone', preco: 39.99, imagem: capinha },
  { nome: 'Carregador', preco: 129.99, imagem: carregador }
];

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const containerRef = useRef(null);

  const abrirCarrinho = () => setCarrinhoAberto(true);
  const fecharCarrinho = () => setCarrinhoAberto(false);

  const addItem = (produto) => {
    setCarrinho(prev => {
      const index = prev.findIndex(item => item.nome === produto.nome);
      if (index !== -1) {
        return prev.map((item, i) =>
          i === index ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerItem = (nome) => {
    setCarrinho(prev => {
      return prev
        .map(item =>
          item.nome === nome ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter(item => item.quantidade > 0);
    });
  };

  const totalCompra = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const enviarPedido = () => {
    if (carrinho.length === 0) {
      alert('Carrinho vazio!');
      return;
    }

    let msg = 'Olá, gostaria de realizar a compra de:\n\n';
    carrinho.forEach(item => {
      msg += `- ${item.nome} - R$${(item.preco * item.quantidade).toFixed(2)} x ${item.quantidade}\n`;
    });
    msg += `\nTotal: R$${totalCompra.toFixed(2)}`;

    const numero = '+557996422951';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url);

    setCarrinho([]);
    fecharCarrinho();
  };

  return (
    <>
      <div
        ref={containerRef}
        style={{ filter: carrinhoAberto ? 'blur(5px)' : 'none' }}
      >
        <div className="menu-cabecalho">
          <h2>Minhas Compras</h2>
          <button onClick={abrirCarrinho}>
            Meu Carrinho (
            {carrinho.reduce((acc, item) => acc + item.quantidade, 0)})
          </button>
        </div>

        <section className="celulares">
          <div className="itens-shop">
            {produtos.slice(0, 4).map(produto => (
              <div className="item-shop" key={produto.nome}>
                <img src={produto.imagem} alt={produto.nome} />
                <h3>{produto.nome}</h3>
                <span>R$ {produto.preco.toFixed(2)}</span> <br />
                <button onClick={() => addItem(produto)}>
                  Adicionar ao carrinho
                </button>
              </div>
            ))}
          </div>
        </section>

        <br />

        <section className="acessorios">
          <div className="itens-shop">
            {produtos.slice(4).map(produto => (
              <div className="item-shop" key={produto.nome}>
                <img src={produto.imagem} alt={produto.nome} />
                <h3>{produto.nome}</h3>
                <span>R$ {produto.preco.toFixed(2)}</span> <br />
                <button onClick={() => addItem(produto)}>
                  Adicionar ao carrinho
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {carrinhoAberto && (
        <div className="carrinho">
          <h2>Carrinho de Compras</h2>

          <div id="itens-compra">
            {carrinho.length === 0 ? (
              <p className="item-compra">Não há itens no carrinho.</p>
            ) : (
              carrinho.map(item => (
                <p className="item-compra" key={item.nome}>
                  <span className="texto-item">
                    {item.nome} - R${(item.preco * item.quantidade).toFixed(2)} x{' '}
                    {item.quantidade}
                  </span>
                  <button
                    className="btn-remove-item"
                    onClick={() => removerItem(item.nome)}
                  >
                    Remover
                  </button>
                </p>
              ))
            )}
          </div>

          <h3>
            Total: R$<span>{totalCompra.toFixed(2)}</span>
          </h3>

          <div className="btns-carrinho">
            <button id="btn-enviar-pedido" onClick={enviarPedido}>
              Enviar
            </button>
            <button id="btn-fechar-carrinho" onClick={fecharCarrinho}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
