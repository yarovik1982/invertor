<script setup>
import { RouterView, RouterLink} from 'vue-router';

</script>

<template>
   <div id="screen" class="screen">
    <div class="screen-item screen-header">
      <div class="row">
        <ul>
          <li><RouterLink to="/">start</RouterLink></li>
          <li><RouterLink to="/menu">menu</RouterLink></li>
          <li><RouterLink to="/game">game</RouterLink></li>
          <li><RouterLink to="/info">info</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="screen-item screen-body">
      <RouterView></RouterView>
    </div>
    <div class="screen-item screen-footer">
      <p>Footer</p>
    </div>
  </div> 
</template>

<style scoped>
.screen{
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  border:1px solid #ccc;
}
.screen-item:not(.screen-body){
  padding: 20px;
}
.screen-body{
  flex:1 auto;
  /* background-color: green; */
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y:auto;
  /* padding-bottom: 2px; */
}
.row ul{
  width: 100%;
  display: flex;
  justify-content: space-around;
  /* opacity: 0; */
  
}
.screen-footer p{
  visibility: hidden;
}
</style>
