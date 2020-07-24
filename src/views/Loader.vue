<template>
   <div id="loader" class="lds-dual-ring"></div>
</template>

<script>
export default {
   name: 'Loader',
}
</script>

<style scoped>
.lds-dual-ring {
            position: relative;
            left: 44.4%;
            align-items: center;
            justify-content: center;
            z-index: 999;
            opacity: 0.7;
        }

        .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 34px;
            height: 34px;
            margin: 0px;
            border-radius: 50%;
            border: 6px solid rgb(159, 162, 163);
            border-color: rgb(159, 162, 163) transparent rgb(159, 162, 163) transparent;
            animation: lds-dual-ring 1.1s linear infinite;
        }

        @keyframes lds-dual-ring {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
</style>