<template lang="html">
  <div :class="['svg-container', {'loading': isLoading}]">
    <svg class="spinner" width="30px" height="30px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
       <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    isLoading: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
/* eslint-disable */
$offset: 187;
$duration: 1.8s;
$transparency: #5b2d89;
$transparency: rgba(255,255,255,.2);
.svg-container {
   display: none;
   position: absolute;
   align-items: center;
   justify-content: center;
   margin-left: 1rem;
   &.loading{
     display: inline-block;
   }
}

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    dash $duration ease-in-out infinite,
    colors ($duration*4) ease-in-out infinite;
}

@keyframes colors {
	0% { stroke: $transparency; }
	50% { stroke: $transparency; }
  100% { stroke: $transparency; }
}

@keyframes dash {
 0% { stroke-dashoffset: $offset; }
 50% {
   stroke-dashoffset: $offset/2;
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: $offset;
   transform:rotate(360deg);
 }
}
</style>
