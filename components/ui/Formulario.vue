<template>
    <div class="card-formulario">
        <h3>Solicitar adição de projeto</h3>

        <form class = "formulario" @submit.prevent="enviarFormulario">
            <label for ="nome"><img src="../../assets/user_black.png" alt="Icone usuário" class="form-img">   Nome completo</label><br>
            <input type = "text" placeholder = "Insira seu nome" id = "nome" v-model="nome" required><br>
            
            <label for = "email"><img src="../../assets/mail_black.png" alt="Icone email" class="form-img">   Email</label><br>
            <input type = "email" placeholder = "seu@email.com" id = "email" v-model="email" required><br>
            
            <label for="nomeProjeto"><img src="../../assets/file-text_black.png" alt="Icone projeto" class="form-img">   Nome do projeto</label><br>
            <input type = "text" placeholder = "Nome do seu projeto" id = "nomeProjeto" v-model="nomeProjeto" required><br>
            
            <label for="descricao">Descrição do projeto</label><br>
            <textarea rows="8" cols = "50" placeholder="Descreva seu projeto, os dados que você gostaria de visualizar e qualquer informação relevante..." id = "descricao" v-model="descricao" required></textarea><br>

            <button type = "submit" class="bto-primario"><img src="../../assets/send_white.png" alt="Icone enviar" class="form-img">   Enviar solicitação</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import emailjs from '@emailjs/browser'

    const nome = ref('')
    const email = ref('')
    const nomeProjeto = ref('')
    const descricao = ref('')

    async function enviarFormulario(){
        try {
            await emailjs.send(
                'service_s2nxmak',
                'template_nepdnfj',
                {
                    nome: nome.value,
                    email: email.value,
                    nomeProjeto: nomeProjeto.value,
                    descricao: descricao.value
                },
                'byDOaXH0-650EugMt'
            )
            alert('Solicitação enviada com sucesso!')
            nome.value = ''
            email.value = ''
            nomeProjeto.value = ''
            descricao.value = ''
        } catch(erro) {
            console.log(erro)
            alert('Erro ao enviar. Tente novamente mais tarde')
        }
    }

        
</script>
