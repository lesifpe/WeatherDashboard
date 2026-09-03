<template>
    <section class = "contato-page">
        <header class = "contato-header">
            <img src="../assets/mail_blue.png" alt = "Icone mensagem" class="contato-img">
            <h1 class = "texto-gradiente">Entre em contato</h1>
            <p id="subtitulo">Quer adicionar seu projeto ao Data Insights? Preencha o formulário abaixo</p>
        </header>  

        <div class = "cards">
            <article class = "card formulario-contato">
                <Formulario />
            </article>
            <div class = "cards-direita">
                <article class = "card funcionamento">
                    <h3>Como funciona?</h3>
                    <h3><span class="numero">1</span>   Envie sua solicitação</h3>
                    <p>Preencha o formulário com informações sobre seu projeto e os dados que deseja visualizar.</p>
                    
                    <h3><span class="numero">2</span>   Análise da Equipe LES</h3>
                    <p>Nossa equipe avaliará a viabilidade técnica e o alinhamento com os objetivos da plataforma.</p>
                    <h3><span class="numero">3</span>   Implementação</h3>
                    <p>Após aprovação, trabalharemos na integração dos dados e criação do dashboard personalizado.</p>
                </article>

                <article class="card requisitos">
                    <h3>Requisitos</h3>
                    <p><img src="../assets/check_green.png" alt ="Icone check" class = "check-img"> Dados estruturados e organizados</p>
                    <p><img src="../assets/check_green.png" alt ="Icone check" class = "check-img">Relevância acadêmica ou institucional</p>
                    <p><img src="../assets/check_green.png" alt ="Icone check" class = "check-img">Permissão para uso e visualização dos dados</p>
                    <p><img src="../assets/check_green.png" alt ="Icone check" class = "check-img">Disponibilidade para colaboração técnica</p>
                </article>

                <article class = "card nota">
                    <p><strong>Nota:</strong>
                        Priorizamos projetos que beneficiam a comunidade acadêmica e que possuem dados de qualidade. O tempo de resposta pode variar de acordo com a complexidade do projeto.</p>
                </article>
        </div>
    </div>
        
        

        
    </section>


</template>

<script setup>
    import Formulario from '../components/ui/Formulario.vue';
</script>
