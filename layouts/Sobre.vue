<template>
  <section class="sobre-page">
    <header class="sobre-header">
      <h1 class="texto-gradiente">Quem Somos</h1>
      <p>Conheça o Data Insights e a organização por trás desta plataforma</p>
    </header>

    <article class="sobre-secao bg-light-blue">
      <h2>O que é o Data Insights?</h2>
      <p>
        <strong>Data Insights</strong> é uma plataforma web dedicada à análise e visualização de dados de 
        diferentes projetos institucionais e acadêmicos. Nossa missão é tornar dados complexos acessíveis e 
        compreensíveis através de dashboards interativos e análises detalhadas.
      </p>
      <p>
        Desenvolvida com tecnologias modernas de visualização de dados, a plataforma oferece recursos 
        avançados como filtragem temporal, múltiplos tipos de gráficos e análises automatizadas que auxiliam 
        na interpretação dos dados.
      </p>
      <p>
        Atualmente, hospedamos dois projetos principais: <strong>WeatherDashboard</strong>, focado em dados meteorológicos,
         e <strong>AIOTADS</strong>, que monitora a movimentação de pessoas nas instalações acadêmicas do IFPE Recife.
      </p>
    </article>

    <article class="sobre-secao bg-light-purple">
      <h2>A Organização LES</h2>
      <p>
        A <strong>LES (Liga de Engenharia de Software)</strong> é a organização responsável pelo 
        desenvolvimento e manutenção da plataforma Data Insights. Formada por estudantes e desenvolvedores
          dedicados, o LES atua na interseção entre tecnologia e inovação educacional.
      </p>
      <p>
        Nossa equipe trabalha no desenvolvimento de soluções tecnológicas que atendem às necessidades 
        institucionais e acadêmicas, com foco em qualidade, escalabilidade e experiência do usuário.
      </p>
      <p>
        Através do Data Insights, o LES demonstra seu compromisso com a transparência de dados
         e a democratização do acesso à informação, facilitando a compreensão de métricas 
         importantes para a comunidade acadêmica.
      </p>

      <div class="status-conteiner">
        <CardEstatistica numero="4+" rotulo="Projetos Ativos" />
        <CardEstatistica numero="25+" rotulo="Colaboradores" />
      </div>
    </article>
  </section>
</template>

<script setup>
import CardEstatistica from '../components/ui/CardStatusLes.vue'
</script>