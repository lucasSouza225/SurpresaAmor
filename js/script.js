// =============================================
        // CONFIGURAÇÃO DA TELA DE INÍCIO
        // =============================================
        const telaInicio = document.getElementById('telaInicio');
        const btnIniciar = document.getElementById('btnIniciar');
        const conteudoPrincipal = document.getElementById('conteudoPrincipal');
        const floresInicio = document.getElementById('floresInicio');

        // Criar flores decorativas na tela de início
        function criarFlores() {
            const flores = ['✿', '❀', '🌸', '💮', '🏵️'];
            const numFlores = 15;
            
            for (let i = 0; i < numFlores; i++) {
                const flor = document.createElement('div');
                flor.className = 'flor-inicio';
                flor.textContent = flores[Math.floor(Math.random() * flores.length)];
                flor.style.left = `${Math.random() * 100}%`;
                flor.style.top = `${Math.random() * 100}%`;
                flor.style.fontSize = `${Math.random() * 1 + 1}rem`;
                flor.style.animation = `flutuar ${Math.random() * 5 + 3}s infinite ease-in-out`;
                flor.style.animationDelay = `${Math.random() * 2}s`;
                floresInicio.appendChild(flor);
            }
        }

        // Iniciar a experiência
        btnIniciar.addEventListener('click', function() {
            // Adicionar efeito de fade out na tela de início
            telaInicio.classList.add('fade-out');
            
            // Mostrar o conteúdo principal após um breve delay
            setTimeout(function() {
                conteudoPrincipal.classList.add('mostrar');
                // Iniciar a música automaticamente (opcional)
                // tocarMusica();
            }, 1000);
            
            // Remover a tela de início do DOM após a transição
            setTimeout(function() {
                telaInicio.style.display = 'none';
            }, 2000);
        });

        // =============================================
        // CONFIGURAÇÃO DO CARROSSEL
        // =============================================
        const carrossel = document.getElementById('carrossel');
        const btnAnterior = document.getElementById('btn-anterior');
        const btnProximo = document.getElementById('btn-proximo');
        const indicadores = document.getElementById('indicadores');
        
        // URLs das imagens (substitua pelas suas próprias fotos)
        const imagens = [
            {
                url: 'img/5.jpg',
                legenda: 'Momentos de cumplicidade'
            },
            {
                url: 'img/2.jpg',
                legenda: 'Nossa primeira aventura juntos'
            },
            {
                url: 'img/3.jpg',
                legenda: 'Para sempre e mais um pouco'
            },
            {
                url: 'img/4.jpg',
                legenda: 'Seu sorriso ilumina meu mundo'
            }
        ];
        
        let indiceAtual = 0;
        
        // Adiciona as imagens ao carrossel
        function inicializarCarrossel() {
            carrossel.innerHTML = '';
            indicadores.innerHTML = '';
            
            imagens.forEach((imagem, index) => {
                // Item do carrossel
                const item = document.createElement('div');
                item.className = 'carrossel-item';
                
                const img = document.createElement('img');
                img.src = imagem.url;
                img.alt = `Foto ${index + 1}`;
                
                const legenda = document.createElement('div');
                legenda.className = 'carrossel-legenda';
                legenda.textContent = imagem.legenda;
                
                item.appendChild(img);
                item.appendChild(legenda);
                carrossel.appendChild(item);
                
                // Indicador
                const indicador = document.createElement('div');
                indicador.className = 'indicador';
                if (index === 0) indicador.classList.add('ativo');
                indicador.addEventListener('click', () => {
                    indiceAtual = index;
                    atualizarCarrossel();
                });
                indicadores.appendChild(indicador);
            });
            
            atualizarCarrossel();
        }
        
        function atualizarCarrossel() {
            carrossel.style.transform = `translateX(-${indiceAtual * 100}%)`;
            
            // Atualiza indicadores
            document.querySelectorAll('.indicador').forEach((indicador, index) => {
                if (index === indiceAtual) {
                    indicador.classList.add('ativo');
                } else {
                    indicador.classList.remove('ativo');
                }
            });
        }
        
        function proximoSlide() {
            indiceAtual = (indiceAtual + 1) % imagens.length;
            atualizarCarrossel();
        }
        
        function slideAnterior() {
            indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
            atualizarCarrossel();
        }
        
        // =============================================
        // CONFIGURAÇÃO DO PLAYER DE MÚSICA
        // =============================================
        const audio = document.getElementById('musica-romantica');
        const btnPlay = document.getElementById('btn-play');
        const btnAnteriorMusica = document.getElementById('btn-anterior-musica');
        const btnProximaMusica = document.getElementById('btn-proxima-musica');
        const tituloMusica = document.getElementById('titulo-musica');
        const statusMusica = document.getElementById('status-musica');
        const progresso = document.getElementById('progresso');
        
        // =============================================
        // AQUI VOCÊ VAI COLOCAR SUAS PRÓPRIAS MÚSICAS!
        // =============================================
        const musicasRomanticas = [
            {
                titulo: "Uma musica para você",
                src: "audio/musicaDG.mp4"
            }
        ];
        // =============================================
        
        let indiceMusicaAtual = 0;
        let estaTocando = false;
        
        function carregarMusica(indice) {
            const musica = musicasRomanticas[indice];
            audio.src = musica.src;
            tituloMusica.textContent = musica.titulo;
            statusMusica.textContent = 'Pronta para tocar';
        }
        
        function tocarMusica() {
            audio.play().then(() => {
                estaTocando = true;
                btnPlay.innerHTML = '<i class="fas fa-pause"></i>';
                statusMusica.textContent = 'Tocando agora';
            }).catch(error => {
                console.log("Erro ao reproduzir música:", error);
                statusMusica.textContent = 'Erro ao reproduzir. Clique novamente.';
            });
        }
        
        function pausarMusica() {
            audio.pause();
            estaTocando = false;
            btnPlay.innerHTML = '<i class="fas fa-play"></i>';
            statusMusica.textContent = 'Pausada';
        }
        
        function proximaMusica() {
            indiceMusicaAtual = (indiceMusicaAtual + 1) % musicasRomanticas.length;
            carregarMusica(indiceMusicaAtual);
            if (estaTocando) tocarMusica();
        }
        
        function musicaAnterior() {
            indiceMusicaAtual = (indiceMusicaAtual - 1 + musicasRomanticas.length) % musicasRomanticas.length;
            carregarMusica(indiceMusicaAtual);
            if (estaTocando) tocarMusica();
        }
        
        function atualizarProgresso() {
            if (audio.duration) {
                const percentual = (audio.currentTime / audio.duration) * 100;
                progresso.style.width = `${percentual}%`;
            }
        }
        
        // =============================================
        // EVENT LISTENERS E INICIALIZAÇÃO
        // =============================================
        
        // Event listeners do carrossel
        btnAnterior.addEventListener('click', slideAnterior);
        btnProximo.addEventListener('click', proximoSlide);
        
        // Event listeners do player de música
        btnPlay.addEventListener('click', () => {
            if (estaTocando) {
                pausarMusica();
            } else {
                tocarMusica();
            }
        });
        
        btnAnteriorMusica.addEventListener('click', musicaAnterior);
        btnProximaMusica.addEventListener('click', proximaMusica);
        
        audio.addEventListener('timeupdate', atualizarProgresso);
        audio.addEventListener('ended', proximaMusica);
        
        // Inicialização
        criarFlores();
        inicializarCarrossel();
        carregarMusica(indiceMusicaAtual);
        
        // Alternar automaticamente as imagens do carrossel a cada 5 segundos
        setInterval(proximoSlide, 8000);
        
        // Efeito de digitação para a mensagem (opcional)
        const mensagemDestaque = document.querySelector('.mensagem-destaque');
        const textoOriginal = mensagemDestaque.textContent;
        mensagemDestaque.textContent = '';
        
        let i = 0;
        function digitarEfeito() {
            if (i < textoOriginal.length) {
                mensagemDestaque.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(digitarEfeito, 50);
            }
        }
        
        // Inicia o efeito de digitação após um breve delay
        setTimeout(digitarEfeito, 1000);