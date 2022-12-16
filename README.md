<hr></hr>
<h1 style="margin: 0 auto; display: flex; justify-content: center;"> Projeto final M6 </h1>


<h2 style="color:green"> Como configurar o ambiente:</h2>

<h2 style="margin: 2vh 4vw 0 0" id="dotenv">1) Variaveis de ambiente dotenv:</h2>
<h3 style="margin: 1vh 4vw 0">1.1) Renomear o arquivo:</h3>
<p style="margin: 0 6vw 2vh 6vw">Renomeie o arquivo <code>.env.exemple</code> para <code>.env</code></p>
<h3 style="margin: 1vh 4vw 0">1.2) Configure as variveis do ORM:</h3>
<p style="margin: 1vh 6vw"><code>DATABASE_URL="postgresql://USUARIO:SENHA@localhost:PORTA/DATABASE?schema=public"`</code></p>

<p style="margin: 0 6vw">USUARIO: Usuário de acesso ao postgres;</p>
<p style="margin: 0 6vw">SENHA: Senha de acesso;</p>
<p style="margin: 0 6vw">PORTA: Porta de acesso do postgres (padrão 5432);</p>
<p style="margin: 0 6vw 2vw 6vw">DATABASE: Nome do Data Base criado.</p>

<h3 style="margin: 1vh 4vw 0">1.3) Configure a chave secreta para jsonwebtoken:</h3> 
<p style="margin: 0 6vw"><code>SECRET_KEY=</code></p>
<p style="margin: 0 6vw 2vw 6vw">Chave secreta do jsonwebtoken, deve estar em aspas.</p>

<h3 style="margin: 1vh 4vw 0">1.4) Configure a chave secreta para usuário:</h3> 
<p style="margin: 0 6vw"><code>ADM_SECRET_KEY=</code></p>

<p style="margin: 0 6vw">Chave secreta para criar usuário com poderes administrativos.Ao ser criada deve ser enviada na requisição do front.</p>

<h2 style="margin: 2vh 4vw 0 0" id="init">2) Iniciando o projeto: </h2>
    
<h3 style="margin: 1vh 4vw 0">1.2) Instalar bibliotecas:</h3>
<p style="margin: 0 6vw">Yarn: <code>yarn init -y</code></p>
<p style="margin: 0 6vw">npm: <code>npm init</code></p>
    
<h3 style="margin: 1vh 4vw 0">2.2) Criar Data Base:</h3>
<p style="margin: 0 6vw"><code>yarn db</code></p>
<p style="margin: 0 6vw"><code>npm db</code></p>

<h2 style="margin: 2vh 4vw 0 0" id="init">3) Docker: </h2>
<h3 style="margin: 1vh 4vw 0">3.1) Arquivo .yml:</h3>
<p style="margin: 0 6vw">no arquivo <code>docker-compose.yml</code> temos que alterar as chaves:</p>
<p style="margin: 0 6vw"><code>container_name</code> para o nome do data base, linhas 5 e 15</p>
<p style="margin: 0 6vw"><code>POSTGRES_USER</code> para seu usuário do postgres</p>
<p style="margin: 0 6vw"><code>POSTGRES_PASSWORD</code> para sua senha do postgres</p>
<p style="margin: 0 6vw"><code>POSTGRES_DB</code> para o nome do data base criado</p>

<h3 style="margin: 1vh 4vw 0">3.2) Criando o container:</h3>
<p style="margin: 0 6vw">Rodar os seguintes comandos:</p>
<p style="margin: 0 6vw 2vh">1) <code>docker run --name express_node -p 3333:3333 -d motorshop/node:latest</code></p>
<p style="margin: 0 6vw 2vh">2) <code>docker build -t motorshop/node:latest .</code></p>
<p style="margin: 0 6vw">3) <code>docker-compose up</code></p>
<p style="margin: 0 6vw">Caso queira parar o container:</p>
<p style="margin: 0 6vw"><code>docker-compose down</code></p>

<h2 style="margin: 2vh 4vw 0 0" id="init">4) Inicializando o servidor:</h2>
<p style="margin: 0 6vw">Rodar o comando:</p>
<p style="margin: 0 6vw">3) <code>yarn dev</code> ou <code>npm dev</code></p>