<template>
    <div>
        <p>Authenticated</p>
    </div>
</template>

<script>
export default {
    validate({ query }) {
        return query.code != null
    },
    methods: {
        async makeAccessToken() {
            const payload = {
                code: this.$route.query.code
            }
            await this.$axios.post('/rcms-api/16/instagram_auth', payload);
        }
    },
    mounted($route) {
        this.makeAccessToken();
    }
}
</script>