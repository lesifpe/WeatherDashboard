<template>
    <div class="card-formulario">
        <h3>Solicitar adição de projeto</h3>

        <form class = "formulario" @submit.prevent="enviarFormulario">
            <label for ="nome"><img src="../../assets/user_black.png" alt="Icone usuário" class="form-img">   Nome completo</label><br>
            <input type = "text" placeholder = "Insira seu nome" id = "nome" v-model="nome"><br>
            
            <label for = "email"><img src="../../assets/mail_black.png" alt="Icone email" class="form-img">   Email</label><br>
            <input type = "email" placeholder = "seu@email.com" id = "email" v-model="email"><br>
            
            <label for="nomeProjeto"><img src="../../assets/file-text_black.png" alt="Icone projeto" class="form-img">   Nome do projeto</label><br>
            <input type = "text" placeholder = "Nome do seu projeto" id = "nomeProjeto" v-model="nomeProjeto"><br>
            
            <label for="descricao">Descrição do projeto</label><br>
            <textarea rows="8" cols = "50" placeholder="Descreva seu projeto, os dados que você gostaria de visualizar e qualquer informação relevante..." id = "descricao" v-model="descricao"></textarea><br>

            <button type = "submit" class="bto-primario"><img src="../../assets/send_white.png" alt="Icone enviar" class="form-img">   Enviar solicitação</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const nome = ref('')
    const email = ref('')
    const nomeProjeto = ref('')
    const descricao = ref('')

    function enviarFormulario(){
        //TODO
    }
</script>
