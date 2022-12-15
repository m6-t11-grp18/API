<hr></hr>
<h1 style="margin: 0 auto; display: flex; justify-content: center;"> Projeto final M6 </h1>


<h2 style="color:green"> Como configurar o ambiente:</h2>

<h2 style="margin: 2vh 4vw 0 0" id="dotenv">1) Variaveis de ambiente dotenv:</h2>
<h3 style="margin: 1vh 4vw 0">1.1) Renomear o arquivo:</h3>
<p style="margin: 0 6vw 2vh 6vw">Renomeie o arquivo <code>.env.exemple</code> para <code>.env</code></p>
<h3 style="margin: 1vh 4vw 0">1.2) Configure as variveis do ORM:</h3>
<p style="margin: 1vh 6vw"><code>DATABASE_URL="postgresql://USUARIO:SENHA@localhost:PORTA/DATABASE?schema=public"`</code></p>

<p style="margin: 0 6vw">USUARIO: Usuário de acesso ao postgres</p>
<p style="margin: 0 6vw">SENHA: Senha de acesso</p>
<p style="margin: 0 6vw">PORTA: Porta de acesso do postgres (padrão 5432)</p>
<p style="margin: 0 6vw 2vw 6vw">DATABASE: Nome do Data Base criado</p>

<h3 style="margin: 1vh 4vw 0">1.3) Configure a chave secreta para usuário</h3> 
<p style="margin: 0 6vw"><code>ADM_SECRET_KEY=</code></p>

<p style="margin: 0 6vw">Chave secreta para criar usuário com poderes administrativos.Ao ser criada deve ser enviada na requisição do front.</p>

<h2 style="margin: 2vh 4vw 0 0" id="init">2) Iniciando o projeto: </h2>
    
<h3 style="margin: 1vh 4vw 0">1.2) Instalar bibliotecas:</h3>
<p style="margin: 0 6vw">Yarn: <code>yarn init -y</code></p>
<p style="margin: 0 6vw">npm: <code>npm init</code></p>
    
<h3 style="margin: 1vh 4vw 0">2.2) Criar Data Base:</h3>
<p style="margin: 0 6vw"><code>yarn db</code></p>
<p style="margin: 0 6vw"><code>npm db</code></p>