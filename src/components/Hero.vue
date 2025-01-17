<script></script>
<template>
    <div class="background">
        <div class="next-page">
            <h1>Sign in to start watching!</h1>
            <h3>Watch for free!</h3>
        </div>
    </div>
</template>

<style scoped>
.background {
    background-image: url('/src/assets/background.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    font-size: 1.2rem;
    color: white;
    text-align: center;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

.next-page {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 12px;
    padding: 35px;
    max-width: 80%;
    width: 400px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #6c5ce7;
    margin-bottom: 15px;
    letter-spacing: 2px;
}

h3 {
    font-size: 1.5rem;
    color: #dcdde1;
    margin-top: 0;
    font-style: italic;
}
</style>